<?php

use App\Models\PrivateMessage;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('user.{sender_id}', function ($user, $sender_id) {
    return true;
});

Broadcast::channel('receive-notification-{recipient}', function ($user, $recipient) {
    return true;
});


// Broadcast::channel('user.{receiver_id}', function($user, $receiver_id) {
//     return (int) Auth()->id() === (int) PrivateMessage::findOrNew($receiver_id)->sender_id;
// });

// Broadcast::channel('user.{receiver_id}', function(User $user, $receiver_id) {
//     return (int) $user->id === (int) PrivateMessage::where('receiver_id', $receiver_id)->select('receiver_id')->first();
// });

// Broadcast::channel('one-one', function ($user) {
//     return !is_null($user);
// });