<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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
        try{
            $content = $request->input('content');
            $title = substr(strip_tags($content), 0, 30);
            $imagePath = null;
            $tags = $request->input('tags');
            $major_id = $request->input('major_id');
            if($request->hasFile('images') ){
                $image = $request->file('images');
                if (!$image->isValid() || !in_array($image->getClientOriginalExtension(), ['jpg','jpeg','png'])) {
                    return redirect()->back()->with('error', 'Tệp tin không hợp lệ. Chỉ chấp nhận tệp tin JPEG , JPG hoặc PNG.');
                }
                $imagePath = time() . '.' . $image->extension();
                $image->move(storage_path('app/public'), $imagePath);
            }
            $post = new Post([
                'title' => $title,
                'content' => $content,
                'images' => $imagePath,
                'user_id' => Auth::id(),
                'tags' => $tags,
                'major_id'=> $major_id,
            ]);
            $post->save();
            DB::commit();
            return response()->json($post, 200);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['errors'=> $e->getMessage()], 400);
        }
    }
    public function UpdatePost(Request $request, Post $post)
    {
        DB::beginTransaction();
        try {
            $oldImagePath = $post->images;    
            if ($request->hasFile('images')) {
                if ($oldImagePath) {
                    $oldImagePath = storage_path('app/public') . '/' . $oldImagePath;
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
                $image = $request->file('images');
                if (!$image->isValid() || !in_array($image->getClientOriginalExtension(), ['jpg','jpeg','png'])) {
                    return redirect()->back()->with('error', 'Tệp tin không hợp lệ. Chỉ chấp nhận tệp tin JPEG , JPG hoặc PNG.');
                }
                $imagePath = time() . '.' . $image->extension();
                $image->move(storage_path('app/public'), $imagePath);
            }
            $content = $request->input('content', $post->content);
            $tags = $request->input('tags', $post->tags);
            $major_id = $request->input('major_id', $post->major_id);
            $status = $request->input('status', $post->status);
            $post->update([
                'content' => $content,
                'images' => $imagePath,
                'tags' => $tags,
                'major_id' => $major_id,
                'status' => $status
            ]);
    
            DB::commit();
            return response()->json($post, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }    
    public function DeletePost(Post $post)
    {
        $post->delete();
        return response()->json(['message' =>'Xóa thành công'] ,200);
    }
}