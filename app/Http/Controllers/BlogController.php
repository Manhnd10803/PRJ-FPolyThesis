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
    public function CreateBlog(Request $request)
    {
        DB::beginTransaction();
        try {
            $title = $request->input('title');
            $content = $request->input('content');
            $majors_id  = $request->input('majors_id');
            $hashtag  = $request->input('hashtag');
            if ($request->hasFile('thumbnail')) {
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
                'status' => config('default.blog.status.pending'),
            ]);
            $blog->save();
            DB::commit();
            return response()->json($blog, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    public function UpdateBlog(Request $request, Blog $blog)
    {
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
    public function DeleteBlog(Blog $blog)
    {
        DB::beginTransaction();
        try {
            Comment::where('blog_id', $blog->id)->delete();
            Like::where('blog_id', $blog->id)->delete();
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

    //Admin
    //bài viết đã duyệt
    public function listAllBlog()
    {
        $blogs = Blog::where('status', config('default.blog.status.approved'))->get();
        //lấy kèm thông tin người đăng
        //sau cần lấy ra conmment, like, rate sẽ cập nhật trong sprint 3
        foreach ($blogs as $blog) {
            $user = $blog->user;
        }
        return response()->json($blogs);
    }
    //bài viết chờ duyệt
    public function listPedingBlog()
    {
        $blogs = Blog::where('status', config('default.blog.status.pending'))->get();
        //lấy kèm thông tin người đăng
        //sau cần lấy ra conmment, like, rate sẽ cập nhật trong sprint 3
        foreach ($blogs as $blog) {
            $user = $blog->user;
        }
        return response()->json($blogs);
    }
    //duyệt bài viết
    public function approveBlog(Blog $blog)
    {
        DB::beginTransaction();
        try {
            $blog->update(['status' => config('default.blog.status.approved')]);
            DB::commit();
            return response()->json(['message' => 'Duyệt thành công'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    public function rejectBlog(Blog $blog)
    {
        DB::beginTransaction();
        try {
            $blog->update(['status' => config('default.blog.status.reject')]);
            DB::commit();
            return response()->json(['message' => 'Từ chối thành công'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    //chi tiết bài viết
    public function detailBlog(Blog $blog)
    {
        //lấy kèm thông tin người đăng
        //sau cần lấy ra conmment, like, rate sẽ cập nhật trong sprint 3
        $blog->user;
        return response()->json($blog);
    }
}