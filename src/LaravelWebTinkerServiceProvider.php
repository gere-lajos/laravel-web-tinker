<?php

namespace GereLajos\LaravelWebTinker;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use GereLajos\LaravelWebTinker\Commands\LaravelWebTinkerCommand;

class LaravelWebTinkerServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('laravel-web-tinker')
            ->hasConfigFile()
            ->hasViews()
            ->hasMigration('create_laravel-web-tinker_table')
            ->hasCommand(LaravelWebTinkerCommand::class);
    }
}
