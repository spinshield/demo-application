<?php
// App/Events/SendMessageEvent.php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\Channel;

//Use "implements ShouldBroadcast" if you want add event to queue
class JackpotEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var string Message text
     */
    private $jackpotData;
    private $channel;

    public function __construct(array $jackpotData, string $channel)
    {
        $this->jackpotData = $jackpotData;
        $this->channel = $channel;

    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        //example event broadcast name. Show in Web Socket JSON
        return 'jackpotData.new';
    }


    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return ['message' => $this->jackpotData];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $channel = $this->channel;
        return new Channel('jackpot#1');
        // or return new PrivateChannel('private:chat');
        // in Centrifuge 4 all channels are protected, and the '$' prefix is considered obsolete. https://centrifugal.dev/docs/server/channels#private-channel-prefix-
    }
}