<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function listNotification($quantity = null)
    {
        if ($quantity) {
            $notifications = Notification::where('recipient', Auth::id())->orderByDesc('updated_at')->with('user')->paginate($quantity);
        } else {
            $notifications = Notification::where('recipient', Auth::id())->orderByDesc('updated_at')->with('user')->get();
        }
        return $notifications;
    }
    public function seeNotification(Notification $notification)
    {
        $notification->update([
            'status' => config('default.notification.status.seen')
        ]);
        return response()->json([
            'type' => $notification->notification_type,
            'objet_id' => $notification->objet_id,
        ]);
    }
    public function deleteNotification(Notification $notification)
    {
        if ($notification->recipient == Auth::id()) {
            $notification->delete();
            return response()->json(['message' => 'Xóa thành công'], 200);
        }
        return response()->json(['message' => 'Không có quyền truy cập'], 403);
    }
    public function countNotificationNotSeen()
    {
        $count = count(Notification::where('recipient', Auth::id())->where('status', 0)->get());
        return response()->json(['count' => $count]);
    }
}
