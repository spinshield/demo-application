<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class JackpotController extends Controller
{
  public function jackpotTestEvent() {
    $jackpotData =  array("jackpots" => array(
              "small" => array(
                "jackpot_id" => 1249012,
                "category" => "small",
                "amount" => floatval(number_format((rand(100, 9999)) / 100, '2', '.', '')),
                "symbol" => "$",
                "currency" => "USD",
                "created_at" => now(),
                "updated_at" => now(),
              ),
              "medium" => array(
                 "jackpot_id" => 249054,
                 "category" => "medium",
                 "amount" => floatval(number_format((rand(10000, 99999)) / 100, '2', '.', '')),
                 "symbol" => "$",
                 "currency" => "USD",
                 "created_at" => now(),
                 "updated_at" => now(),
              ),
    ));
    return $jackpotData;
}
  public function getActiveJackpots() {
        $jackpotData =  array("jackpots" => array(
                  "small" => array(
                    "jackpot_id" => 2490122454,
                    "category" => "small",
                    "amount" => "25.59",
                    "symbol" => "$",
                    "currency" => "USD",
                    "created_at" => now(),
                    "updated_at" => now(),
                  ),
                  "medium" => array(
                    "jackpot_id" => 349054,
                   "category" => "medium",
                    "amount" => "625.59",
                    "symbol" => "$",
                    "currency" => "USD",
                    "created_at" => now(),
                    "updated_at" => now(),
                  ),
        ));
        return $jackpotData;
  }
}

