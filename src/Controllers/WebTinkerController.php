<?php

declare(strict_types=1);

namespace GereLajos\LaravelWebTinker\Controllers;

use GereLajos\LaravelWebTinker\LaravelWebTinker;
use Illuminate\Http\Request;

class WebTinkerController
{
    public function index()
    {
        return view('web-tinker::web-tinker');
    }

    public function execute(Request $request, LaravelWebTinker $tinker)
    {
        $validated = $request->validate([
            'code' => 'required',
        ]);

        return $tinker->execute($validated['code']);
    }
}
