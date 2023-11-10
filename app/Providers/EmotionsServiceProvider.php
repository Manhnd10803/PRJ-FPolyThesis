<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Config;

class EmotionsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind('emotions', function () {
            return Config::get('emotions.valid_emotions');
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
