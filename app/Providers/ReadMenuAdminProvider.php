<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ReadMenuAdminProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
    }
    public function getMenuConfig()
    {
        // Get menu config
        $menuConfig = base_path('config') . DIRECTORY_SEPARATOR . 'menuadmin.php';
        if (file_exists($menuConfig)) {
            $this->mergeConfigFrom($menuConfig, 'backend_menu');
        }

        // Order menu by 'order'
        $menus = config('backend_menu');

        if ($menus) {
            usort($menus, function ($a, $b) {
                return $a['order'] - $b['order'];
            });
            // Share menus
            View::share('backend_menus', $menus);
        }
    }
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->getMenuConfig();
    }
}
