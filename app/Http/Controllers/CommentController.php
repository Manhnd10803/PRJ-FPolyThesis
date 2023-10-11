<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function AddComment(Request $request , Post $post){
        if (Auth::check()) {
            $user = Auth::user();
            $content = $request->input('content');

            $comment = new Comment([
                'user_id' => $user->id,
                'post_id' => $post->id,
                'content' => $content,
            ]);
            $comment->save();
            return response()->json(['success', 'Comment added successfully'],200);
        } else {
            return response()->json(['error', 'You must be logged in to comment'],401);
        }
    }
    public function FetchCommentInPost(Post $post){
        $comments = Comment::where('post_id',$post->id)->get();
        return response()->json($comments);
    }
}
