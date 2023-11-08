<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Pages\LandingController;
use App\Http\Controllers\Pages\CasinoController;
use App\Http\Controllers\CentrifugoController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\PromocodeController;


/* Index Filler */
Route::get('/', function () {
    return redirect(env("APP_URL").'/landing');
});
Route::get('/landing', [LandingController::class, 'show'])->name('landing');
/* Websocket */
Route::post('/centrifugo/connect', [CentrifugoController::class, 'login'])->name('websocket.login');

Route::middleware('auth')->group(function () {
    Route::get('/launch/{server}/{currency}/{provider}/{game}', [GamesController::class, 'launch'])->name('launch');
    Route::patch('/promocode', [PromocodeController::class, 'update'])->name('promocode');
});

require __DIR__.'/auth.php';
