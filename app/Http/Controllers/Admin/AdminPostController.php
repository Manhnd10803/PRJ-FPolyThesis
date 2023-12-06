<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Traits\FormatsCreatedAt;

class AdminPostController extends Controller
{
    public function __construct()
    {
        $this->middleware('authAdmin');
    }
    // use FormatsCreatedAt;
    public function index()
    {
        $posts = Post::all();
        return view('admin.posts.index', compact('posts'));
    }
    public function show(Post $post)
    {
        // $likes = $post->likes;
        // $comments = $post->comments;

        // $emotionCounts = [];
        // $validEmotions = ['dislike', 'like', 'love', 'haha', 'wow', 'sad', 'angry'];
        // // Đếm số lượng từng trạng thái lượt thích
        // foreach ($validEmotions as $emotion) {
        //     $emotionCounts[$emotion] = $likes->where('emotion', $emotion)->count();
        // }
        // return view('admin.posts.show', [
        //     'post' => $post,
        //     'likeCounts' => $emotionCounts,
        //     'commentCount' => $comments->count(),
        // ]);

        $post = Post::with('user', 'likes', 'comments')->find($post->id);
        // Calculate like, dislike, and comment counts
        $post->like_count = $post->likes->where('emotion', 'like')->count();
        $post->dislike_count = $post->likes->where('emotion', 'dislike')->count();
        $post->comment_count = $post->comments->count();
        return view('admin.posts.show', compact('post'));
    }
    public function edit(Post $post)
    {
        return view('admin.posts.edit', compact('post'));
    }
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('admin.posts.index')->with('success', 'Xóa bài post thành công.');
    }
}
