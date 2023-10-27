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
    public function AddComment(Request $request, $type, $id)
    {
        DB::beginTransaction();
        if (Auth::check()) {
            $user = Auth::user();
            $content = $request->input('content');
            $parent_id = $request->input('parent_id');
            // Xác định model tương ứng với loại mục
            $model = null;
            switch ($type) {
                case 'post':
                    $model = Post::find($id);
                    break;
                case 'blog':
                    $model = Blog::find($id);
                    break;
                case 'qa':
                    $model = Qa::find($id);
                    break;
                default:
                    DB::rollBack();
                    return response()->json(['error' => 'Invalid type'], 400);
            }
            if (!$model) {
                DB::rollBack();
                return response()->json(['error' => 'Item not found'], 404);
            }
            $comment = new Comment([
                'user_id' => $user->id,
                "{$type}_id" => $id,
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

    public function allCommentsLevel1($type, $id)
    {
        if ($type == 'post' || $type == 'blog' || $type == 'qa') {
            $comments = Comment::where($type . '_id', $id)->where('parent_id', 0)->get();
            foreach ($comments as $comment) {
                $comment->user;
                $comment->reply = Comment::where($type . '_id', $id)->where('parent_id', $comment->id)->count();
            };
            return response()->json(['comments' => $comments]);
        } else {
            return response()->json(['error' => 'Invalid type'], 400);
        }
    }
    public function allSubordinateComments($type, $id, $comment_id)
    {
        if ($type == 'post' || $type == 'blog' || $type == 'qa') {
            $comments = Comment::where($type . '_id', $id)->where('parent_id', $comment_id)->get();
            foreach ($comments as $comment) {
                $comment->user;
                $comment->reply = Comment::where($type . '_id', $id)->where('parent_id', $comment->id)->count();
            };
            return response()->json(['comments' => $comments]);
        } else {
            return response()->json(['error' => 'Invalid type'], 400);
        }
    }
    public function editComment(Request $request, Comment $comment)
    {
        try {
            DB::beginTransaction();
            if (Auth::user()->id == $comment->user_id) {
                $comment->update([
                    'content' => $request->content,
                ]);
                DB::commit();
                return response()->json(['message' => 'Updated'], 200);
            } else {
                return response()->json(['error' => 'Authorization Error'], 400);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    public function deleteComment(Comment $comment)
    {
        try {
            DB::beginTransaction();
            if (Auth::user()->id == $comment->user_id) {
                $comment->delete();
                DB::commit();
                return response()->json(['message' => 'Deleted'], 200);
            } else {
                return response()->json(['error' => 'Authorization Error'], 400);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}