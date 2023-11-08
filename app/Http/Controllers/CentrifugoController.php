<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

class CentrifugoController extends Controller
{
  public function login()
  {
    if(!Auth::user()) {
      return [
          'result' => [
              'user' => null,
              'channels' => ["chat#1", "jackpot#1"],
          ],
      ];
      } else {
          return [
              'result' => [
                  'user' => (string) Auth::user()->id,
                  'channels' => ["personal:#".Auth::user()->id, "chat#1", "jackpot#1"],
              ],
          ];
      }
  }


}

