<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Emotion;
use App\Models\Like;
use App\Models\Post;
use App\Models\Qa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function store(Request $request) {
        $data = $request->all();
    
        $like = new Like($data);
        $like->save();
    
        return response()->json(['message' => 'Bình luận đã được đăng thành công'], 200);
    }
    public function LikePost(Request $request, Post $post, $emotion){
        $user = Auth::user();
        $validEmotions = ['like', 'love', 'haha', 'wow', 'sad', 'angry'];
        if (!in_array($emotion, $validEmotions)){
            return response()->json(['error' => 'Invalid emotion type'], 400);
        }
        $existingLike = Like::where('user_id', $user->id)->where('post_id', $post->id)->where('emotion', $emotion)->first();
        if ($existingLike) {
            $existingLike->delete();
            $message = 'Unliked successfully';
        } else {
            Like::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
                'emotion' => $emotion,
            ]);
            $message = 'Liked successfully';
        }
        return response()->json(['message' => $message]);
    }
    public function LikeBlog(Request $request, Blog $blog, $emotion){
        $user = Auth::user();
        $validEmotions = ['like', 'love', 'haha', 'wow', 'sad', 'angry'];
        if (!in_array($emotion, $validEmotions)){
            return response()->json(['error' => 'Invalid emotion type'], 400);
        }
        $existingLike = Like::where('user_id', $user->id)->where('blog_id', $blog->id)->where('emotion', $emotion)->first();
        if ($existingLike) {
            $existingLike->delete();
            $message = 'Unliked successfully';
        } else {
            Like::create([
                'user_id' => $user->id,
                'blog_id' => $blog->id,
                'emotion' => $emotion,
            ]);
            $message = 'Liked successfully';
        }
        return response()->json(['message' => $message]);
    }
    public function LikeQa(Request $request, Qa $qa, $emotion){
        $user = Auth::user();
        $validEmotions = ['like', 'love', 'haha', 'wow', 'sad', 'angry'];
        if (!in_array($emotion, $validEmotions)){
            return response()->json(['error' => 'Invalid emotion type'], 400);
        }
        $existingLike = Like::where('user_id', $user->id)->where('qa_id', $qa->id)->where('emotion', $emotion)->first();
        if ($existingLike) {
            $existingLike->delete();
            $message = 'Unliked successfully';
        } else {
            Like::create([
                'user_id' => $user->id,
                'qa_id' => $qa->id,
                'emotion' => $emotion,
            ]);
            $message = 'Liked successfully';
        }
        return response()->json(['message' => $message]);
    }
    public function FetchLikeInPost(Post $post){
        $likes = Like::where('post_id',$post->id)->get();
        return response()->json($likes);
    }
    public function FetchLikeInBlog(Blog $blog){
        $likes = Like::where('blog_id',$blog->id)->get();
        return response()->json($likes);
    }
    public function FetchLikeInQa(Qa $qa){
        $likes = Like::where('qa_id',$qa->id)->get();
        return response()->json($likes);
    }
}