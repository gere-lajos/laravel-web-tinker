# Small Laravel package to use Tinker in your browser

[![Latest Version on Packagist](https://img.shields.io/packagist/v/gere-lajos/laravel-web-tinker.svg?style=flat-square)](https://packagist.org/packages/gere-lajos/laravel-web-tinker)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/gere-lajos/laravel-web-tinker/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/gere-lajos/laravel-web-tinker/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/gere-lajos/laravel-web-tinker/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/gere-lajos/laravel-web-tinker/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/gere-lajos/laravel-web-tinker.svg?style=flat-square)](https://packagist.org/packages/gere-lajos/laravel-web-tinker)

This is where your description should go. Limit it to a paragraph or two. Consider adding a small example.

## Support us

[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/laravel-web-tinker.jpg?t=1" width="419px" />](https://spatie.be/github-ad-click/laravel-web-tinker)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Installation

You can install the package via composer:

```bash
composer require gere-lajos/laravel-web-tinker
```

You can publish and run the migrations with:

```bash
php artisan vendor:publish --tag="laravel-web-tinker-migrations"
php artisan migrate
```

You can publish the config file with:

```bash
php artisan vendor:publish --tag="laravel-web-tinker-config"
```

This is the contents of the published config file:

```php
return [
];
```

Optionally, you can publish the views using

```bash
php artisan vendor:publish --tag="laravel-web-tinker-views"
```

## Usage

```php
$laravelWebTinker = new Gere Lajos\LaravelWebTinker();
echo $laravelWebTinker->echoPhrase('Hello, Gere Lajos!');
```

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Gere Lajos](https://github.com/gere-lajos)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
