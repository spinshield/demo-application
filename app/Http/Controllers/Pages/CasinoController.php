<?php

namespace App\Http\Controllers\Pages;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\JackpotController;

class CasinoController extends \App\Http\Controllers\Controller
{
    function __construct()
    {
      $this->games_controller = new GamesController;
      $this->jackpot_controller = new JackpotController;

    }
    public function show(Request $request): Response
    {
        if(!$request->user()) {
          return redirect()->route('landing');
        }
        
        $jackpots = $this->jackpot_controller->getActiveJackpots();
        
        return Inertia::render('Casino', [
            'games' => $this->games_controller->gamesList(),
            "images" => [
                [
                    "url" => "/img/slider-1.jpeg",
                    "title" => "Win now!",
                    "desc" => "Win now!",
                ],
                [
                    "url" => "/img/promo-3.jpg",
                    "title" => "test",
                    "desc" => "test",
                ],
            ],
            'activeJackpots' => [
                "small" => $jackpots['jackpots']['small'],
                "medium" => $jackpots['jackpots']['medium'],
            ],
        ]);
    }
}
