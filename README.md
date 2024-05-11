# Small Laravel package to use Tinker in your browser

[![Latest Version on Packagist](https://img.shields.io/packagist/v/gere-lajos/laravel-web-tinker.svg?style=flat-square)](https://packagist.org/packages/gere-lajos/laravel-web-tinker)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/gere-lajos/laravel-web-tinker/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/gere-lajos/laravel-web-tinker/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/gere-lajos/laravel-web-tinker/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/gere-lajos/laravel-web-tinker/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/gere-lajos/laravel-web-tinker.svg?style=flat-square)](https://packagist.org/packages/gere-lajos/laravel-web-tinker)

This package allows you to use Tinker in your browser. Wildly inspired by Spatie's [Laravel Web Tinker](https://github.com/spatie/laravel-web-tinker), but with added functionality, and React frontend.

## 🚨 A word to the wise 🚨

This package can run arbitrary code. Unless you know what you are doing, you should never install or use this in a production environment, or any environment where you handle real world data.

## Known issues

- If you run the code with ctrl+enter or cmd+enter, the editor will also start a new line.
- History is shared between tabs, and is not cleared when you close the tab.
- Big outputs are not handled well, it can push the grid instead of breaking words.
- The editor-output grid is not resizable.
- We must validate the stored code structure so it won't break the editor.

## Installation

You can install the package via composer:

```bash
composer require gere-lajos/laravel-web-tinker --dev
```

Next, you must publish the assets from this package by running this command.

```bash
php artisan web-tinker:install
```

Optionally, you can publish the config file of the package.

```bash
php artisan vendor:publish --provider="GereLajos\LaravelWebTinker\WebTinkerServiceProvider" --tag="config"
```

This is the content that will be published to `config/web-tinker.php`

If you previously installed Spatie's Web Tinker, you may have conflicts in the config file. You can safely remove the `web-tinker.php` file from the `config` directory.

```php
return [

    /*
     * The web tinker page will be available on this path.
     */
    'path' => '/tinker',

    /*
     * By default this package will only run in local development.
     * Do not change this, unless you know what your are doing.
     */
    'enabled' => env('APP_ENV') === 'local',

   /*
    * This class can modify the output returned by Tinker. You can replace this with
    * any class that implements \Spatie\WebTinker\OutputModifiers\OutputModifier.
    */
    'output_modifier' => \GereLajos\LaravelWebTinker\OutputModifiers\PrefixDateTime::class,

    /*
    * These middleware will be assigned to every WebTinker route, giving you the chance
    * to add your own middlewares to this list or change any of the existing middleware.
    */
    'middleware' => [
        Illuminate\Cookie\Middleware\EncryptCookies::class,
        Illuminate\Session\Middleware\StartSession::class,
        GereLajos\LaravelWebTinker\Http\Middleware\Authorize::class,
    ],

    /*
     * If you want to fine-tune PsySH configuration specify
     * configuration file name, relative to the root of your
     * application directory.
     */
    'config_file' => env('PSYSH_CONFIG', null),
];
```

## Usage

By default this package will only run in a local environment.

Visit `/tinker` in your local environment of your app to view the tinker page.

## Authorization

Should you want to run this in another environment (we do not recommend this), there are two steps you must perform.

1. You must register a `viewWebTinker` ability. A good place to do this is in the `AuthServiceProvider` that ships with Laravel.

```php
public function boot()
{
    $this->registerPolicies();

    Gate::define('viewWebTinker', function ($user = null) {
        // return true if access to web tinker is allowed
    });
}
```

2. You must set the `enabled` variable in the `web-tinker` config file to `true`.

## Modifying the output

You can modify the output of tinker by specifying an output modifier in the `output_modifier` key of the `web-tinker` config file. An output modifier is any class that implements `\GereLajos\LaravelWebTinker\OutputModifiers\OutputModifier`.

This is how that interface looks like.

```php
namespace GereLajos\LaravelWebTinker\OutputModifiers;

interface OutputModifier
{
    public function modify(string $output = ''): string;
}
```

The default install of this package will use the `PrefixDataTime` output modifier which prefixes the output from Tinker with the current date time.

## Testing

``` bash
composer test
```

## Credits

- [Gere Lajos](https://github.com/gere-lajos)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
