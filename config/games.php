<?php

return [
  'register_bonus' => [
    'enabled' => true,
    'amount' => 1000,
    'currency' => 'usd',
  ],
  'promocode' => [
    'balance' => [
      "enabled" => true,
      "code" => env("PROMOCODE_BALANCE", 'CASHREFILL'),
    ],
    'freespins' => [
      "enabled" => true,
      "code" => env("PROMOCODE_FREESPINS", 'FREESPINS'),
    ],
  ],
  'api' => [
    "mercury" => [
      "api_login" => env('MERCURY_API_LOGIN', ''),
      "api_password" => env('MERCURY_API_PASSWORD', ''),
      "salt_key" => env("MERCURY_SALT_KEY", ''),
      "endpoint" => env("MERCURY_ENDPOINT", 'https://seamless.mercuryplay.com/api/system/operator'),
    ],
  ],
];