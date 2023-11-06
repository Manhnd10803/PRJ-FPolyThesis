<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

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

Broadcast::channel('user.{id}', function ($user, $id) {
    return true;
});

// Broadcast::channel('user.{receiver_id}', function ($user, $receiver_id) {
//     return (int) $user->id === User::find(int) $receiver_id;
// });

Broadcast::channel('one-one', function ($user) {
    return !is_null($user);
});