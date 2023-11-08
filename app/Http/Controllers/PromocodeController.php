<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class PromocodeController extends Controller
{
    function __construct()
    {
      $this->promocode_balance = config("games.promocode.balance.code");
      $this->promocode_freespins = config("games.promocode.freespins.code");
    }
    public function update(Request $request)
    {
       $request->validate([
        'promocode' => ['required', 'string', 'max:255'],
       ]);
       if($request->promocode === $this->promocode_balance) {
          $user = $request->user();
          $user->update([
            "usd" => (int) ($user->usd + 2500)
          ]);
          throw ValidationException::withMessages([
            'promocode' => "Promocode used.",
          ]);
      }
      if($request->promocode === $this->promocode_freespins) {
        $user = $request->user();
        $user->update([
          "fs_available" => (int) 1,
          "fs_spins" => 10,
        ]);
        throw ValidationException::withMessages([
          'promocode' => "Promocode used.",
        ]);
      }
      throw ValidationException::withMessages([
        'promocode' => "Invalid promocode",
      ]);
      return back();
    }
}
