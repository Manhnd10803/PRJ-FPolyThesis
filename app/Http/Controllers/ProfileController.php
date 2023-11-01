<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Qa;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function Profile(User $user, $type, $status = null)
    {
        DB::beginTransaction();
        try {
            $loggedInUser = Auth::user();
            $result = [];
                $countposts = $user->posts->count();
                $countblogs = $user->blogs->count();
                $countfriends = $user->friends->count();
                $profileData = [
                    'user' => $user,
                    'total_post' => $countposts,
                    'total_blog' => $countblogs,
                    'total_friend' => $countfriends,
                ];
            switch ($type) {
                // Lấy post với friend và images
                case 'post':
                    // Lấy danh sách bạn bè của người dùng
                    $friends = $user->friends;
                    // Lấy danh sách bài viết của người dùng
                    $postsQuery = Post::where('user_id', $user->id)->orderBy('created_at', 'DESC');
                        if ($user->id != $loggedInUser->id) {
                            $postsQuery->where('status', 0);
                        }
                    $posts = $postsQuery->paginate(10);
                    $images = [];
                    $result = [];
                    foreach ($posts as $post) {
                        // Lấy danh sách ảnh của bài viết
                        $postImages = $post->images;
                        if (!is_null($postImages)) {
                            foreach ($postImages as $image) {
                                $images[] = $image;
                            }
                        }
                        // Lấy tất cả like của bài viết
                        $likeCountsByEmotion = [];
                        $likeCountsByEmotion['total_likes'] = $post->likes->count();
                        $likers = $post->likes->map(function ($like) {
                            return [
                                'user' => $like->user,
                                'emotion' => $like->emotion,
                            ];
                        });
                        $emotions = $likers->pluck('emotion')->unique();
                        $emotionLikeCounts = [];
                        foreach ($emotions as $emotion) {
                            $emotionLikeCounts[$emotion] = $likers->where('emotion', $emotion)->count();
                        }
                        // Tổng số bình luận + 3 bình luận demo
                        $totalComment = Comment::where('post_id', $post->id)->count();
                        $commentDemos = Comment::where('post_id', $post->id)->where('parent_id', 0)->limit(3)->get();
                        foreach ($commentDemos as $commentDemo) {
                            $commentDemo->user;
                            // Số lượng reply
                            $commentDemo->reply = Comment::where('post_id', $post->id)->where('parent_id', $commentDemo->id)->count();
                        }
                        $postData = [
                            'user' => $user,
                            'images' => $images,
                            'friends' => $friends,
                            'posts' => $posts,
                            'like_counts_by_emotion' => $likeCountsByEmotion,
                            'emotion_like_counts' => $emotionLikeCounts,
                            'total_comments' => $totalComment,
                            'democomments' => $commentDemos,
                        ];
                        array_push($result, $postData);
                    }
                    break;
                // Load blog
                case 'blog':
                    $status = request('status');
                    $statuses = config('default.blog.status');
                    if (in_array($status, array_keys($statuses))) {
                        // Xử lý logic cho trường hợp 'blog' dựa trên trạng thái (pending , approved , reject)
                        $statusValue = $statuses[$status];
                        $query = Blog::where('user_id', $loggedInUser->id)->where('status', $statusValue)->orderBy('created_at', 'DESC');
                        $blogs = $query->paginate(10);
                        if ($blogs->isEmpty()) {
                            $message = "Không có blog với trạng thái $status";
                            return response()->json(['data' => [], 'message' => $message], 200);
                        }
                        $blogData = [
                            'blog' => $blogs,
                        ];
                        array_push($result, $blogData);
                    } else {
                        return response()->json(['error' => 'Trạng thái không hợp lệ'], 400);
                    }
                    break;
                // Load qa
                case 'qa':
                    $qas = Qa::where('user_id', $loggedInUser->id)->orderBy('created_at', 'DESC')->paginate(10);
                    if ($qas->isEmpty()) {
                        return response()->json(['data' => [], 'message' => 'Không có bài viết'], 200);
                    }
                    $qaData = [
                        'qa' => $qas,
                    ];
                    array_push($result, $qaData);
                    break;
            }
            DB::commit();
            return response()->json(['data' => $result , 'userdata'=>$profileData],200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}