<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
  public function CreateBlog(Request $request){
    DB::beginTransaction();
    try{
        $title = $request->input('title');
        $content = $request->input('content');
        $majors_id  =$request->input('majors_id');
        $hashtag  =$request->input('hashtag');
       if($request->hasFile('thumbnail')){
        $thumbnail = $request->file('thumbnail');
        if (!$thumbnail->isValid() || !in_array($thumbnail->getClientOriginalExtension(), ['jpg', 'jpeg', 'png'])) {
            DB::rollBack();
            return response()->json(['error' => 'Tệp tin không hợp lệ. Chỉ chấp nhận tệp tin JPEG, JPG hoặc PNG.'], 400);
        }
        $imagePath = time() . '_' . uniqid() . '.' . $thumbnail->extension();
        $thumbnail->move(storage_path('app/public'), $imagePath);
       }
       $blog = new Blog([
        'user_id' => Auth::id(),
        'title' => $title,
        'content' => $content,
        'thumbnail' => $imagePath,
        'majors_id' => $majors_id,
        'hashtag' => $hashtag,
       ]);
       $blog->save();
       DB::commit();
       return response()->json($blog, 200);
    }catch(\Exception $e){
        DB::rollBack();
        return response()->json(['errors' => $e->getMessage()], 400);
    }
  }
public function UpdateBlog(Request $request, Blog $blog) {
    DB::beginTransaction();
    try {
        $title = $request->input('title');
        $content = $request->input('content');
        $majors_id = $request->input('majors_id');
        $hashtag = $request->input('hashtag');
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            if (!$thumbnail->isValid() || !in_array($thumbnail->getClientOriginalExtension(), ['jpg', 'jpeg', 'png'])) {
                DB::rollBack();
                return response()->json(['error' => 'Tệp tin không hợp lệ. Chỉ chấp nhận tệp tin JPEG, JPG hoặc PNG.'], 400);
            }
            $imagePath = time() . '_' . uniqid() . '.' . $thumbnail->extension();
            $thumbnail->move(storage_path('app/public'), $imagePath);
            
        }
        $blog->update([
            'title' => $title,
            'content' => $content,
            'thumbnail' => $imagePath,
            'majors_id' => $majors_id,
            'hashtag' => $hashtag,
        ]);
        $blog->save();
        DB::commit();
        return response()->json($blog, 200);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['errors' => $e->getMessage()], 400);
    }
}
public function DeleteBlog(Blog $blog){
    DB::beginTransaction();
    try {
        Comment::where('blog_id', $blog->id)->delete();
        Like::where('blog_id',$blog->id)->delete();
        $blog->likes()->delete();
        $blog->comments()->delete();
        $blog->delete();
        DB::commit();
        return response()->json(['message' => 'Bài blog đã bị xóa thành công.'], 200);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['errors' => $e->getMessage()], 400);
    }
}

}