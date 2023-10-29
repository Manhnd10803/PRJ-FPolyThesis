<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Qa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
 * @OA\Post(
 *     path="/api/comments/{type}/{id}",
 *     summary="Thêm bình luận",
 *     description="Thêm một bình luận cho một mục loại 'post', 'blog', hoặc 'qa' có ID tương ứng.",
 *     operationId="addComment",
 *     tags={"Comments"},
 *     @OA\Parameter(
 *         name="type",
 *         in="path",
 *         description="Loại mục (post, blog, qa)",
 *         required=true,
 *         @OA\Schema(type="string", enum={"post", "blog", "qa"})
 *     ),
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID của mục",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="content", type="string", description="Nội dung bình luận", example="This is a comment."),
 *             @OA\Property(property="parent_id", type="integer", description="ID của bình luận cha (nếu có)")
 *         )
 *     ),
 *     @OA\Response(
 *         response="200",
 *         description="Bình luận được thêm thành công",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Comment added successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response="401",
 *         description="Không được phép",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     ),
 * )
 */

    public function AddComment(Request $request, $type, $id)
    {
        DB::beginTransaction();
        if (Auth::check()) {
            $user = Auth::user();
            $content = $request->input('content');
            $parent_id = $request->input('parent_id');
            // Xác định model tương ứng với loại mục
            $model = null;
            switch ($type) {
                case 'post':
                    $model = Post::find($id);
                    break;
                case 'blog':
                    $model = Blog::find($id);
                    break;
                case 'qa':
                    $model = Qa::find($id);
                    break;
                default:
                    DB::rollBack();
                    return response()->json(['error' => 'Invalid type'], 400);
            }
            if (!$model) {
                DB::rollBack();
                return response()->json(['error' => 'Item not found'], 404);
            }
            $comment = new Comment([
                'user_id' => $user->id,
                "{$type}_id" => $id,
                'content' => $content,
                'parent_id' => $parent_id,
            ]);
            $comment->save();
            DB::commit();
            return response()->json(['message' => 'Comment added successfully'], 200);
        } else {
            DB::rollBack();
            return response()->json(['error' => 'You must be logged in to comment'], 401);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/comments/{type}/{id}",
     *     tags={"Comments"},
     *     summary="Danh sách tất cả bình luận cấp 1 theo loại (post, blog, qa)",
     *     description="Lấy danh sách tất cả bình luận cấp 1 cho một loại cụ thể (post, blog, qa).",
     *     @OA\Parameter(
     *         name="type",
     *         in="path",
     *         required=true,
     *         description="Loại (post, blog, qa)",
     *         @OA\Schema(
     *             type="string",
     *             enum={"post", "blog", "qa"}
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết hoặc blog hoặc câu hỏi",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(response=200, description="Thành công. Trả về danh sách bình luận cấp 1 của loại cụ thể.",
     *         @OA\JsonContent(
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
     *                     @OA\Property(property="reply", type="integer")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response=400, description="Loại không hợp lệ."),
     *     security={
     *         {"passport": {}}
     *     }
     * )
     */
    public function allCommentsLevel1($type, $id)
    {
        if ($type == 'post' || $type == 'blog' || $type == 'qa') {
            $comments = Comment::where($type . '_id', $id)->where('parent_id', 0)->get();
            foreach ($comments as $comment) {
                $comment->user;
                $comment->reply = Comment::where($type . '_id', $id)->where('parent_id', $comment->id)->count();
            };
            return response()->json(['comments' => $comments]);
        } else {
            return response()->json(['error' => 'Invalid type'], 400);
        }
    }
    /**
     * @OA\Get(
     *     path="/api/comments/{type}/{id}/{comment_id}",
     *     tags={"Comments"},
     *     summary="Danh sách tất cả bình luận cấp dưới theo loại (post, blog, qa)",
     *     description="Lấy danh sách tất cả bình luận cấp dưới cho một bình luận cụ thể của loại cụ thể (post, blog, qa).",
     *     @OA\Parameter(
     *         name="type",
     *         in="path",
     *         required=true,
     *         description="Loại (post, blog, qa)",
     *         @OA\Schema(
     *             type="string",
     *             enum={"post", "blog", "qa"}
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết hoặc blog hoặc câu hỏi",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="comment_id",
     *         in="path",
     *         required=true,
     *         description="ID của bình luận cấp 1",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(response=200, description="Thành công. Trả về danh sách bình luận cấp dưới của bình luận cấp 1 cụ thể.",
     *         @OA\JsonContent(
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
     *                     @OA\Property(property="reply", type="integer")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response=400, description="Loại không hợp lệ."),
     *     security={
     *         {"passport": {}}
     *     }
     * )
     */
    public function allSubordinateComments($type, $id, $comment_id)
    {
        if ($type == 'post' || $type == 'blog' || $type == 'qa') {
            $comments = Comment::where($type . '_id', $id)->where('parent_id', $comment_id)->get();
            foreach ($comments as $comment) {
                $comment->user;
                $comment->reply = Comment::where($type . '_id', $id)->where('parent_id', $comment->id)->count();
            };
            return response()->json(['comments' => $comments]);
        } else {
            return response()->json(['error' => 'Invalid type'], 400);
        }
    }
    /**
     * @OA\Put(
     *     path="/api/comments/{comment}",
     *     tags={"Comments"},
     *     summary="Chỉnh sửa bình luận",
     *     description="Chỉnh sửa nội dung của bình luận.",
     *     @OA\Parameter(
     *         name="comment",
     *         in="path",
     *         required=true,
     *         description="ID của bình luận",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"content"},
     *             @OA\Property(property="content", type="string", description="Nội dung mới của bình luận")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Bình luận đã được chỉnh sửa thành công"),
     *     @OA\Response(response=400, description="Lỗi xảy ra hoặc lỗi xác thực"),
     *     @OA\Response(response=401, description="Không có quyền chỉnh sửa bình luận khác")
     * )
     */
    public function editComment(Request $request, Comment $comment)
    {
        try {
            DB::beginTransaction();
            if (Auth::user()->id == $comment->user_id) {
                $comment->update([
                    'content' => $request->content,
                ]);
                DB::commit();
                return response()->json(['message' => 'Updated'], 200);
            } else {
                return response()->json(['error' => 'Authorization Error'], 400);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    /**
     * @OA\Delete(
     *     path="/api/comments/{comment}",
     *     tags={"Comments"},
     *     summary="Xóa bình luận",
     *     description="Xóa một bình luận.",
     *     @OA\Parameter(
     *         name="comment",
     *         in="path",
     *         required=true,
     *         description="ID của bình luận",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(response=200, description="Bình luận đã được xóa thành công"),
     *     @OA\Response(response=400, description="Lỗi xảy ra hoặc lỗi xác thực"),
     *     @OA\Response(response=401, description="Không có quyền xóa bình luận khác")
     * )
     */
    public function deleteComment(Comment $comment)
    {
        try {
            DB::beginTransaction();
            if (Auth::user()->id == $comment->user_id) {
                $comment->delete();
                DB::commit();
                return response()->json(['message' => 'Deleted'], 200);
            } else {
                return response()->json(['error' => 'Authorization Error'], 400);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}