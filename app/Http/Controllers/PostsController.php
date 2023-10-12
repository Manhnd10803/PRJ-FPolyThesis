<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    public function ShowPostProfile(){
        $posts = Post::where('user_id', Auth::id()) 
            ->orWhere(function ($query) {
                $query->where('status', '<>', 1); 
            })
            ->orderBy('created_at', 'DESC')->get();
        return response()->json($posts);
    }
    public function CreatePost(PostRequest $request)
    {
        DB::beginTransaction();
        try {
            $content = $request->input('content');
            $feeling = $request->input('feeling');
            $hashtag = $request->input('hashtag');
            $imagePaths = [];
            if ($request->hasFile('images')) {
                $images = $request->file('images');
                if (count($images) > 5) {
                    DB::rollBack();
                    return response()->json(['error' => 'Không thể tải lên quá 5 hình ảnh.'], 400);
                }
                foreach ($images as $image) {
                    if (!$image->isValid() || !in_array($image->getClientOriginalExtension(), ['jpg', 'jpeg', 'png'])) {
                        DB::rollBack();
                        return response()->json(['error' => 'Tệp tin không hợp lệ. Chỉ chấp nhận tệp tin JPEG, JPG hoặc PNG.'], 400);
                    }
                    $imagePath = time() . '_' . uniqid() . '.' . $image->extension();
                    $image->move(storage_path('app/public'), $imagePath);
                    $imagePaths[] = $imagePath;
                }
            }
            $post = new Post([
                'user_id' => Auth::id(),
                'content' => $content,
                'feeling' => $feeling,
                'images' => $imagePaths,
                'hashtag' => $hashtag,
            ]);
            $post->save();
            DB::commit();
            return response()->json($post, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    
    public function UpdatePost(Request $request, Post $post){
    DB::beginTransaction();
    try {
        $imagePath = $post->images;  
        if ($request->hasFile('images')) {
            $images = $request->file('images');   
            if (count($images) > 5) {
                DB::rollBack();
                return response()->json(['error' => 'Không thể tải lên quá 5 hình ảnh.'], 400);
            }
            if ($imagePath) {
                $imagePath = storage_path('app/public') . '/' . $imagePath;
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }  
            $newImagePaths = [];
            foreach ($images as $image) {
                if (!$image->isValid() || !in_array($image->getClientOriginalExtension(), ['jpg', 'jpeg', 'png'])) {
                    DB::rollBack();
                    return response()->json(['error' => 'Tệp tin không hợp lệ. Chỉ chấp nhận tệp tin JPEG, JPG hoặc PNG.'], 400);
                }  
                $imagePath = time() . '_' . uniqid() . '.' . $image->extension();
                $image->move(storage_path('app/public'), $imagePath);
                $newImagePaths[] = $imagePath;
            }
        }
        $content = $request->input('content', $post->content);
        $hashtag = $request->input('hashtag', $post->hashtag);
        $status = $request->input('status', $post->status);
        $feeling = $request->input('feeling', $post->feeling);  
        $post->update([
            'content' => $content,
            'feeling' => $feeling,
            'images' => $newImagePaths ? $newImagePaths : $imagePath, 
            'hashtag' => $hashtag,
            'status' => $status,
        ]);
        DB::commit();
        return response()->json($post, 200);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['errors' => $e->getMessage()], 400);
    }
}
    public function DeletePost(Post $post){
        DB::beginTransaction();
        try {
            Comment::where('post_id', $post->id)->delete();
            Like::where('post_id',$post->id)->delete();
            $post->likes()->delete();
            $post->comments()->delete();
            $post->delete();
            DB::commit();
            return response()->json(['message' => 'Bài viết đã bị xóa thành công.'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    public function CountLikeInPost(Post $post){
        $likeCount = $post->likes->count();
        return response()->json($likeCount);
     }
     public function CountCommentInPost(Post $post){
        $commentCount = Comment::where('post_id', $post->id)->count();
        $replyCount = Comment::where('post_id', $post->id)->where('parent_id', '>', 0)->count();
        $totalCommentsAndReplies = $commentCount + $replyCount;
        return response()->json(['total' => $totalCommentsAndReplies], 200);
     }
}