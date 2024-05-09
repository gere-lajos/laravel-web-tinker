<?php

namespace GereLajos\LaravelWebTinker;

use GereLajos\LaravelWebTinker\Commands\LaravelWebTinkerInstallCommand;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class LaravelWebTinkerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../config/web-tinker.php' => config_path('web-tinker.php'),
            ], 'config');

            $this->publishes([
                __DIR__.'/../resources/views' => base_path('resources/views/vendor/web-tinker'),
            ], 'views');

            $this->publishes([
                __DIR__.'/../dist' => public_path('vendor/web-tinker'),
            ], 'laravel-web-tinker-assets');
        }

        $this->loadViewsFrom(__DIR__.'/../resources/views', 'web-tinker');

        Route::middlewareGroup('web-tinker', config('web-tinker.middleware', []));

        $this
            ->registerRoutes()
            ->registerWebTinkerGate();
    }

    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/web-tinker.php', 'web-tinker');

        $this->commands(LaravelWebTinkerInstallCommand::class);
    }

    protected function routeConfiguration()
    {
        return [
            'prefix' => config('web-tinker.path'),
            'middleware' => 'web-tinker',
        ];
    }

    protected function registerRoutes()
    {
        //        Route::group($this->routeConfiguration(), function () {
        //            Route::get('/', [WebTinkerController::class, 'index']);
        //            Route::post('/', [WebTinkerController::class, 'execute']);
        //        });

        Route::group($this->routeConfiguration(), function () {
            Route::get('/', function () {
                return view('web-tinker::web-tinker');
            });
        });

        return $this;
    }

    protected function registerWebTinkerGate()
    {
        Gate::define('viewWebTinker', function ($user = null) {
            return app()->environment('local');
        });

        return $this;
    }
}
