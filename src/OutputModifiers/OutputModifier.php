<?php

namespace GereLajos\LaravelWebTinker\OutputModifiers;

interface OutputModifier
{
    public function modify(string $output, float $runtime): string;
}
