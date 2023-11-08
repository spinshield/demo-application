<?php

use Illuminate\Support\Facades\Broadcast;

/*

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('namespace:channel', function (){
    return \Auth::user()->group === 'private-channel-group';
});

Broadcast::channel('namespace:channel-{id}', function ($user, $id){
    return $user->id === $id;
});

*/
