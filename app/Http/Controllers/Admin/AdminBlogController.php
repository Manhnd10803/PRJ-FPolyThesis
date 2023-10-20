<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminBlogController extends Controller
{
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
