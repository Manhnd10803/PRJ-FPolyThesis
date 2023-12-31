<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
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
            //Nếu User_id = Auth::id() thì lấy tất cả bài viết của user đó ngược lại láy tất cả bài viết có trạng thái khác 2
            $posts = Post::where(function ($query) {
                $query->where('user_id', Auth::id())
                    ->orWhere(function ($subquery) {
                        $subquery->where('status', 0);
                    });
            })
                ->orderBy('created_at', 'DESC')
                ->get();


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
    public function DetailPost(Post $post)
    {
        $detailPost = Post::with(['user', 'likes'])->where('id', $post->id)->first();
        $likeCountsByEmotion = [];
        // Lấy danh sách người đã like bài viết và thông tin của họ
        $likers = $post->likes->map(function ($like) {
            return [
                'user_id' => $like->user->id,
                'user' => $like->user,
                'emotion' => $like->emotion,
            ];
        });
        foreach ($likers as $liker) {
            $emotion = $liker['emotion'];
            if (!isset($likeCountsByEmotion[$emotion])) {
                $likeCountsByEmotion[$emotion] = 1;
            } else {
                $likeCountsByEmotion[$emotion]++;
            }
        }
        $likeCountsByEmotions = $post->likes->count();
        // Sắp xếp mảng theo số lượng giảm dần
        arsort($likeCountsByEmotion);
        // Lấy top 3 emotion nhiều nhất
        $topEmotions = array_keys(array_slice($likeCountsByEmotion, 0, 3));
        //tính số comment và lấy 3 comment demo
        $totalComment = Comment::where('post_id', $post->id)->count();
        // $comment = Comment::where('post_id', $post->id)->get();
        $comment = Comment::with('user:id,username,first_name,last_name,avatar')->where('post_id', $post->id)->latest()->get();
        $postdata  = [
            'post' => $detailPost,
            'like_counts_by_emotion' => $likeCountsByEmotions,
            'likers' => $likers,
            'total_comments' => $totalComment,
            'comments' => $comment,
            'top_emotions' => $topEmotions,
        ];
        return response()->json($postdata, 200);
    }
    public function ShowAllPosts($quantity = null)
    {
        DB::beginTransaction();
        try {
            // Lấy thông tin người đăng bài và thông tin bài viết nếu là bạn bè thì lấy status là 0 và 1.nếu không phải bạn bè lấy bài viết status =0
            $user = Auth::user();
            $friendIds = $user->friends()
                ->where('friends.status', config('default.friend.status.accepted'))
                ->pluck('friends.id') // specify the table name here
                ->toArray();
            $friendIds[] = $user->id;

            $posts = Post::with(['user', 'likes.user', 'comments.user', 'comments.replies.user'])
                ->whereIn('user_id', $friendIds)
                ->whereIn('status', [0, 1, 2])
                ->orWhere(function ($query) use ($friendIds) {
                    $query->whereNotIn('user_id', $friendIds)
                        ->where('status', 0);
                });

            if ($quantity) {
                $posts = $posts->distinct()->latest()->paginate($quantity);
                $last_page = $posts->lastPage();
                $current_page = $posts->currentPage();
            } else {
                $posts = $posts->distinct()->latest()->get();
            }

            $result = [];
            foreach ($posts as $post) {
                $likeCountsByEmotion = [];
                $likers = $post->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'user_id' => $like->user->id,
                        'emotion' => $like->emotion,
                    ];
                });
                // Đếm số lượng emotion cho mỗi loại
                foreach ($likers as $liker) {
                    $emotion = $liker['emotion'];
                    if (!isset($likeCountsByEmotion[$emotion])) {
                        $likeCountsByEmotion[$emotion] = 1;
                    } else {
                        $likeCountsByEmotion[$emotion]++;
                    }
                }
                $likeCountsByEmotions = $post->likes->count();
                // Sắp xếp mảng theo số lượng giảm dần
                arsort($likeCountsByEmotion);
                // Lấy top 3 emotion nhiều nhất
                $topEmotions = array_keys(array_slice($likeCountsByEmotion, 0, 3));
                //tính số comment và lấy 3 comment demo
                $totalComment = $post->comments->count();
                $commentDemos = $post->comments->where('parent_id', 0)->take(3);
                foreach ($commentDemos as $commentDemo) {
                    $commentDemo->reply = $post->comments->where('parent_id', $commentDemo->id)->count();
                }
                // Thêm thông tin vào mảng kết quả
                $postData = [
                    'post' => $post,
                    'like_counts_by_emotion' => $likeCountsByEmotions,
                    'likers' => $likers,
                    'total_comments' => $totalComment,
                    'comments' => $commentDemos,
                    'top_emotions' => $topEmotions,
                ];
                array_push($result, $postData);
            }
            DB::commit();
            if ($quantity) {
                return response()->json(['data' => $result, 'last_page' => $last_page, 'current_page' => $current_page], 200);
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
            $status = $request->input('status') ?? 0;
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
                'status' => $status,
            ]);
            $post->save();
            $newPost = Post::with(['user', 'likes'])->where('id', $post->id)->first();
            $likeCountsByEmotions = 0;
            //fake data
            $postdata  = [
                'post' => $newPost,
                'like_counts_by_emotion' => $likeCountsByEmotions,
                'likers' => [],
                'total_comments' => 0,
                'comments' => [],
                'top_emotions' => [],
            ];
            DB::commit();
            return response()->json($postdata, 200);
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
     *     description="Cập nhật trạng thái một bài viết ",
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
     *             @OA\Property(property="status", type="integer", description="Trạng thái của bài viết"),
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
            $status = $request->input('status');

            // Update the post
            $post->update([
                'status' => $status,
            ]);
            $post->save();

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
}
