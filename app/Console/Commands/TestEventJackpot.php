<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Opekunov\Centrifugo\Centrifugo;
use Illuminate\Support\Facades\Auth;
class TestEventJackpot extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:jackpot-websocket-update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(Centrifugo $centrifugo)
    {
           $jackpot_controller = new \App\Http\Controllers\JackpotController;
           $jackpotData = $jackpot_controller->jackpotTestEvent()['jackpots'];

        \App\Events\JackpotEvent::dispatch($jackpotData, 'jackpot#1');

        return self::SUCCESS;
        $channels = $centrifugo->channels();
        foreach($channels['result']['channels'] as $key=>$ch) {
            $channelz[] = $key;
        }
        $publish = $centrifugo->broadcast($channelz, [
            "text" => "hello",
            "createdAt" => now(),
            "roomId" => 1,
            "senderId" => 2,
            "senderName" => 3,
        ]);
        $chat = $centrifugo->broadcast(["chat#1"], [
            "text" => "hello",
            "createdAt" => now(),
            "roomId" => 1,
            "senderId" => 2,
            "senderName" => 3,
        ]);
        echo json_encode($publish);
    }
/*
    //or $centrifugo = new Centrifugo();
    //or centrifugo()
    
    // Send message into channel
    $centrifugo->publish('news', ['message' => 'Hello world']);

    // Generate connection token
    $token = $centrifugo->generateConnectionToken((string)Auth::id(), 0, [
        'name' => Auth::user()->name,
    ]);

    // Generate subscription token
    $expire = now()->addDay(); //or you can use Unix: $expire = time() + 60 * 60 * 24; 
    $apiSign = $centrifugo->generateSubscriptionToken((string)Auth::id(), 'channel', $expire, [
        'name' => Auth::user()->name,
    ]);

    //Get a list of currently active channels.
    $centrifugo->channels();

    //Get channel presence information (all clients currently subscribed on this channel).
    $centrifugo->presence('news');
*/
}