<?php

namespace App\Http\Controllers;

use App\Events\NotificationAdminEvent;
use App\Models\Blog;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Qa;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
  public function CreateReport(Request $request, User $user, $model, $item)
  {
    DB::beginTransaction();
    try {
      $reported_id = $user->id;
      if (!$reported_id || $reported_id === Auth::id()) {
        DB::rollBack();
        return response()->json(['message' => 'người dùng không tồn tại hoặc bạn đang tự tố cáo chính mình '], 400);
      }
      $report_title = $request->input('report_title');
      $report_content = $request->input('report_content');
      $report_image = $request->input('report_image');
      $modelName = strtolower(class_basename($model));
      switch ($modelName) {
        case 'user':
          $model = User::find($item);
          $notificationType = config('default.notification.notification_type.friend');
          break;
        case 'post':
          $model = Post::find($item);
          $notificationType = config('default.notification.notification_type.like_post');
          break;
        case 'blog':
          $model = Blog::find($item);
          $notificationType = config('default.notification.notification_type.like_blog');
          break;
        case 'qa':
          $model = Qa::find($item);
          $notificationType = config('default.notification.notification_type.like_qa');
          break;
        default:
          break;
      }
      $existingReport = Report::where('reporter_id', Auth::id())
        ->where('reported_id', $reported_id)
        ->where('report_type', $modelName)
        ->where('report_type_id', $item)
        ->where('report_status', config('default.report.status.pending'))->first();
      if ($existingReport) {
        DB::rollBack();
        return response()->json(['message' => 'Bạn đã báo cáo người này trước đó'], 400);
      }
      $report = Report::create([
        'reporter_id' =>  Auth::id(),
        'reported_id' => $reported_id,
        'report_title' => $report_title,
        'report_content' => $report_content,
        'report_type' => $modelName,
        'report_type_id' => $item,
        'report_status' =>  config('default.report.status.pending'),
        'report_image' => $report_image
      ]);
      //send noti admin
      $admin = User::where('email', 'admin@gmail.com')->first();
      $message = Auth::user()->username . ' đã báo cáo 1 ' . $modelName . ".";
      $notification = Notification::create([
        'sender' => Auth::id(),
        'recipient' => $admin->id,
        'content' => $message,
        'notification_type' => $notificationType,
        'status' => config('default.notification.status.not_seen'),
        'objet_id' => $model->id,
      ]);
      $avatar_sender = Auth::user()->avatar;
      broadcast(new NotificationAdminEvent($notification, $avatar_sender));
      //Kiểm tra số lượng report blog
      if ($modelName == 'blog') {
        if (count(Report::where('report_type', 'blog')->where('report_type_id', $item)->get()) == 10) {
          $model->update([
            'status' => 0,
          ]);
          //send noti admin
          $admin = User::where('email', 'admin@gmail.com')->first();
          $message = 'Blog ' . $model->title . ' đã quay về trạng thái chờ duyệt.';
          $notification = Notification::create([
            'sender' => Auth::id(),
            'recipient' => $admin->id,
            'content' => $message,
            'notification_type' => $notificationType,
            'status' => config('default.notification.status.not_seen'),
            'objet_id' => $model->id,
          ]);
          $avatar_sender = Auth::user()->avatar;
          broadcast(new NotificationAdminEvent($notification, $avatar_sender));
        }
      }
      DB::commit();
      return response()->json($report, 200);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['error' => $e->getMessage()], 400);
    }
  }
}
