<?php

namespace App\Http\Controllers\Admin;

use App\Events\ReceiveNotification;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Major;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class AdminBlogController extends Controller
{
    public function __construct()
    {
        $this->middleware('authAdmin');
    }
    public function approveBlog(Blog $blog)
    {
        DB::beginTransaction();
        try {
            $score = config('default.user.score.create_blog');
            $user_id = $blog->user->id;
            $user = User::find($user_id);
            if ($user) {
                $user->score += $score;
                $user->save();
            }
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
            $avatar_sender = Auth::user()->avatar;
            broadcast(new ReceiveNotification($notification, $avatar_sender))->toOthers();
            DB::commit();
            return redirect()->route('admin.blogs.approve')
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
            $avatar_sender = Auth::user()->avatar;
            $score = config('default.user.score.reject_blog');
            $user_id = $blog->user->id;
            $user = User::find($user_id);
            if ($user) {
                $user->score += $score;
                if ($user->score += $score < 0) {
                    $user->score = 0;
                }
                $user->save();
            }
            broadcast(new ReceiveNotification($notification, $avatar_sender))->toOthers();
            DB::commit();
            return redirect()->route('admin.blogs.approve')
                ->with('success', 'Bài viết đã được hủy thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    //admin web
    public function index(Request $request)
    {
        $params = $request->all();
        $status = request()->is('admin/blogs/approve') ? config('default.blog.status.pending') : config('default.blog.status.approved');
        $blogs = Blog::join('users', 'blogs.user_id', 'users.id')->join('majors', 'majors.id', 'blogs.majors_id')->select([
            'blogs.id as id',
            'blogs.title as title',
            'users.username as username',
            'majors.majors_code as majorCode',
            'blogs.created_at as created_at',
            'blogs.status as status',
        ])->where('blogs.status', $status);
        if (!empty($params['title'])) {
            $blogs = $blogs->where('blogs.title', 'like', '%' . $params['title'] . '%');
        };
        if (!empty($params['majors_id'])) {
            $blogs = $blogs->where('blogs.majors_id', $params['majors_id']);
        };
        if (!empty($params['username'])) {
            $blogs = $blogs->where('users.username', 'like', '%' . $params['username'] . '%');
        };
        if (!empty($params['dateFrom'])) {
            if (!empty($params['dateTo'])) {
                $blogs = $blogs->where('blogs.created_at', '>=', $params['dateFrom'])->where('blogs.created_at', '<', $params['dateTo']);
            }
        };
        $blogs = $blogs->orderByDesc('blogs.created_at')->get();
        foreach ($blogs as $blog) {
            $dislikeCount = $blog->likes->where('emotion', 'dislike')->count();
            if ($dislikeCount > 100) {
                $blog->update(['status' => 0]);
            }
        }
        $majors = Major::all();
        $title = $status == config('default.blog.status.approved') ? 'Danh sách blog đã duyệt' : 'Danh sách blog chờ duyệt';
        return view('admin.blogs.index', compact('blogs', 'title', 'majors', 'params'));
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
    public function showWithUser(Blog $blog)
    {
        $blog = Blog::with('user', 'likes', 'comments')->find($blog->id);
        // Calculate like, dislike, and comment counts
        $blog->like_count = $blog->likes->where('emotion', 'like')->count();
        $blog->dislike_count = $blog->likes->where('emotion', 'dislike')->count();
        $blog->comment_count = $blog->comments->count();
        return view('admin.blogs.show-with-user', compact('blog'));
    }
    public function destroy(Blog $blog)
    {
        $score = config('default.user.score.reject_blog');
        $user_id = $blog->user->id;
        $user = User::find($user_id);
        if ($user) {
            $user->score += $score;
            $user->save();
        }
        $blog->delete();
        return redirect()->route('admin.blogs.index')
            ->with('success', 'Xóa blog thành công. ');
    }
}
