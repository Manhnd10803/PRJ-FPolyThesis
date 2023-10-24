<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Qa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    public function AddCommentToPost(Request $request, Post $post) {
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
    public function AddCommentToBlog(Request $request, Blog $blog) {
        DB::beginTransaction();
        if (Auth::check()) {
            $user = Auth::user();
            $content = $request->input('content');
            $parent_id = $request->input('parent_id'); 
            $comment = new Comment([
                'user_id' => $user->id,
                'blog_id' => $blog->id,
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
    public function store(Request $request) {
        $data = $request->all();
    
        $comment = new Comment($data);
        $comment->save();
    
        return response()->json(['message' => 'Bình luận đã được đăng thành công'], 200);
    }
    public function AddCommentToQa(Request $request, Qa $qa) {
        DB::beginTransaction();
        if (Auth::check()) {
            $user = Auth::user();
            $content = $request->input('content');
            $parent_id = $request->input('parent_id'); 
            $comment = new Comment([
                'user_id' => $user->id,
                'qa_id' => $qa->id,
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
    public function FetchCommentInBlog(Blog $blog) {
        $comments = Comment::with('user')->where('blog_id', $blog->id)->get();
        return response()->json($comments);
    }
    public function FetchCommentInQa(Qa $qa) {
        $comments = Comment::with('user')->where('qa_id', $qa->id)->get();
        return response()->json($comments);
    }
    
}