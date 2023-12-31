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
    public $loginUser;

    public function __construct($user, $activity, $loginUser)
    {
        $this->user = $user;
        $this->activity = $activity;
        $this->loginUser = $loginUser;
    }
    public function broadcastOn()
    {
        return new PrivateChannel('activity.' . $this->user->id);
    }
    public function broadcastWith()
    {
        return [
            'user_id' => $this->loginUser->id,
            'activity_user' => $this->activity,
        ];
    }
    public function broadcastAs()
    {
        return 'CheckStatusUser';
    }
}