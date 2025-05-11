<?php

namespace App\Traits;

trait ResponseTrait
{
    public function error($error)
    {
        return response()->json(['error' => $error], 500);
    }
}
