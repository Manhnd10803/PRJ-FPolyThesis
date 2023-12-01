<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/posts/profile",
     *     tags={"Posts"},
     *     summary="Lấy danh sách bài viết của người dùng hoặc các bài viết không được công bố",
     *     description="Lấy danh sách bài viết của người dùng hiện tại hoặc các bài viết không được công bố (trạng thái khác 1)",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách bài viết đã được lấy thành công",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="user_id", type="integer"),
     *                 @OA\Property(property="content", type="string"),
     *                 @OA\Property(property="feeling", type="string", nullable=true),
     *                 @OA\Property(property="image", type="object", nullable=true),
     *                 @OA\Property(property="hashtag", type="string", nullable=true),
     *                 @OA\Property(property="status", type="integer"),
     *                 @OA\Property(property="views", type="integer"),
     *                 @OA\Property(property="created_at", type="string"),
     *                 @OA\Property(property="updated_at", type="string")
     *             )
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function ShowPostProfile()
    {
        DB::beginTransaction();
        try {
            $posts = Post::where('user_id', Auth::id())
                ->orWhere(function ($query) {
                    $query->where('status', '<>', 1);
                })->orderBy('created_at', 'DESC')->get();
            $result = [];
            foreach ($posts as $post) {
                // Tính toán số lượt like cho bài viết
                $likeCount = $post->likes->count();
                // Tính toán số lượng comment cho bài viết
                $commentCount = Comment::where('post_id', $post->id)->count();
                // Tính toán số lượng reply cho mỗi bình luận
                $comments = Comment::where('post_id', $post->id)->get();
                $replyCount = 0;
                foreach ($comments as $comment) {
                    $replyCount += Comment::where('post_id', $post->id)->where('parent_id', $comment->id)->count();
                }
                // Lấy thông tin về người like
                $likers = $post->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });
                // Lấy thông tin về người comment và reply
                $commentData = [];
                foreach ($comments as $comment) {
                    $commentUser = $comment->user;
                    $replies = Comment::where('post_id', $post->id)->where('parent_id', $comment->id)->get();
                    $replyData = [];
                    foreach ($replies as $reply) {
                        $replyUser = $reply->user;
                        $replyData[] = [
                            'reply' => $reply,
                            'user' => $replyUser,
                        ];
                    }
                    $commentData[] = [
                        'comment' => $comment,
                        'user' => $commentUser,
                        'replies' => $replyData,
                    ];
                }
                // Tạo một mảng chứa thông tin về bài viết và tất cả thông tin liên quan
                $postData = [
                    'post' => $post,
                    'like_count' => $likeCount,
                    'comment_count' => $commentCount,
                    'reply_count' => $replyCount,
                    'likers' => $likers,
                    'comments' => $commentData,
                ];
                array_push($result, $postData);
            }
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/posts/newfeed",
     *     summary="Get user's newfeed posts",
     *     description="Get user's newfeed posts including posts from friends, likes, comments, etc.",
     *     operationId="getNewfeedPosts",
     *     tags={"Posts"},
     *     security={{ "passport": {} }},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="string")
     *         )
     *     )
     * )
     */

    public function ShowAllPosts($quantity = null)
    {
        DB::beginTransaction();
        try {
            // Lấy thông tin người đăng bài và thông tin bài viết (lọc theo bạn bè)
            $user = Auth::user();
            $friends = $user->friends()->where('friends.status', config('default.friend.status.accepted'))->get();
            $friendIds = $friends->pluck('id')->toArray();
            $friendIds[] = $user->id;
            if ($quantity) {
                $posts = Post::whereIn('user_id', $friendIds)->latest()->paginate($quantity);
                $pagination = [
                    'first_page_url' => $posts->url(1),
                    'from' => $posts->firstItem(),
                    'last_page' => $posts->lastPage(),
                    'last_page_url' => $posts->url($posts->lastPage()),
                    'links' =>  $posts->toArray()['links'],
                    'next_page_url' => $posts->nextPageUrl(),
                    'path' => $posts->path(),
                    'per_page' => $posts->perPage(),
                    'prev_page_url' => $posts->previousPageUrl(),
                    'to' => $posts->lastItem(),
                    'total' => $posts->total(),
                ];
            } else {
                $posts = Post::whereIn('user_id', $friendIds)->latest()->get();
            }
            $result = [];
            foreach ($posts as $post) {
                $user = $post->user;
                $likeCountsByEmotion = [];
                $likeCountsByEmotion['total_likes'] = $post->likes->count();
                // Lấy danh sách người đã like bài viết và thông tin của họ
                $likers = $post->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });
                // Tính số lượt thích cho mỗi giá trị biểu cảm (emotion)
                $emotions = $likers->pluck('emotion')->unique();
                foreach ($emotions as $emotion) {
                    $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                }
                // Tổng số bình luận + 3 bình luận demo
                $totalComment = Comment::where('post_id', $post->id)->count();
                $commentDemos = Comment::where('post_id', $post->id)->where('parent_id', null)->limit(3)->get();
                foreach ($commentDemos as $commentDemo) {
                    $commentDemo->user;
                    //số lượng reply
                    $commentDemo->reply = Comment::where('post_id', $post->id)->where('parent_id', $commentDemo->id)->count();
                }
                // Tạo một mảng chứa thông tin về bài viết và các lượt thích, bình luận của nó
                $postData = [
                    'post' => $post,
                    'like_counts_by_emotion' => $likeCountsByEmotion,
                    'likers' => $likers,
                    'total_comments' => $totalComment,
                    'comments' => $commentDemos,
                ];
                array_push($result, $postData);
            }
            DB::commit();
            if ($quantity) {
                return response()->json(['data' => $result, 'pagination' => $pagination], 200);
            } else {
                return response()->json($result, 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }


    /**
     * @OA\Post(
     *     path="/api/posts",
     *     tags={"Posts"},
     *     summary="Tạo bài viết mới",
     *     description="Tạo một bài viết mới với nội dung, cảm xúc, hashtag và hình ảnh tải lên (tối đa 5 hình ảnh).",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"content"},
     *             @OA\Property(property="content", type="string", description="Nội dung của bài viết", maxLength=255),
     *             @OA\Property(property="feeling", type="string", description="Cảm xúc của bài viết", nullable=true),
     *             @OA\Property(property="hashtag", type="string", description="Hashtag của bài viết", maxLength=255, nullable=true),
     *             @OA\Property(property="images", type="array", @OA\Items(type="string", format="binary", description="Hình ảnh đính kèm (JPEG, JPG hoặc PNG)"), maxItems=5, nullable=true)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Bài viết đã được tạo thành công"),
     *     @OA\Response(response=400, description="Lỗi khi tạo bài viết")
     * )
     */

    public function CreatePost(Request $request)
    {
        DB::beginTransaction();
        try {
            $content = $request->input('content');
            $feeling = $request->input('feeling');
            $hashtagString = ''; // Mặc định hashtag là chuỗi trống
            $imagePaths = $request->input('image', []);
            if (isset($content) && !empty($content)) {
                // Tách chuỗi thành mảng các từ (dùng khoảng trắng để tách)
                $hashtags = [];
                preg_match_all("/(?<!\w)(#\w+)/", $content, $matches);
                $hashtags = $matches[1];
                $hashtagString = implode(' ', $hashtags);
            }
            $post = new Post([
                'user_id' => Auth::id(),
                'content' => $content,
                'feeling' => $feeling,
                'image' => json_encode($imagePaths),
                'hashtag' => $hashtagString,
            ]);
            // dd($post);
            $post->save();
            DB::commit();
            return response()->json($post, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }


    /**
     * @OA\Put(
     *     path="/api/posts/{post}",
     *     tags={"Posts"},
     *     summary="Cập nhật bài viết",
     *     description="Cập nhật một bài viết với nội dung, cảm xúc, hashtag và hình ảnh tải lên (tối đa 5 hình ảnh).",
     *     @OA\Parameter(
     *         name="post",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết cần cập nhật",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"content"},
     *             @OA\Property(property="content", type="string", description="Nội dung của bài viết", maxLength=255),
     *             @OA\Property(property="feeling", type="string", description="Cảm xúc của bài viết", nullable=true),
     *             @OA\Property(property="hashtag", type="string", description="Hashtag của bài viết", maxLength=255, nullable=true),
     *             @OA\Property(property="images", type="array", @OA\Items(type="string", format="binary", description="Hình ảnh đính kèm (JPEG, JPG hoặc PNG)"), maxItems=5, nullable=true),
     *             @OA\Property(property="status", type="integer", description="Trạng thái của bài viết", enum={0, 1}),
     *         )
     *     ),
     *     @OA\Response(response=200, description="Bài viết đã được cập nhật thành công"),
     *     @OA\Response(response=400, description="Lỗi khi cập nhật bài viết")
     * )
     */

    public function UpdatePost(Request $request, Post $post)
    {
        DB::beginTransaction();
        try {
            $content = $request->input('content', $post->content);
            $feeling = $request->input('feeling', $post->feeling);
            $hashtagString = '';
            $imagePaths = $request->input('image', $post->image);
            if (isset($content) && !empty($content)) {
                // Tách chuỗi thành mảng các từ (dùng khoảng trắng để tách)
                $hashtags = [];
                preg_match_all("/(?<!\w)(#\w+)/", $content, $matches);
                $hashtags = $matches[1];
                $hashtagString = implode(' ', $hashtags);
            }
            // Cập nhật thông tin bài đăng
            $post->update([
                'content' => $content,
                'feeling' => $feeling,
                'image' => json_encode($imagePaths),
                'hashtag' => $hashtagString,
            ]);
            DB::commit();
            return response()->json($post, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/posts/{post}",
     *     tags={"Posts"},
     *     summary="Xóa bài viết",
     *     description="Xóa một bài viết cùng với các comments và likes liên quan.",
     *     @OA\Parameter(
     *         name="post",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết cần xóa",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Bài viết đã bị xóa thành công"),
     *     @OA\Response(response=400, description="Lỗi khi xóa bài viết"),
     *     @OA\Response(response=401, description="Bạn không có quyền xóa bài viết"),
     *     @OA\Response(response=404, description="Bài viết không được tìm thấy")
     * )
     */

    public function DeletePost(Post $post)
    {
        DB::beginTransaction();
        try {
            if (Auth::check() && Auth::user()->id === $post->user_id) {
                Comment::where('post_id', $post->id)->delete();
                Like::where('post_id', $post->id)->delete();
                $post->likes()->delete();
                $post->comments()->delete();
                $post->delete();
                DB::commit();
                return response()->json(['message' => 'Bài viết đã bị xóa thành công.'], 200);
            } else {
                DB::rollBack();
                return response()->json(['message' => 'Bạn không có quyền này']);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    //Admin Posts

    /**
     * @OA\Get(
     *     path="/api/list-posts",
     *     tags={"Admin Posts"},
     *     summary="Lấy danh sách bài viết",
     *     description="Trả về danh sách các bài viết.",
     *     @OA\Response(response=200, description="Danh sách các bài viết")
     * )
     */
    public function index()
    {
        $posts = Post::all();
        return response()->json(['posts' => $posts], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/posts/{post}",
     *     tags={"Admin Posts"},
     *     summary="Lấy thông tin của một bài viết",
     *     description="Trả về thông tin của một bài viết dựa trên đối tượng Post.",
     *     @OA\Parameter(
     *         name="post",
     *         in="path",
     *         required=true,
     *         description="Đối tượng Post",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Thông tin của bài viết"),
     *     @OA\Response(response=404, description="Bài viết không tồn tại"),
     * )
     */
    public function show(Post $post)
    {
        if (!$post) {
            return response()->json(['error' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json(['post' => $post], 200);
    }
}
