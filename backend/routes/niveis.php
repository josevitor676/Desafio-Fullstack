<?php

use App\Http\Controllers\Api\NiveisController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('niveis')->group(function () {
    Route::get('/', [NiveisController::class, 'listAll']);
    Route::post('/', [NiveisController::class, 'createNivel']);
    Route::put('/{nivel}', [NiveisController::class, 'updateNivel']);
    Route::delete('/{nivel}', [NiveisController::class, 'deleteNivel']);
    Route::get('/{nivel}', [NiveisController::class, 'getById']);
});
