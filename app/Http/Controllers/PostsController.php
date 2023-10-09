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
    public function post(PostRequest $request)
    {
        DB::beginTransaction();
        try{
            $content = $request->input('content');
            $title = substr(strip_tags($content), 0, 30);
            $imagePath = null;
            $tags = null;
            $major_id = $request->input('major_id');
            if($request->hasFile('images') ){
                $image = $request->file('images');
                if (!$image->isValid() || !in_array($image->getClientOriginalExtension(), ['jpg','jpeg','png'])) {
                    return redirect()->back()->with('error', 'Tệp tin không hợp lệ. Chỉ chấp nhận tệp tin JPEG , JPG hoặc PNG.');
                }
                $imagePath = time() . '.' . $image->extension();
                $image->move(storage_path('app/public'), $imagePath);
            }
            if($request->hasAny('tags')){
                $tags = $request->input('tags');
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
    public function update(Request $request, Post $post)
    {
     DB::beginTransaction();
     try{
        $content = $request->input('content');
        $oldImagePath  =$post->images;
        $tags = $post->tags;
        $major_id = $request->input('major_id');
        if($request->hasFile('images') ){
            if($oldImagePath){
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
        if($request->hasAny('tags')){
            $tags = $request->input('tags');
        }
        $post->update([
            'content' => $content,
            'images' => $imagePath,
            'tags' => $tags,
            'major_id'=> $major_id,
        ]);
        DB::commit();
        return response()->json($post, 200);
     }catch(\Exception $e){
        DB::rollBack();
            return response()->json(['errors'=> $e->getMessage()], 400);
     } 
    }
    public function delete(Post $post)
    {
        $post->delete();
        return response()->json(['message' =>'Xóa thành công'] ,200);
    }
}