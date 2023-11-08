<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\MercuryController;

class GamesController extends Controller
{
  function __construct()
  {
    $this->mercury_controller = new MercuryController;
  }

  public function getFreeRounds($username, $password, $currency, $server)
  {
      if($server === "mercury") {
        $controller = $this->mercury_controller;
      }
      if($server === "dicer") {
        $controller = $this->dicer_controller;
      }
      if($server === "heyreels") {
        $controller = $this->heyreels_controller;
      }
      $fr = $controller->getFreeRounds($username, $password, $currency);

    return $fr;
  }

  public function gamesList($server)
  {
    $games = Cache::get("gamesList".$server);
    if(!$games) {
      if($server === "mercury") {
        $controller = $this->mercury_controller;
        $timer = now()->addMinutes(5);
      }
      $games = $controller->getGameList()->all();

      if($server === "mercury") {
        shuffle($games);
      }

      Cache::set("gamesList".$server, $games, $timer);
    }
    return $games;
  }

  public function launch(Request $request, $server, $currency, $provider, $game)
  {
    $user = $request->user();
    $user_id = $user->id;
    
    if($currency === "demo") {
      $currency = 'usd';
      $play_for_fun = 1;
    } else {
      $currency = $user->selected_balance;
      $play_for_fun = 0;
    }
    if($server === "mercury") {
      $response = $this->mercury_controller->openGame($user_id, $provider.'/'.$game, $currency, $play_for_fun);
    } elseif($server === "heyreels") {
      $response = $this->heyreels_controller->openGame($user_id, $provider.'/'.$game, $currency, $play_for_fun);
    } elseif($server === "dicer") {
      $response = $this->dicer_controller->openGame($user_id, $provider.'/'.$game, $currency, $play_for_fun);
    } else {
      return "server does not exist";
    }
    if(isset($response['error'])) {
      if($response['error'] === 0) {
        return redirect($response['response']);
      } else {
        return $response;
      }
    } else {
      return $response;
    }
  }

}


