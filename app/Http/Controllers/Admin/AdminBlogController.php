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

    /**
     * @OA\Get(
     *     path="/api/blogs/list-approved",
     *     tags={"Admin Blogs"},
     *     summary="Danh sách các bài viết đã được duyệt",
     *     description="Lấy danh sách tất cả các bài viết đã được duyệt bởi admin",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách các bài viết đã được duyệt")
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/blogs/list-pending",
     *     tags={"Admin Blogs"},
     *     summary="Danh sách các bài viết chờ duyệt",
     *     description="Lấy danh sách tất cả các bài viết đang chờ duyệt",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách các bài viết chờ duyệt")
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/blogs/approve/{blog}",
     *     tags={"Admin Blogs"},
     *     summary="Duyệt một bài viết",
     *     description="Duyệt một bài viết chờ duyệt dựa trên ID của bài viết.",
     *     @OA\Parameter(
     *         name="blog",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết cần duyệt",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Bài viết đã được duyệt thành công")
     *     ),
     *     @OA\Response(response=400, description="Lỗi trong quá trình xử lý")
     * )
     */
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
    /**
     * @OA\Get(
     *     path="/api/blogs/reject/{blog}",
     *     tags={"Admin Blogs"},
     *     summary="Từ chối một blog",
     *     description="Từ chối một blog dựa trên ID.",
     *     @OA\Parameter(
     *         name="blog",
     *         in="path",
     *         required=true,
     *         description="ID của blog cần từ chối",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Từ chối blog thành công"),
     *     @OA\Response(response=400, description="Lỗi trong quá trình xử lý")
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/blogs/detail/{blog}",
     *     tags={"Admin Blogs"},
     *     summary="Xem chi tiết một bài viết",
     *     description="Trả về thông tin chi tiết của một bài viết dựa trên ID của bài viết.",
     *     @OA\Parameter(
     *         name="blog",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết cần xem chi tiết",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Thông tin chi tiết của bài viết"
     *     ),
     *     @OA\Response(response=404, description="Bài viết không tồn tại")
     * )
     */
    public function detailBlog(Blog $blog)
    {
        //lấy kèm thông tin người đăng
        //sau cần lấy ra conmment, like, rate sẽ cập nhật trong sprint 3
        $blog->user;
        return response()->json($blog);
    }
}
