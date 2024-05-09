<?php

namespace GereLajos\LaravelWebTinker\OutputModifiers;

class PrefixDateTime implements OutputModifier
{
    public function modify(string $output = ''): string
    {
        return '<span style="color:rgba(255,255,255,0.2);font-style:italic">' . now()->format('Y-m-d H:i:s') . '</span><br>' . $output;
    }
}
