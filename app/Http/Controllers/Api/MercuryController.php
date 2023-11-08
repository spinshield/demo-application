<?php

namespace App\Http\Controllers\Api;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MercuryController extends \App\Http\Controllers\Controller
{
  function __construct()
  {
    $this->api_login = config('games.api.mercury.api_login');
    $this->api_password = config('games.api.mercury.api_password');
    $this->salt_key = config('games.api.mercury.salt_key');
    $this->endpoint = config('games.api.mercury.endpoint');
  }

  public function getFreeRounds($username, $password, $currency)
  {
    $request = Http::post($this->endpoint, [
      "api_login" => $this->api_login,
      "api_password" => $this->api_password,
      "method" => "getFreeRounds",
      "user_username" => $username,
      "user_password" => $password,
      "currency" => strtoupper($currency),
    ]);

    $request = json_decode($request, true);
    return $request;
  }


  public function getGameList()
  {
    $games = Http::post($this->endpoint, [
      "api_login" => $this->api_login,
      "api_password" => $this->api_password,
      "method" => "getGameList",
      "show_additional" => true,
      "show_systems" => 0,
      "list_type" => 2,
      "currency" => "USD",
    ]);
    $games = collect(json_decode($games, true)['response']);
    return $games;
  }

  public function createPlayer($username, $userpassword, $currency)
  {
    $request = Http::post($this->endpoint, [
      "api_login" => $this->api_login,
      "api_password" => $this->api_password,
      "method" => "createPlayer",
      "user_username" => $username,
      "user_password" => $userpassword,
      "user_nickname" => $username,
      "currency" => strtoupper($currency),
    ]);
    $request = json_decode($request, true);
    return $request;
  }

  public function callback(Request $request)
  {
    $split_user = explode(":", $request->username);
    $user_id = $split_user[0];
    $currency = strtolower($split_user[1]);
    $action = $request->action;
    $user_controller = new \App\Models\User;
    $user = $user_controller->where("id", $user_id)->first();
    $balance = (int) $user->$currency;
    if($action === "credit" || $action === "debit") {
      $balance_required = (int) $request->balance_required;
      $amount = (int) $request->amount;
      if($balance < $balance_required) {
        return [
          "error" => 1,
          "balance" => $balance,
        ];
      }

      if($action === "debit") {
        if($balance < $amount) {
          return [
            "error" => 1,
            "balance" => $balance,
          ];
        }
        $balance = (int) ($balance - $amount);
        $user->update([$currency => $balance]);
      }      

      if($action === "credit") {
        $balance = (int) ($balance + $amount);
        $user->update([$currency => $balance]);
      }
    }
    $response = [
      "error" => 0,
      "balance" => (int) $balance,
    ];
    return $response;
  }


  public function addFreeRounds($username, $password, $game_id, $currency, $freespins, $betlevel)
  {
    $request = Http::post($this->endpoint, [
      "api_login" => $this->api_login,
      "api_password" => $this->api_password,
      "method" => "addFreeRounds",
      "lang" => "en",
      "user_username" => $username,
      "user_password" => $password,
      "gameid" => $game_id,
      "freespins" => $freespins,
      "bet_level" => $betlevel,
      "currency" => strtoupper($currency),
    ]);

    $request = json_decode($request, true);

    return $request;
  }

  public function openGame($user_id, $game_id, $currency, $play_for_fun)
  {
    $username = $user_id.':'.$currency;
    $password = md5($user_id);

    $player = $this->createPlayer($username, $password, $currency);

    $user = \App\Models\User::where("id", $user_id)->first();
    if($user->fs_available === 1) {
      if($user->fs_spins > 0) {
        $select_game = $this->getGameList()->where("s", $game_id)->first();
        if($select_game) {
          if($select_game['fs'] === true) {
            $this->addFreeRounds($username, $password, $game_id, $currency, $user->fs_spins, 1);
            $user->update([
              "fs_available" => 0,
              "fs_spins" => 0,
            ]);
          }
        }
      }
    }
    $request = Http::post($this->endpoint, [
      "api_login" => $this->api_login,
      "api_password" => $this->api_password,
      "method" => "getGame",
      "lang" => "en",
      "user_username" => $username,
      "user_password" => $password,
      "gameid" => $game_id,
      "homeurl" => env("APP_URL"),
      "cashierurl" => env("APP_URL"),
      "play_for_fun" => $play_for_fun,
      "currency" => strtoupper($currency),
    ]);

    $request = json_decode($request, true);

    return $request;
  }
}