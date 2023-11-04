<?php
use Laravel\Passport\Http\Controllers\HandlesOAuthErrors;
use Laravel\Passport\Http\Controllers\BaseAccessTokenController;
use Laravel\Passport\TokenRepository;
use League\OAuth2\Server\AuthorizationServer;
use Illuminate\Http\Request;

class AccessTokenController extends BaseAccessTokenController
{
    use HandlesOAuthErrors;

    protected $tokens;
    protected $server;

    public function __construct(TokenRepository $tokens, AuthorizationServer $server)
    {
        $this->tokens = $tokens;
        $this->server = $server;
    }

    /**
     * Xử lý yêu cầu xác thực bằng grant type "password".
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function issueToken(Request $request)
    {
        $response = $this->server->respondToAccessTokenRequest($request);

        return response()->json($response->getContent(), $response->getStatusCode());
    }
}