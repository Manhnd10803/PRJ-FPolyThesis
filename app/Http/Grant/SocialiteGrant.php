<?php

namespace App\Http\Grant;

use App\Models\User as ModelsUser;
use DateInterval;
use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Entities\UserEntityInterface;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\Repositories\RefreshTokenRepositoryInterface;
use League\OAuth2\Server\Repositories\UserRepositoryInterface;
use League\OAuth2\Server\RequestEvent;
use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laravel\Passport\Bridge\User;
use League\OAuth2\Server\Grant\AbstractGrant;


class SocialiteGrant extends AbstractGrant
{
  /**
   * @param UserRepositoryInterface         $userRepository
   * @param RefreshTokenRepositoryInterface $refreshTokenRepository
   */
  public function __construct(
    UserRepositoryInterface $userRepository,
    RefreshTokenRepositoryInterface $refreshTokenRepository
  ) {
    $this->setUserRepository($userRepository);
    $this->setRefreshTokenRepository($refreshTokenRepository);

    $this->refreshTokenTTL = new DateInterval('P1M');
  }

  /**
   * {@inheritdoc}
   */
  public function respondToAccessTokenRequest(
    ServerRequestInterface $request,
    ResponseTypeInterface $responseType,
    DateInterval $accessTokenTTL
  ) {
    // Validate request
    $client = $this->validateClient($request);
    $scopes = $this->validateScopes($this->getRequestParameter('scope', $request, $this->defaultScope));
    $user = $this->validateUser($request, $client);

    // Finalize the requested scopes
    $finalizedScopes = $this->scopeRepository->finalizeScopes($scopes, $this->getIdentifier(), $client, $user->getIdentifier());

    // Issue and persist new access token
    $accessToken = $this->issueAccessToken($accessTokenTTL, $client, $user->getIdentifier(), $finalizedScopes);
    $this->getEmitter()->emit(new RequestEvent(RequestEvent::ACCESS_TOKEN_ISSUED, $request));
    $responseType->setAccessToken($accessToken);

    // Issue and persist new refresh token if given
    $refreshToken = $this->issueRefreshToken($accessToken);

    if ($refreshToken !== null) {
      $this->getEmitter()->emit(new RequestEvent(RequestEvent::REFRESH_TOKEN_ISSUED, $request));
      $responseType->setRefreshToken($refreshToken);
    }

    return $responseType;
  }

  /**
   * @param ServerRequestInterface $request
   * @param ClientEntityInterface  $client
   *
   * @throws OAuthServerException
   *
   * @return UserEntityInterface
   */
  protected function validateUser(ServerRequestInterface $request, ClientEntityInterface $client)
  {
    $username = $this->getRequestParameter('username', $request);

    if (\is_null($username)) {
      throw OAuthServerException::invalidRequest('username');
    }

    $password = $this->getRequestParameter('password', $request);

    if (\is_null($password)) {
      throw OAuthServerException::invalidRequest('password');
    }

    $user = $this->getUser($username, $password);

    if ($user instanceof UserEntityInterface === false) {
      $this->getEmitter()->emit(new RequestEvent(RequestEvent::USER_AUTHENTICATION_FAILED, $request));

      throw OAuthServerException::invalidGrant();
    }

    return $user;
  }

  private function getUser($username, $password)
  {
    $user = ModelsUser::whereEmail($username)->wherePassword($password)->first();
    if (!$user) return;
    return new User($user->getAuthIdentifier());
  }

  /**
   * {@inheritdoc}
   */
  public function getIdentifier()
  {
    return 'socialite';
  }
}
