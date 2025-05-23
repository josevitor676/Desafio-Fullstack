<?php

use App\Http\Controllers\Api\DesenvolvedorController;
use Illuminate\Support\Facades\Route;

Route::prefix('desenvolvedores')->group(function () {
    Route::get('/', [DesenvolvedorController::class, 'listAll']);
    Route::post('/', [DesenvolvedorController::class, 'createDesenvolvedor']);
    Route::patch('/{id}', [DesenvolvedorController::class, 'updateDesenvolvedor']);
    Route::delete('/{id}', [DesenvolvedorController::class, 'deleteDesenvolvedor']);
    Route::get('/{id}', [DesenvolvedorController::class, 'getById']);
});
