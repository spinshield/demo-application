<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MercuryController;

Route::get('/callbacks/dicer', [MercuryController::class, 'callback'])->name('callback');
