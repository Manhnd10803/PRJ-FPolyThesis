<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminNotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('authAdmin');
    }
    public function seeNotification(Notification $notification)
    {
        if ($notification->notification_type == 'like_blog' || $notification->notification_type == 'comment_blog' || $notification->notification_type == 'reply_blog') {
            $notification->update(['status' => 1]);
            return redirect()->route('admin.blogs.show', $notification->objet_id);
        }
    }
    public function listNotification()
    {
        $idAdmin = User::where('email', 'admin@gmail.com')->first()->id;
        $dates = Notification::where('recipient', $idAdmin)
            ->select(DB::raw('DATE(created_at) as date'))
            ->distinct()
            ->orderByDesc('date')
            ->get();
        return view('admin.notification.list', compact('dates', 'idAdmin'));
    }
    public function deleteNotification(Notification $notification)
    {
        $notification->delete();
        return redirect()->back();
    }
}
