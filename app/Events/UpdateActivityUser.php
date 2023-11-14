<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UpdateActivityUser implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $user;
    public $activity;

    public function __construct($user, $activity)
    {
        $this->user = $user;
        $this->activity = $activity;
    }
    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->user->id);
    }
    public function broadcastWith()
    {
        return [
            'user_id' => $this->user->id,
            'activity' => $this->activity,
        ];
    }
    public function broadcastAs()
    {
        return 'CheckStatusUser';
    }
}
