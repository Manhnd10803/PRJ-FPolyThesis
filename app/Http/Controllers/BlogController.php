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
 * @OA\Get(
 *     path="/api/blogs",
 *     summary="Lấy danh sách các bài viết",
 *     description="Lấy danh sách các bài viết tùy biến dữ liệu dựa trên majors_id và hashtag (mặc định không có tùy biến đổ tất cả dữ liệu ra).",
 *     operationId="getBlogs",
 *     tags={"Blogs"},
 *     @OA\Parameter(
 *         name="majors_id",
 *         in="query",
 *         description="ID của ngành học (nếu có)",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="hashtag",
 *         in="query",
 *         description="Hashtag (nếu có)",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response="200",
 *         description="Danh sách bài viết",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="blog", type="object",
 *                     @OA\Property(property="id", type="integer"),
 *                     @OA\Property(property="status", type="integer", description="trạng thái bài blog"),
 *                     @OA\Property(property="user_id", type="integer", description="người đăng blog"),
 *                     @OA\Property(property="title", type="string", description="tiêu đề bài blog"),
 *                     @OA\Property(property="content", type="text", description="nội dung bài blog"),
 *                     @OA\Property(property="thumbnail", type="string", description="ảnh  bài blog"),
 *                     @OA\Property(property="majors_id", type="integer", description="id của chuyên ngành liên quan đến blog"),
 *                     @OA\Property(property="hashtag", type="string", description="hashtag liên quan đến blog"),
 *                     @OA\Property(property="views", type="integer", description="Số lượt xem bài blog"),
 *                     @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
 *                     @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
 *                     @OA\Property(property="likes", type="array",
 *                         @OA\Items(
 *                             @OA\Property(property="id", type="integer"),
 *                             @OA\Property(property="user_id", type="integer"),
 *                             @OA\Property(property="emotion", type="string"),
 *                             @OA\Property(property="post_id", type="integer"),
 *                             @OA\Property(property="blog_id", type="integer"),
 *                             @OA\Property(property="qa_id", type="integer"),
 *                             @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
 *                             @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
 *                             @OA\Property(property="user", type="object",
 *                                 @OA\Property(property="id", type="integer"),
 *                                 @OA\Property(property="username", type="string"),
 *                                 @OA\Property(property="first_name", type="string", nullable=true),
 *                                 @OA\Property(property="last_name", type="string", nullable=true),
 *                             ),
 *                         ),
 *                     ),
 *                     @OA\Property(property="like_counts_by_emotion", type="object",
 *                         @OA\Property(property="total_likes", type="integer", description="Tổng số lượt thích"),
 *                         @OA\Property(property="emotion1", type="integer", description="Số lượt thích với emotion1"),
 *                         @OA\Property(property="emotion2", type="integer", description="Số lượt thích với emotion2"),
 *                     ),
 *                     @OA\Property(property="total_comments", type="integer", description="Tổng số bình luận"),
 *                     @OA\Property(property="comments", type="array",
 *                         @OA\Items(
 *                             @OA\Property(property="id", type="integer"),
 *                             @OA\Property(property="user_id", type="integer"),
 *                             @OA\Property(property="content", type="string", description="Nội dung bình luận"),
 *                             @OA\Property(property="parent_id", type="integer"),
 *                             @OA\Property(property="post_id", type="integer"),
 *                             @OA\Property(property="blog_id", type="integer"),
 *                             @OA\Property(property="qa_id", type="integer"),
 *                             @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
 *                             @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
 *                             @OA\Property(property="reply", type="integer", description="Số lượng reply"),
 *                             @OA\Property(property="user", type="object",
 *                                 @OA\Property(property="id", type="integer"),
 *                                 @OA\Property(property="username", type="string"),
 *                                 @OA\Property(property="first_name", type="string", nullable=true),
 *                                 @OA\Property(property="last_name", type="string", nullable=true),
 *                             ),
 *                         ),
 *                     ),
 *                 ),
 *             ),
 *         ),
 *     ),
 *     @OA\Response(
 *         response="400",
 *         description="Lỗi",
 *         @OA\JsonContent(
 *             @OA\Property(property="errors", type="string")
 *         ),
 *     ),
 * )
 */

    public function ShowAllBlogs(Request $request)
    {
        DB::beginTransaction();
        try {
            $majorsId = $request->input('majors_id');
            $hashtag = $request->input('hashtag');
            $query = Blog::query();

            if ($majorsId) {
                $query->where('majors_id', $majorsId);
            }

            if ($hashtag) {
                $query->where('content', 'LIKE', '%' . $hashtag . '%');
            }

            $blogs = $query->latest()->get();

            $result = [];

            foreach ($blogs as $blog) {
                $likeCountsByEmotion = [];
                // số lượng emotion trừ dislike
                $likeCountsByEmotion['total_likes'] = DB::table('likes')
                ->where('blog_id', $blog->id)
                ->whereNotIn('emotion', ['dislike'])
                ->count();
                // Lấy danh sách người đã like bài viết và thông tin của họ
                $likers = $blog->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });
                // Tính số lượt thích cho mỗi biểu cảm (emotion)
                $emotions = $likers->pluck('emotion')->unique();
                foreach ($emotions as $emotion) {
                    $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                }
                // Tổng số bình luận + 3 bình luận demo
                $totalComment = Comment::where('blog_id', $blog->id)->count();
                $commentDemos = Comment::where('blog_id', $blog->id)->where('parent_id', null)->limit(3)->get();
                foreach ($commentDemos as $commentDemo) {
                    $commentDemo->user;
                    //số lượng reply
                    $commentDemo->reply = Comment::where('blog_id', $blog->id)->where('parent_id', $commentDemo->id)->count();
                }
                $blogData = [
                    'blog' => $blog,
                    'like_counts_by_emotion' => $likeCountsByEmotion,
                    'like' => $likers,
                    'total_comments' => $totalComment,
                    'comment' => $commentDemos,
                ];
                array_push($result, $blogData);
            }
            DB::commit();
            return response()->json($result, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

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
            $thumbnail = $request->input('thumbnail');
            $blog = new Blog([
                'user_id' => Auth::id(),
                'title' => $title,
                'content' => $content,
                'thumbnail' => $thumbnail,
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
            $title = $request->input('title'.$blog->title);
            $content = $request->input('content'.$blog->content);
            $majors_id = $request->input('majors_id'.$blog->majors_id);
            $hashtag = $request->input('hashtag'.$blog->hashtag);
            $thumbnail = $request->input('thumbnail'.$blog->thumbnail); 
            $blog->update([
                'title' => $title,
                'content' => $content,
                'thumbnail' => json_encode($thumbnail),
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
     *     path="/api/blogs/{blog}",
     *     tags={"Blogs"},
     *     summary="Xem chi tiết blog",
     *     description="Xem chi tiết về một bài blog cụ thể",
     *     @OA\Parameter(
     *         name="blog",
     *         in="path",
     *         required=true,
     *         description="ID của bài blog",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(response=200, description="Thành công. Trả về thông tin chi tiết về blog, số lượng cảm xúc và bình luận.",
     *         @OA\JsonContent(
     *             @OA\Property(property="blog", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="status", type="integer"),
     *                 @OA\Property(property="user_id", type="integer"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="content", type="string"),
     *                 @OA\Property(property="thumbnail", type="string"),
     *                 @OA\Property(property="majors_id", type="integer"),
     *                 @OA\Property(property="hashtag", type="string"),
     *                 @OA\Property(property="views", type="integer"),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time"),
     *                 @OA\Property(property="major", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="majors_name", type="string"),
     *                     @OA\Property(property="majors_code", type="string"),
     *                     @OA\Property(property="description", type="string"),
     *                     @OA\Property(property="created_at", type="string", format="date-time"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time")
     *                 ),
     *                 @OA\Property(property="likes", type="array",
     *                     @OA\Items(
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="user_id", type="integer"),
     *                         @OA\Property(property="emotion", type="string"),
     *                         @OA\Property(property="post_id", type="integer"),
     *                         @OA\Property(property="blog_id", type="integer"),
     *                         @OA\Property(property="qa_id", type="integer"),
     *                         @OA\Property(property="created_at", type="string", format="date-time"),
     *                         @OA\Property(property="updated_at", type="string", format="date-time")
     *                     )
     *                 ),
     *                 @OA\Property(property="user", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="username", type="string"),
     *                     @OA\Property(property="first_name", type="string"),
     *                     @OA\Property(property="last_name", type="string"),
     *                     @OA\Property(property="group_id", type="integer"),
     *                     @OA\Property(property="email", type="string"),
     *                     @OA\Property(property="birthday", type="string"),
     *                     @OA\Property(property="avatar", type="string"),
     *                     @OA\Property(property="phone", type="string"),
     *                     @OA\Property(property="address", type="string"),
     *                     @OA\Property(property="biography", type="string"),
     *                     @OA\Property(property="gender", type="string"),
     *                     @OA\Property(property="status", type="integer"),
     *                     @OA\Property(property="major_id", type="integer"),
     *                     @OA\Property(property="permissions", type="string"),
     *                     @OA\Property(property="verification_code", type="string"),
     *                     @OA\Property(property="created_at", type="string", format="date-time"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time")
     *                 )
     *             ),
     *             @OA\Property(property="emotion", type="object",
     *                 @OA\Property(property="like", type="integer"),
     *                 @OA\Property(property="dislike", type="integer")
     *             ),
     *             @OA\Property(property="comments", type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="user_id", type="integer"),
     *                     @OA\Property(property="content", type="string"),
     *                     @OA\Property(property="parent_id", type="integer"),
     *                     @OA\Property(property="post_id", type="integer"),
     *                     @OA\Property(property="blog_id", type="integer"),
     *                     @OA\Property(property="qa_id", type="integer"),
     *                     @OA\Property(property="created_at", type="string", format="date-time"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time"),
     *                     @OA\Property(property="user", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="username", type="string"),
     *                         @OA\Property(property="first_name", type="string"),
     *                         @OA\Property(property="last_name", type="string"),
     *                         @OA\Property(property="group_id", type="integer"),
     *                         @OA\Property(property="email", type="string"),
     *                         @OA\Property(property="birthday", type="string"),
     *                         @OA\Property(property="avatar", type="string"),
     *                         @OA\Property(property="phone", type="string"),
     *                         @OA\Property(property="address", type="string"),
     *                         @OA\Property(property="biography", type="string"),
     *                         @OA\Property(property="gender", type="string"),
     *                         @OA\Property(property="status", type="integer"),
     *                         @OA\Property(property="major_id", type="integer"),
     *                         @OA\Property(property="permissions", type="string"),
     *                         @OA\Property(property="verification_code", type="string"),
     *                         @OA\Property(property="created_at", type="string", format="date-time"),
     *                         @OA\Property(property="updated_at", type="string", format="date-time")
     *                     ),
     *                     @OA\Property(property="replies", type="array",
     *                         @OA\Items(
     *                             @OA\Property(property="id", type="integer"),
     *                             @OA\Property(property="user_id", type="integer"),
     *                             @OA\Property(property="content", type="string"),
     *                             @OA\Property(property="parent_id", type="integer"),
     *                             @OA\Property(property="post_id", type="integer"),
     *                             @OA\Property(property="blog_id", type="integer"),
     *                             @OA\Property(property="qa_id", type="integer"),
     *                             @OA\Property(property="created_at", type="string", format="date-time"),
     *                             @OA\Property(property="updated_at", type="string", format="date-time"),
     *                             @OA\Property(property="user", type="object",
     *                                 @OA\Property(property="id", type="integer"),
     *                                 @OA\Property(property="username", type="string"),
     *                                 @OA\Property(property="first_name", type="string"),
     *                                 @OA\Property(property="last_name", type="string"),
     *                                 @OA\Property(property="group_id", type="integer"),
     *                                 @OA\Property(property="email", type="string"),
     *                                 @OA\Property(property="birthday", type="string"),
     *                                 @OA\Property(property="avatar", type="string"),
     *                                 @OA\Property(property="phone", type="string"),
     *                                 @OA\Property(property="address", type="string"),
     *                                 @OA\Property(property="biography", type="string"),
     *                                 @OA\Property(property="gender", type="string"),
     *                                 @OA\Property(property="status", type="integer"),
     *                                 @OA\Property(property="major_id", type="integer"),
     *                                 @OA\Property(property="permissions", type="string"),
     *                                 @OA\Property(property="verification_code", type="string"),
     *                                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                                 @OA\Property(property="updated_at", type="string", format="date-time")
     *                             )
     *                         )
     *                     )
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response=404, description="Không tìm thấy blog."),
     *     security={
     *         {"passport": {}}
     *     }
     * )
     */
    public function detailBlog(Blog $blog)
    {
        $blog->major;
        $blogLikes = $blog->likes;
    
        $user = Auth::user(); // Lấy thông tin người dùng đăng nhập
    
        $userLike = $blogLikes->where('user_id', $user->id)->first(); // Tìm thông tin "like" của người dùng hiện tại
    
        if ($blogLikes->isEmpty()) {
            $emotions = [];
        } else {
            $emotions = $blogLikes->pluck('emotion')->unique()->toArray();
        }
    
        $countsByEmotion = [];
    
        foreach ($emotions as $emotion) {
            $countsByEmotion[$emotion] = $blogLikes->where('emotion', $emotion)->count();
        }
    
        $blog->user;
        $comments = Comment::where('blog_id', $blog->id)->where('parent_id', null)->get();
        $totalComments = 0;
    
        foreach ($comments as $comment) {
            $comment->user;
            $comment->replies;
    
            $totalComments++; // Tính bình luận gốc
            $totalComments += count($comment->replies); // Tính số lượng câu trả lời
    
            foreach ($comment->replies as $reply) {
                $reply->user;
            }
        }
    
        return response()->json([
            'blog' => $blog,
            'emotion' => $countsByEmotion,
            'comments' => $comments,
            'total_comments' => $totalComments,
            'user_like' => $userLike // Thêm thông tin về việc người dùng đã "like" hay "dislike" bài viết hay chưa
        ]);
    }
    

    
    
}