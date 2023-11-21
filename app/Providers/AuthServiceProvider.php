<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use Carbon\Carbon;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
        Passport::tokensExpireIn(Carbon::now()->addSeconds(10));
        Passport::personalAccessTokensExpireIn(Carbon::now()->addSeconds(10));
        Passport::refreshTokensExpireIn(Carbon::now()->addMinutes(5));
        Passport::tokensCan([
            'admin' => 'Admin access to resources',
        ]);
    }
}