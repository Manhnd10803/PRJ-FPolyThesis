<?php

namespace App\Http\Controllers;

use App\Models\Emotion;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function LikePost(Post $post , Emotion $emotion)
    {
        $user = Auth::user(); 
        $existingLike = Like::where('user_id', $user->id)
        ->where('post_id', $post->id)
        ->where('emotion_id', $emotion->id)->first();
        if ($existingLike) {
            $existingLike->delete();
            $message = 'Unliked successfully';
        } else {
            Like::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
                'emotion_id' => $emotion->id,
            ]);
            $message = 'Liked successfully';
        }
        return response()->json(['message' => $message]);
    }
    public function FetchLikeInPost(Post $post){
        $likes = Like::where('post_id',$post->id)->get();
        return response()->json($likes);
    }
}
