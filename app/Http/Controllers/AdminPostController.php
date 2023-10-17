<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class AdminPostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return response()->json(['posts' => $posts], 200);
    }
    public function show(Post $post)
    {
        return response()->json(['post' => $post], 200);
    }
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(['message' => 'Bài viết đã được xóa thành công'], 200);
    }
}
