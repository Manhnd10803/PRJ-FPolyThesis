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
       /**
     * @OA\Post(
     *     path="/api/blogs",
     *     tags={"Blogs"},
     *     summary="Tạo blog mới",
     *     description="Tạo một blog mới",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "content", "majors_id", "thumbnail"},
     *             @OA\Property(property="title", type="string", description="Tiêu đề của blog", maxLength=255),
     *             @OA\Property(property="content", type="string", description="Nội dung của blog"),
     *             @OA\Property(property="majors_id", type="integer", description="ID của chuyên ngành liên quan đến blog"),
     *             @OA\Property(property="hashtag", type="string", description="Hashtag của blog", maxLength=255, nullable=true),
     *             @OA\Property(property="thumbnail", type="string", format="binary", description="Hình ảnh đại diện của blog (JPEG, JPG hoặc PNG)")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Blog đã được tạo thành công"),
     *     @OA\Response(response=400, description="Tệp tin không hợp lệ")
     * )
     */
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

        /**
     * @OA\Put(
     *     path="/api/blogs/{blog}",
     *     tags={"Blogs"},
     *     summary="Cập nhật thông tin blog",
     *     description="Cập nhật thông tin của một blog đã tồn tại",
     *     @OA\Parameter(
     *         name="blog",
     *         in="path",
     *         required=true,
     *         description="ID của blog cần cập nhật",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "content", "majors_id", "thumbnail"},
     *             @OA\Property(property="title", type="string", description="Tiêu đề của blog", maxLength=255),
     *             @OA\Property(property="content", type="string", description="Nội dung của blog"),
     *             @OA\Property(property="majors_id", type="integer", description="ID của chuyên ngành liên quan đến blog"),
     *             @OA\Property(property="hashtag", type="string", description="Hashtag của blog", maxLength=255, nullable=true),
     *             @OA\Property(property="thumbnail", type="string", format="binary", description="Hình ảnh đại diện của blog (JPEG, JPG hoặc PNG)")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Blog đã được cập nhật thành công"),
     *     @OA\Response(response=400, description="Tệp tin không hợp lệ hoặc lỗi xử lý")
     * )
     */

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

    /**
     * @OA\Delete(
     *     path="/api/blogs/{blog}",
     *     tags={"Blogs"},
     *     summary="Xóa blog",
     *     description="Xóa một blog đã tồn tại",
     *     @OA\Parameter(
     *         name="blog",
     *         in="path",
     *         required=true,
     *         description="ID của blog cần xóa",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Bài blog đã bị xóa thành công", @OA\JsonContent()),
     *     @OA\Response(response=401, description="Unauthorized", @OA\JsonContent()),
     *     @OA\Response(response=403, description="Forbidden", @OA\JsonContent()),
     *     @OA\Response(response=404, description="Bài blog không tồn tại", @OA\JsonContent()),
     *     @OA\Response(response=500, description="Lỗi xảy ra khi xóa bài blog", @OA\JsonContent())
     * )
     */

    public function DeleteBlog(Blog $blog)
    {
        DB::beginTransaction();
        try {
            if (Auth::check() && Auth::user()->id === $blog->user_id) {
                Comment::where('blog_id', $blog->id)->delete();
                Like::where('blog_id', $blog->id)->delete();
                $blog->likes()->delete();
                $blog->comments()->delete();
                $blog->delete();
                DB::commit();
                return response()->json(['message' => 'Bài blog đã bị xóa thành công.'], 200);
            } else {
                DB::rollBack();
                return response()->json(['message' => 'Bạn không có quyền này']);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
     /**
     * @OA\Get(
     *     path="/api/blogs/count-like/{blog}/like-info",
     *     tags={"Blogs"},
     *     summary="Lấy số lượng lượt thích của bài viết kèm info user",
     *     description="Lấy số lượng lượt thích thông tin user và sắp xếp theo loại cảm xúc của một bài viết dựa trên ID của bài viết.",
     *     @OA\Parameter(
     *         name="blog",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Số lượng lượt thích của bài viết"),
     *     @OA\Response(response=404, description="Bài viết không được tìm thấy")
     * )
     */
    public function CountLikeInBlog(Blog $blog){
        DB::beginTransaction();
        try{
            // Đếm lượt thích của blog
            $likeCount = $blog->likes->count();
            $likers = $blog->likes->map(function ($like) {
                return [
                    'user' => $like->user,
                    'emotion' => $like->emotion,
                ];
            });
            // Sắp xếp danh sách người đã like dựa trên biểu cảm
            $likers = $likers->sortBy('emotion');
            DB::commit();
            return response()->json(['like_count' => $likeCount, 'likers' => $likers->values()->all(),]);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
      /**
     * @OA\Get(
     *     path="/api/blogs/count-cmt/{blog}",
     *     tags={"Blogs"},
     *     summary="Lấy số lượng bình luận và trả lời của bài viết",
     *     description="Lấy số lượng bình luận và trả lời của một bài viết dựa trên ID của bài viết.",
     *     @OA\Parameter(
     *         name="blog",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Số lượng bình luận và trả lời của bài viết"),
     *     @OA\Response(response=404, description="Bài viết không được tìm thấy")
     * )
     */

     public function CountCommentInBlog(Blog $blog){
        $commentCount = Comment::where('blog_id', $blog->id)->count();
        $replyCount = Comment::where('blog_id', $blog->id)->where('parent_id', '>', 0)->count();
        $totalCommentsAndReplies = $commentCount + $replyCount;
        return response()->json(['total' => $totalCommentsAndReplies], 200);
     }
}