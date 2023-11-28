<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class AdminNotificationController extends Controller
{
    public function seeNotification(Notification $notification)
    {
        if ($notification->notification_type == 'like_blog' || $notification->notification_type == 'comment_blog' || $notification->notification_type == 'reply_blog') {
            $notification->update(['status' => 1]);
            return redirect()->route('admin.blogs.show', $notification->objet_id);
        }
    }
}
