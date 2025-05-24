<?php

namespace App\Exceptions;

use Exception;

class BusinessException extends Exception
{
    public function render()
    {
        return response()->json([
            'error' => $this->getMessage()
        ], 400);
    }
}