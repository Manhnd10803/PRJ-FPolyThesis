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
        // Passport::personalAccessTokensExpireIn(Carbon::now()->addHours(1));
        Passport::personalAccessTokensExpireIn(Carbon::now()->addMinutes(5));
        Passport::refreshTokensExpireIn(now()->addDays(7));
        Passport::tokensCan([
            'admin' => 'Admin access to resources',
        ]);
    }
}
