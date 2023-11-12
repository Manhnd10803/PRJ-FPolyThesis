<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\User;
use App\Models\Major;
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
            return redirect()->route('admin.blogs.show', ['blog' => $blog->id])
                ->with('success', 'Bài viết đã được duyệt thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            return throw $e;
        }
    }
    public function rejectBlog(Blog $blog)
    {
        DB::beginTransaction();
        try {
            $blog->update(['status' => config('default.blog.status.reject')]);
            DB::commit();
            return redirect()->route('admin.blogs.show', ['blog' => $blog->id])
                ->with('success', 'Bài viết đã được hủy thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            return throw $e;
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

    //admin web
    public function index()
    {
        $status = request()->is('admin/blogs/approve') ? config('default.blog.status.pending') : config('default.blog.status.approved');
        $blogs = Blog::with('user',)->where('status', $status)->latest()->get();
        foreach ($blogs as $blog) {
            $dislikeCount = $blog->likes->where('emotion', 'dislike')->count();
            if ($dislikeCount > 100) {
                $blog->update(['status' => 0]);
            }
        }

        $title = $status == config('default.blog.status.approved') ? 'Danh sách blog đã duyệt' : 'Danh sách blog chờ duyệt';
        return view('admin.blogs.index', compact('blogs', 'title'));
    }
    public function countPendingBlogs()
    {
        $count = Blog::where('status', config('default.blog.status.pending'))->count();
        return $count;
    }

    public function create()
    {
        $users = User::all();
        $majors = Major::all();
        return view('admin.blogs.create', compact('users', 'majors'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Thêm kiểm tra hình ảnh
            'user_id' => 'required|exists:users,id',
            'majors_id' => 'required|exists:majors,id',
            'hashtag' => 'nullable|string|max:255',
            'status' => 'nullable|integer',
            'views' => 'integer|min:0',
        ]);

        // Lưu hình ảnh vào thư mục public/thumbnails
        $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');

        // Lưu thông tin blog vào cơ sở dữ liệu, bao gồm đường dẫn của hình ảnh
        Blog::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'thumbnail' => $thumbnailPath, // Lưu đường dẫn của hình ảnh
            'user_id' => $request->input('user_id'),
            'majors_id' => $request->input('majors_id'),
            'hashtag' => $request->input('hashtag'),
            'status' => $request->input('status'),
            'views' => $request->input('views', 0),
        ]);

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog created successfully');
    }



    public function show(Blog $blog)
    {
        $blog = Blog::with('user', 'likes', 'comments')->find($blog->id);

        // Calculate like, dislike, and comment counts
        $blog->like_count = $blog->likes->where('emotion', 'like')->count();
        $blog->dislike_count = $blog->likes->where('emotion', 'dislike')->count();
        $blog->comment_count = $blog->comments->count();

        return view('admin.blogs.show', compact('blog'));
    }

    public function edit(Blog $blog)
    {
        $users = User::all();
        $majors = Major::all();
        return view('admin.blogs.edit', compact('blog', 'users', 'majors'));
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'user_id' => 'required|exists:users,id',
            'majors_id' => 'required|exists:majors,id',
            'hashtag' => 'nullable|string|max:255',
            'status' => 'nullable|integer',
            'views' => 'integer|min:0',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Kiểm tra hình ảnh chỉ khi có sự thay đổi
        ]);

        // Kiểm tra và lưu hình ảnh mới (nếu có)
        if ($request->hasFile('thumbnail')) {
            // Xóa hình ảnh cũ (nếu có)
            if ($blog->thumbnail) {
                Storage::disk('public')->delete($blog->thumbnail);
            }

            // Lưu hình ảnh mới vào thư mục public/thumbnails
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');

            // Cập nhật đường dẫn của hình ảnh trong cơ sở dữ liệu
            $blog->update([
                'title' => $request->input('title'),
                'content' => $request->input('content'),
                'thumbnail' => $thumbnailPath,
                'user_id' => $request->input('user_id'),
                'majors_id' => $request->input('majors_id'),
                'hashtag' => $request->input('hashtag'),
                'status' => $request->input('status'),
                'views' => $request->input('views', 0),
            ]);
        } else {
            // Nếu không có hình ảnh mới, chỉ cập nhật thông tin không liên quan đến hình ảnh
            $blog->update($request->except('thumbnail'));
        }

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog updated successfully');
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();
        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog deleted successfully');
    }
}