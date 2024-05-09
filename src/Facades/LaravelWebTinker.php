<?php

namespace GereLajos\LaravelWebTinker\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Gere Lajos\LaravelWebTinker\LaravelWebTinker
 */
class LaravelWebTinker extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \GereLajos\LaravelWebTinker\LaravelWebTinker::class;
    }
}
