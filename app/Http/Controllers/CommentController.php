<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    public function AddComment(Request $request, Post $post) {
        DB::beginTransaction();
        if (Auth::check()) {
            $user = Auth::user();
            $content = $request->input('content');
            $parent_id = $request->input('parent_id'); 
            $comment = new Comment([
                'user_id' => $user->id,
                'post_id' => $post->id,
                'content' => $content,
                'parent_id' => $parent_id, 
            ]);
            $comment->save();
            DB::commit();
            return response()->json(['message' => 'Comment added successfully'], 200);
        } else {
            DB::rollBack();
            return response()->json(['error' => 'You must be logged in to comment'], 401);
        }
    }    
    public function FetchCommentInPost(Post $post) {
        $comments = Comment::with('user')->where('post_id', $post->id)->get();
        return response()->json($comments);
    }
    
}