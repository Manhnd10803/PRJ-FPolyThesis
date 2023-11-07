<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Bridge\RefreshTokenRepository;
use Laravel\Passport\Bridge\UserRepository;
use Laravel\Passport\Passport;
use League\OAuth2\Server\AuthorizationServer;
use App\Http\Grant\SocialiteGrant;


class SocialAuthServiceProvider extends ServiceProvider
{
  /**
   * Register services.
   *
   * @return void
   */
  public function register()
  {
    //
  }

  /**
   * Bootstrap services.
   *
   * @return void
   */
  public function boot()
  {
    //
    app()->afterResolving(AuthorizationServer::class, function (AuthorizationServer $server) {
      $grant = $this->makeGrant();
      $server->enableGrantType($grant, Passport::tokensExpireIn());
    });
  }

  private function makeGrant()
  {
    $grant = new SocialiteGrant(
      $this->app->make(UserRepository::class),
      $this->app->make(RefreshTokenRepository::class),
    );
    $grant->setRefreshTokenTTL(Passport::refreshTokensExpireIn());
    return $grant;
  }
}
