<?php

namespace App\Http\Controllers\Admin;

use App\Events\ReceiveNotification;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdminBlogController extends Controller
{

    public function approveBlog(Blog $blog)
    {
        DB::beginTransaction();
        try {
            $blog->update(['status' => config('default.blog.status.approved')]);
            $notificationType = config('default.notification.notification_type.comment_blog');
            $message = "Blog " . $blog->title . " của bạn đã được duyệt.";
            $notification = Notification::create([
                'sender' => Auth::id(),
                'recipient' => $blog->user_id,
                'content' => $message,
                'notification_type' => $notificationType,
                'status' => config('default.notification.status.not_seen'),
                'objet_id' => $blog->id,
            ]);
            $notification->avatar_sender = Auth::user()->avatar;
            broadcast(new ReceiveNotification($notification))->toOthers();
            DB::commit();
            return redirect()->route('admin.blogs.show', ['blog' => $blog->id])
                ->with('success', 'Bài viết đã được duyệt thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function rejectBlog(Blog $blog)
    {
        DB::beginTransaction();
        try {
            $blog->update(['status' => config('default.blog.status.reject')]);
            $notificationType = config('default.notification.notification_type.comment_blog');
            $message = "Blog " . $blog->title . " của bạn bị từ chối.";
            $notification = Notification::create([
                'sender' => Auth::id(),
                'recipient' => $blog->user_id,
                'content' => $message,
                'notification_type' => $notificationType,
                'status' => config('default.notification.status.not_seen'),
                'objet_id' => $blog->id,
            ]);
            $notification->avatar_sender = Auth::user()->avatar;
            broadcast(new ReceiveNotification($notification))->toOthers();
            DB::commit();
            return redirect()->route('admin.blogs.show', ['blog' => $blog->id])
                ->with('success', 'Bài viết đã được hủy thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    //admin web
    public function index()
    {
        $status = request()->is('admin/blogs/approve') ? config('default.blog.status.pending') : config('default.blog.status.approved');
        $blogs = Blog::with('user',)->where('status', $status)->latest()->get();
        foreach ($blogs as $blog) {
            $dislikeCount = $blog->likes->where('emotion', 'dislike')->count();
            if ($dislikeCount > 100) {
                $blog->update(['status' => 0]);
            }
        }

        $title = $status == config('default.blog.status.approved') ? 'Danh sách blog đã duyệt' : 'Danh sách blog chờ duyệt';
        return view('admin.blogs.index', compact('blogs', 'title'));
    }
    public function countPendingBlogs()
    {
        $count = Blog::where('status', config('default.blog.status.pending'))->count();
        return $count;
    }
    public function show(Blog $blog)
    {
        $blog = Blog::with('user', 'likes', 'comments')->find($blog->id);

        // Calculate like, dislike, and comment counts
        $blog->like_count = $blog->likes->where('emotion', 'like')->count();
        $blog->dislike_count = $blog->likes->where('emotion', 'dislike')->count();
        $blog->comment_count = $blog->comments->count();

        return view('admin.blogs.show', compact('blog'));
    }
    public function destroy(Blog $blog)
    {
        $blog->delete();
        return redirect()->route('admin.blogs.index')
            ->with('success', 'Xóa blog thành công. ');
    }
}
