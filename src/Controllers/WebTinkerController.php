<?php

declare(strict_types=1);

namespace GereLajos\LaravelWebTinker\Controllers;

class WebTinkerController
{
    public function index(){
        return view('web-tinker::web-tinker');
    }

    public function execute(){
        echo "POST";
        return view('web-tinker::web-tinker');
    }
}
