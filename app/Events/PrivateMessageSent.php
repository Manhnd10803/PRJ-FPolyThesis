<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PrivateMessageSent implements ShouldBroadcast
{
    public $message;

    public function __construct($message, $action = 'send')
    {
        $this->message = $message;
        $this->message->action = $action;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->message->receiver_id);
        // return new PrivateChannel('one-one');
    }

    public function broadcastAs()
    {
        return 'PrivateMessageSent';
    }
}
