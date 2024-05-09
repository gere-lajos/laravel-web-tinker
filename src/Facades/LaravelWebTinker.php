<?php

namespace Gere Lajos\LaravelWebTinker\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Gere Lajos\LaravelWebTinker\LaravelWebTinker
 */
class LaravelWebTinker extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \Gere Lajos\LaravelWebTinker\LaravelWebTinker::class;
    }
}
