<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Qa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QaController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/quests",
     *     tags={"Q&A"},
     *     summary="Danh sách tất cả câu hỏi",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách câu hỏi",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="qa", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="title", type="string", description="Tiêu đề câu hỏi"),
     *                     @OA\Property(property="content", type="string", description="Nội dung câu hỏi"),
     *                     @OA\Property(property="majors_id", type="integer", description="ID của chuyên ngành liên quan đến câu hỏi"),
     *                     @OA\Property(property="user_id", type="integer", description="ID của người đặt câu hỏi"),
     *                     @OA\Property(property="hashtag", type="string", description="HashTag liên quan đến câu hỏi"),
     *                     @OA\Property(property="views", type="integer", description="Số lượt xem câu hỏi"),
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
     *                         @OA\Property(property="major", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="majors_name", type="string"),
     *                         @OA\Property(property="majors_code", type="string"),
     *                         @OA\Property(property="description", type="string"),
     *                         @OA\Property(property="created_at", type="string", format="date-time"),
     *                         @OA\Property(property="updated_at", type="string", format="date-time")
     *                     ),
     *                     @OA\Property(property="user", type="object",
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
     *                 ),
     *                 @OA\Property(property="like_counts_by_emotion", type="object",
     *                     @OA\Property(property="total_likes", type="integer", description="Tổng số lượt thích"),
     *                     @OA\Property(property="emotion1", type="integer", description="Số lượt thích với emotion1"),
     *                     @OA\Property(property="emotion2", type="integer", description="Số lượt thích với emotion2"),
     *                 ),
     *                 @OA\Property(property="total_comments", type="integer", description="Tổng số bình luận"),
     *                 @OA\Property(property="comments", type="array",
     *                     @OA\Items(
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="user_id", type="integer"),
     *                         @OA\Property(property="content", type="string", description="Nội dung bình luận"),
     *                         @OA\Property(property="parent_id", type="integer"),
     *                         @OA\Property(property="post_id", type="integer"),
     *                         @OA\Property(property="blog_id", type="integer"),
     *                         @OA\Property(property="qa_id", type="integer"),
     *                         @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="reply", type="integer", description="Số lượng reply"),
     *                         @OA\Property(property="user", type="object",
     *                             @OA\Property(property="id", type="integer"),
     *                             @OA\Property(property="username", type="string"),
     *                             @OA\Property(property="first_name", type="string", nullable=true),
     *                             @OA\Property(property="last_name", type="string", nullable=true),
     *                         ),
     *                     ),
     *                 ),
     *             ),
     *         ),
     *     ),
     * )
     */
    public function ShowAllQa(Request $request, $quantity = null)
    {

        DB::beginTransaction();
        try {
            $majorsId = $request->input('majors_id');
            $hashtag = $request->input('hashtag');
            $query = Qa::query();

            if ($majorsId) {
                $query->where('majors_id', $majorsId);
            }

            if ($hashtag) {
                $query->where('content', 'LIKE', '%' . $hashtag . '%');
            }

            if ($quantity) {
                $qas = $query->latest()->paginate($quantity);
            } else {
                $qas = $query->latest()->get();
            }

            $result = [];

            foreach ($qas as $qa) {
                $likeCountsByEmotion = [];
                $likeCountsByEmotion['total_likes'] = $qa->likes->count();

                $likers = $qa->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });

                $qa->user;
                $qa->major;
                $emotions = $likers->pluck('emotion')->unique();

                foreach ($emotions as $emotion) {
                    $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                }
                // Tổng số bình luận + 3 bình luận demo
                $totalComment = Comment::where('qa_id', $qa->id)->count();
                $commentDemos = Comment::where('qa_id', $qa->id)->where('parent_id', null)->limit(3)->get();
                foreach ($commentDemos as $commentDemo) {
                    $commentDemo->user;
                    //số lượng reply
                    $commentDemo->reply = Comment::where('qa_id', $qa->id)->where('parent_id', $commentDemo->id)->count();
                }
                $qaData = [
                    'qa' => $qa,
                    'like_counts_by_emotion' => $likeCountsByEmotion,
                    'total_comments' => $totalComment,
                    'comments' => $commentDemos,
                ];
                array_push($result, $qaData);
            }

            DB::commit();
            return response()->json($result, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/quests/most-commented",
     *     tags={"Q&A"},
     *     summary="Danh sách các câu hỏi Hay nhất (nhiều bình luận nhất)",
     *     @OA\Parameter(
     *         name="majors_id",
     *         in="query",
     *         description="ID của Major",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="hashtag",
     *         in="query",
     *         description="Từ khóa để tìm kiếm câu hỏi",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách câu hỏi có nhiều bình luận nhất",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="qa", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="title", type="string"),
     *                     @OA\Property(property="content", type="string"),
     *                     @OA\Property(property="majors_id", type="integer"),
     *                     @OA\Property(property="user_id", type="integer"),
     *                     @OA\Property(property="hashtag", type="string"),
     *                     @OA\Property(property="views", type="integer"),
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
     *                     @OA\Property(property="major", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="majors_name", type="string"),
     *                         @OA\Property(property="majors_code", type="string"),
     *                         @OA\Property(property="description", type="string"),
     *                         @OA\Property(property="created_at", type="string", format="date-time"),
     *                         @OA\Property(property="updated_at", type="string", format="date-time")
     *                     ),
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
     *                     )
     *                 ),
     *                 @OA\Property(property="like_counts_by_emotion", type="object",
     *                     @OA\Property(property="total_likes", type="integer", description="Tổng số lượt thích"),
     *                     @OA\Property(property="emotion1", type="integer", description="Số lượt thích với emotion1"),
     *                     @OA\Property(property="emotion2", type="integer", description="Số lượt thích với emotion2"),
     *                 ),
     *                 @OA\Property(property="total_comments", type="integer", description="Tổng số bình luận"),
     *                 @OA\Property(property="comments", type="array",
     *                     @OA\Items(
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="user_id", type="integer"),
     *                         @OA\Property(property="content", type="string"),
     *                         @OA\Property(property="parent_id", type="integer"),
     *                         @OA\Property(property="post_id", type="integer"),
     *                         @OA\Property(property="blog_id", type="integer"),
     *                         @OA\Property(property="qa_id", type="integer"),
     *                         @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="reply", type="integer", description="Số lượng reply"),
     *                         @OA\Property(property="user", type="object",
     *                             @OA\Property(property="id", type="integer"),
     *                             @OA\Property(property="username", type="string"),
     *                             @OA\Property(property="first_name", type="string", nullable=true),
     *                             @OA\Property(property="last_name", type="string", nullable=true),
     *                         ),
     *                     ),
     *                 ),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Lỗi",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="string", description="Thông báo lỗi")
     *         )
     *     )
     * )
     */


    public function showMostCommentedQa(Request $request, $quantity = null)
    {
        DB::beginTransaction();

        try {

            $majorsId = $request->input('majors_id');
            $hashtag = $request->input('hashtag');

            $query = Qa::query();

            if ($majorsId) {
                $query->where('majors_id', $majorsId);
            }

            if ($hashtag) {
                $query->where('content', 'LIKE', '%' . $hashtag . '%');
            }

            // Sắp xếp theo số lượng bình luận giảm dần
            // $query->withCount('comments')->orderBy('comments_count', 'desc');
            $query->withCount('comments')->having('comments_count', '>', 0)->orderBy('comments_count', 'desc');

            if ($quantity) {
                $qas = $query->latest()->paginate($quantity);
            } else {
                $qas = $query->latest()->get();
            }

            $result = [];

            foreach ($qas as $qa) {
                $likeCountsByEmotion = [];
                $likeCountsByEmotion['total_likes'] = $qa->likes->count();

                $likers = $qa->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });

                $qa->user;
                $qa->major;
                $emotions = $likers->pluck('emotion')->unique();

                foreach ($emotions as $emotion) {
                    $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                }

                $totalComment = Comment::where('qa_id', $qa->id)->count();
                $commentDemos = Comment::where('qa_id', $qa->id)->where('parent_id', null)->limit(3)->get();

                foreach ($commentDemos as $commentDemo) {
                    $commentDemo->user;
                    $commentDemo->reply = Comment::where('qa_id', $qa->id)->where('parent_id', $commentDemo->id)->count();
                }

                $qaData = [
                    'qa' => $qa,
                    'like_counts_by_emotion' => $likeCountsByEmotion,
                    'total_comments' => $totalComment,
                    'comments' => $commentDemos,
                ];

                array_push($result, $qaData);
            }

            DB::commit();

            return response()->json($result, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/quests/un-answer",
     *     tags={"Q&A"},
     *     summary="Danh sách các câu hỏi chưa được trả lời",
     *     @OA\Parameter(
     *         name="majors_id",
     *         in="query",
     *         description="ID của Major",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="hashtag",
     *         in="query",
     *         description="Từ khóa để tìm kiếm câu hỏi",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách câu hỏi chưa được trả lời",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="qa", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="title", type="string"),
     *                     @OA\Property(property="content", type="string"),
     *                     @OA\Property(property="majors_id", type="integer"),
     *                     @OA\Property(property="user_id", type="integer"),
     *                     @OA\Property(property="hashtag", type="string"),
     *                     @OA\Property(property="views", type="integer"),
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
     *                     @OA\Property(property="major", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="majors_name", type="string"),
     *                         @OA\Property(property="majors_code", type="string"),
     *                         @OA\Property(property="description", type="string"),
     *                         @OA\Property(property="created_at", type="string", format="date-time"),
     *                         @OA\Property(property="updated_at", type="string", format="date-time")
     *                     ),
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
     *                     )
     *                 ),
     *                 @OA\Property(property="like_counts_by_emotion", type="object",
     *                     @OA\Property(property="total_likes", type="integer", description="Tổng số lượt thích"),
     *                     @OA\Property(property="emotion1", type="integer", description="Số lượt thích với emotion1"),
     *                     @OA\Property(property="emotion2", type="integer", description="Số lượt thích với emotion2"),
     *                 ),
     *                 @OA\Property(property="total_comments", type="integer", description="Tổng số bình luận"),
     *                 @OA\Property(property="comments", type="array",
     *                     @OA\Items(
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="user_id", type="integer"),
     *                         @OA\Property(property="content", type="string"),
     *                         @OA\Property(property="parent_id", type="integer"),
     *                         @OA\Property(property="post_id", type="integer"),
     *                         @OA\Property(property="blog_id", type="integer"),
     *                         @OA\Property(property="qa_id", type="integer"),
     *                         @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="reply", type="integer", description="Số lượng reply"),
     *                         @OA\Property(property="user", type="object",
     *                             @OA\Property(property="id", type="integer"),
     *                             @OA\Property(property="username", type="string"),
     *                             @OA\Property(property="first_name", type="string", nullable=true),
     *                             @OA\Property(property="last_name", type="string", nullable=true),
     *                         ),
     *                     ),
     *                 ),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Lỗi",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="string", description="Thông báo lỗi")
     *         )
     *     )
     * )
     */

    public function showUnAnswerdQa(Request $request, $quantity = null)
    {
        DB::beginTransaction();

        try {

            $majorsId = $request->input('majors_id');
            $hashtag = $request->input('hashtag');

            $query = Qa::query();

            if ($majorsId) {
                $query->where('majors_id', $majorsId);
            }

            if ($hashtag) {
                $query->where('content', 'LIKE', '%' . $hashtag . '%');
            }

            // Sắp xếp theo số lượng bình luận giảm dần
            // $query->withCount('comments')->orderBy('comments_count', 'desc');
            $query->withCount('comments')->having('comments_count', '=', 0)->orderBy('comments_count', 'desc');

            if ($quantity) {
                $qas = $query->latest()->paginate($quantity);
            } else {
                $qas = $query->latest()->get();
            }

            $result = [];

            foreach ($qas as $qa) {
                $likeCountsByEmotion = [];
                $likeCountsByEmotion['total_likes'] = $qa->likes->count();

                $likers = $qa->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });

                $qa->user;
                $qa->major;
                $emotions = $likers->pluck('emotion')->unique();

                foreach ($emotions as $emotion) {
                    $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                }

                $totalComment = Comment::where('qa_id', $qa->id)->count();
                $commentDemos = Comment::where('qa_id', $qa->id)->where('parent_id', null)->limit(3)->get();

                foreach ($commentDemos as $commentDemo) {
                    $commentDemo->user;
                    $commentDemo->reply = Comment::where('qa_id', $qa->id)->where('parent_id', $commentDemo->id)->count();
                }

                $qaData = [
                    'qa' => $qa,
                    'like_counts_by_emotion' => $likeCountsByEmotion,
                    'total_comments' => $totalComment,
                    'comments' => $commentDemos,
                ];

                array_push($result, $qaData);
            }

            DB::commit();

            return response()->json($result, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/quests/my-quests",
     *     tags={"Q&A"},
     *     summary="Danh sách tất cả câu hỏi của người dùng hiện tại",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách câu hỏi của người dùng",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="qa", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="title", type="string", description="Tiêu đề câu hỏi"),
     *                     @OA\Property(property="content", type="string", description="Nội dung câu hỏi"),
     *                     @OA\Property(property="majors_id", type="integer", description="ID của chuyên ngành liên quan đến câu hỏi"),
     *                     @OA\Property(property="user_id", type="integer", description="ID của người đặt câu hỏi"),
     *                     @OA\Property(property="hashtag", type="string", description="HashTag liên quan đến câu hỏi"),
     *                     @OA\Property(property="views", type="integer", description="Số lượt xem câu hỏi"),
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
     *                     @OA\Property(property="major", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="majors_name", type="string"),
     *                         @OA\Property(property="majors_code", type="string"),
     *                         @OA\Property(property="description", type="string"),
     *                         @OA\Property(property="created_at", type="string", format="date-time"),
     *                         @OA\Property(property="updated_at", type="string", format="date-time")
     *                     ),
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
     *                     )
     *                 ),
     *                 @OA\Property(property="like_counts_by_emotion", type="object",
     *                     @OA\Property(property="total_likes", type="integer", description="Tổng số lượt thích"),
     *                     @OA\Property(property="emotion1", type="integer", description="Số lượt thích với emotion1"),
     *                     @OA\Property(property="emotion2", type="integer", description="Số lượt thích với emotion2"),
     *                 ),
     *                 @OA\Property(property="total_comments", type="integer", description="Tổng số bình luận"),
     *                 @OA\Property(property="comments", type="array",
     *                     @OA\Items(
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="user_id", type="integer"),
     *                         @OA\Property(property="content", type="string", description="Nội dung bình luận"),
     *                         @OA\Property(property="parent_id", type="integer"),
     *                         @OA\Property(property="post_id", type="integer"),
     *                         @OA\Property(property="blog_id", type="integer"),
     *                         @OA\Property(property="qa_id", type="integer"),
     *                         @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="reply", type="integer", description="Số lượng reply"),
     *                         @OA\Property(property="user", type="object",
     *                             @OA\Property(property="id", type="integer"),
     *                             @OA\Property(property="username", type="string"),
     *                             @OA\Property(property="first_name", type="string", nullable=true),
     *                             @OA\Property(property="last_name", type="string", nullable=true),
     *                         ),
     *                     ),
     *                 ),
     *             ),
     *         ),
     *     ),
     * )
     */


    public function showMyQa(Request $request, $quantity = null)
    {
        // Lấy thông tin người dùng đang đăng nhập
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Bạn chưa đăng nhập.'], 401);
        }

        DB::beginTransaction();

        try {
            // Lấy tất cả các câu hỏi của người dùng hiện tại
            if ($quantity) {
                $qas = Qa::where('user_id', $user->id)->latest()->paginate($quantity);
            } else {
                $qas = Qa::where('user_id', $user->id)->latest()->get();
            }

            $result = [];

            foreach ($qas as $qa) {
                $likeCountsByEmotion = [];
                $likeCountsByEmotion['total_likes'] = $qa->likes->count();

                $likers = $qa->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });

                $qa->user;
                $qa->major;
                $emotions = $likers->pluck('emotion')->unique();

                foreach ($emotions as $emotion) {
                    $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                }

                $totalComment = Comment::where('qa_id', $qa->id)->count();
                $commentDemos = Comment::where('qa_id', $qa->id)->where('parent_id', null)->limit(3)->get();

                foreach ($commentDemos as $commentDemo) {
                    $commentDemo->user;
                    $commentDemo->reply = Comment::where('qa_id', $qa->id)->where('parent_id', $commentDemo->id)->count();
                }

                $qaData = [
                    'qa' => $qa,
                    'like_counts_by_emotion' => $likeCountsByEmotion,
                    'total_comments' => $totalComment,
                    'comments' => $commentDemos,
                ];

                array_push($result, $qaData);
            }

            DB::commit();

            return response()->json($result, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }


    /**
     * @OA\Get(
     *     path="/api/quests/major/{major_id}",
     *     tags={"Q&A"},
     *     summary="Danh sách câu hỏi theo Major ID",
     *     @OA\Parameter(
     *         name="major_id",
     *         in="path",
     *         description="ID của Major",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="hashtag",
     *         in="query",
     *         description="Từ khóa để tìm kiếm câu hỏi",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách câu hỏi",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="qa", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="title", type="string"),
     *                     @OA\Property(property="content", type="string"),
     *                     @OA\Property(property="majors_id", type="integer"),
     *                     @OA\Property(property="user_id", type="integer"),
     *                     @OA\Property(property="hashtag", type="string"),
     *                     @OA\Property(property="views", type="integer"),
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
     *                     @OA\Property(property="major", type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="majors_name", type="string"),
     *                         @OA\Property(property="majors_code", type="string"),
     *                         @OA\Property(property="description", type="string"),
     *                         @OA\Property(property="created_at", type="string", format="date-time"),
     *                         @OA\Property(property="updated_at", type="string", format="date-time")
     *                     ),
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
     *                     )
     *                 ),
     *                 @OA\Property(property="like_counts_by_emotion", type="object",
     *                     @OA\Property(property="total_likes", type="integer"),
     *                     @OA\Property(property="emotion1", type="integer"),
     *                     @OA\Property(property="emotion2", type="integer"),
     *                 ),
     *                 @OA\Property(property="total_comments", type="integer"),
     *                 @OA\Property(property="comments", type="array",
     *                     @OA\Items(
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="user_id", type="integer"),
     *                         @OA\Property(property="content", type="string"),
     *                         @OA\Property(property="parent_id", type="integer"),
     *                         @OA\Property(property="post_id", type="integer"),
     *                         @OA\Property(property="blog_id", type="integer"),
     *                         @OA\Property(property="qa_id", type="integer"),
     *                         @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
     *                         @OA\Property(property="reply", type="integer"),
     *                         @OA\Property(property="user", type="object",
     *                             @OA\Property(property="id", type="integer"),
     *                             @OA\Property(property="username", type="string"),
     *                             @OA\Property(property="first_name", type="string", nullable=true),
     *                             @OA\Property(property="last_name", type="string", nullable=true),
     *                         ),
     *                     ),
     *                 ),
     *             ),
     *         ),
     *     ),
     * )
     */

    public function ShowQaByMajor(Request $request, $major_id, $quantity = null)
    {
        DB::beginTransaction();
        try {
            $hashtag = $request->input('hashtag');
            $query = Qa::query();

            if ($hashtag) {
                $query->where('content', 'LIKE', '%' . $hashtag . '%');
            }

            // Lọc theo Major_id
            $query->where('majors_id', $major_id);

            if ($quantity) {
                $qas = $query->latest()->paginate($quantity);
            } else {
                $qas = $query->latest()->get();
            }

            $result = [];

            foreach ($qas as $qa) {
                $likeCountsByEmotion = [];
                $likeCountsByEmotion['total_likes'] = $qa->likes->count();

                $likers = $qa->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });

                $qa->user;
                $qa->major;
                $emotions = $likers->pluck('emotion')->unique();

                foreach ($emotions as $emotion) {
                    $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                }
                // Tổng số bình luận + 3 bình luận demo
                $totalComment = Comment::where('qa_id', $qa->id)->count();
                $commentDemos = Comment::where('qa_id', $qa->id)->where('parent_id', null)->limit(3)->get();
                foreach ($commentDemos as $commentDemo) {
                    $commentDemo->user;
                    //số lượng reply
                    $commentDemo->reply = Comment::where('qa_id', $qa->id)->where('parent_id', $commentDemo->id)->count();
                }
                $qaData = [
                    'qa' => $qa,
                    'like_counts_by_emotion' => $likeCountsByEmotion,
                    'total_comments' => $totalComment,
                    'comments' => $commentDemos,
                ];
                array_push($result, $qaData);
            }

            DB::commit();
            return response()->json($result, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }


    /**
     * @OA\Get(
     *     path="/api/quests/lista",
     *     tags={"Q&A"},
     *     summary="Danh sách tất cả câu hỏi",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách câu hỏi",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="user_id", type="integer"),
     *                 @OA\Property(property="title", type="string", description="Tiêu đề câu hỏi"),
     *                 @OA\Property(property="content", type="string", description="Nội dung câu hỏi"),
     *                 @OA\Property(property="majors_id", type="integer", description="ID của chuyên ngành liên quan đến câu hỏi"),
     *                 @OA\Property(property="hashtag", type="string", description="HashTag liên quan đến câu hỏi câu hỏi"),
     *                 @OA\Property(property="views", type="integer", description="Số lượng lượt xem câu hỏi"),
     *             ),
     *         ),
     *     ),
     * )
     */


    public function listA()
    {
        $qa = Qa::all();
        return response()->json($qa);
    }

    /**
     * @OA\Get(
     *     path="/api/quests/{qa}",
     *     tags={"Q&A"},
     *     summary="Xem chi tiết câu hỏi",
     *     description="Xem chi tiết về một bài câu hỏi cụ thể",
     *     @OA\Parameter(
     *         name="qa",
     *         in="path",
     *         required=true,
     *         description="ID của bài câu hỏi",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(response=200, description="Thành công. Trả về thông tin chi tiết về câu hỏi, số lượng cảm xúc và bình luận.",
     *         @OA\JsonContent(
     *             @OA\Property(property="qa", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="user_id", type="integer"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="content", type="string"),
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
     *             @OA\Property(property="like_counts_by_emotion", type="object",
     *                 @OA\Property(property="total_likes", type="integer", description="Tổng số lượt thích"),
     *                 @OA\Property(property="emotion1", type="integer", description="Số lượt thích với emotion1"),
     *                 @OA\Property(property="emotion2", type="integer", description="Số lượt thích với emotion2"),
     *             ),
     *             @OA\Property(property="total_comments", type="integer", description="Tổng số bình luận"),
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

    public function detailQandA(Qa $qa)
    {
        $qa->major;
        $qaLikes = $qa->likes;
        $user = Auth::user(); // Lấy thông tin người dùng đăng nhập
        $userLike = $qaLikes->where('user_id', $user->id)->first();
        if ($qaLikes->isEmpty()) {
            $emotions = [];
        } else {
            $emotions = $qaLikes->pluck('emotion')->unique();
        }
        $countsByEmotion = [];
        foreach ($emotions as $emotion) {
            $countsByEmotion[$emotion] = $qaLikes->where('emotion', $emotion)->count();
        }
        $qa->user;
        // $emotions = $likers->pluck('emotion')->unique();
        $comments = Comment::where('qa_id', $qa->id)->where('parent_id', null)->get();
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
        return response()->json(
            [
                'qa' => $qa,
                'emotion' => $countsByEmotion,
                'comments' => $comments,
                'total_comments' => $totalComments,
                'user_like' => $userLike
            ]
        );
    }

    public function ListQa(Request $request)
    {
        $hashtag = $request->input('hashtag');
        $majorsId = $request->input('majors_id');
        $query = Qa::orderBy("created_at", "desc");
        if ($hashtag) {
            $query->where('hashtag', 'LIKE', '%' . $hashtag . '%');
        }
        if ($majorsId) {
            $query->where('majors_id', $majorsId);
        }
        $qa = $query->paginate(10);
        return response()->json($qa, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/quests",
     *     tags={"Q&A"},
     *     summary="Tạo câu hỏi mới",
     *     description="Tạo một câu hỏi mới với tiêu đề, nội dung, chuyên ngành liên quan và hashtag.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "content", "majors_id", "hashtag"},
     *             @OA\Property(property="title", type="string", description="Tiêu đề của câu hỏi", maxLength=255),
     *             @OA\Property(property="content", type="string", description="Nội dung của câu hỏi"),
     *             @OA\Property(property="majors_id", type="integer", description="ID của chuyên ngành liên quan đến câu hỏi"),
     *             @OA\Property(property="hashtag", type="string", description="Hashtag của câu hỏi", maxLength=255)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Câu hỏi đã được tạo thành công"),
     *     @OA\Response(response=400, description="Lỗi khi tạo câu hỏi")
     * )
     */

    public function CreateQa(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $qa = new Qa([
                'user_id' => Auth::id(),
                'title' => $data['title'],
                'content' => $data['content'],
                'majors_id' => $data['majors_id'],
            ]);
            if (isset($data['hashtag']) && !empty($data['hashtag'])) {
                // Tách chuỗi thành mảng các từ (dùng khoảng trắng để tách)
                $words = preg_split('/\s+/', $data['hashtag']);
                $hashtags = [];
                // Lọc các từ có dấu '#' ở đầu
                foreach ($words as $word) {
                    if (strpos($word, '#') === 0) {
                        $hashtags[] = $word;
                    }
                }
                // Giới hạn số lượng hashtag tối đa là 5
                $hashtags = array_slice($hashtags, 0, 5);
                $qa->hashtag = implode(',', $hashtags);
            }
            $qa->save();
            DB::commit();
            return response()->json($qa, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/quests/{id}",
     *     summary="Cập nhật câu hỏi theo ID",
     *     tags={"Q&A"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID của câu hỏi cần cập nhật",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Dữ liệu câu hỏi cần cập nhật",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="title",
     *                 type="string",
     *                 description="Tiêu đề của câu hỏi"
     *             ),
     *             @OA\Property(
     *                 property="content",
     *                 type="string",
     *                 description="Nội dung của câu hỏi"
     *             ),
     *             @OA\Property(
     *                 property="majors_id",
     *                 type="integer",
     *                 description="ID của chuyên ngành"
     *             ),
     *             @OA\Property(
     *                 property="hashtag",
     *                 type="string",
     *                 description="Danh sách hashtag"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Câu hỏi đã được cập nhật thành công"
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Lỗi trong quá trình cập nhật câu hỏi",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="string", description="Thông báo lỗi")
     *         )
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Câu hỏi không tồn tại",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", description="Thông báo lỗi")
     *         )
     *     )
     * )
     */

    public function UpdateQa(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            // $qa = $this->detailQandA($id);
            $qa = Qa::find($id);

            if (!$qa) {
                return response()->json(['error' => 'Câu hỏi không tồn tại'], 404);
            }

            $data = $request->all();
            if (isset($data['hashtag']) && !empty($data['hashtag'])) {
                $words = preg_split('/\s+/', $data['hashtag']);
                $hashtags = [];
                // Lọc các từ có dấu '#' ở đầu
                foreach ($words as $word) {
                    if (strpos($word, '#') === 0) {
                        $hashtags[] = $word;
                    }
                }
                // Giới hạn số lượng hashtag tối đa là 5
                $hashtags = array_slice($hashtags, 0, 5);
                $qa->hashtag = implode(',', $hashtags);
            }
            $qa->update([
                'title' => $data['title'],
                'content' => $data['content'],
                'majors_id' => $data['majors_id'],
            ]);
            $qa->save();
            DB::commit();
            return response()->json($qa, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    /**
     * @OA\Delete(
     *     path="/api/quests/{qa}",
     *     summary="Delete Q&A by ID",
     *     description="Delete a Q&A post by its ID.",
     *     operationId="deleteQa",
     *     tags={"Q&A"},
     *     security={{ "passport": {} }},
     *     @OA\Parameter(
     *         name="qa",
     *         in="path",
     *         required=true,
     *         description="ID of the Q&A post to delete",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Q&A post deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Bài Q&A đã bị xóa thành công.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Bạn không có quyền này")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *     )
     * )
     */
    public function DeleteQa(Qa $qa)
    {
        DB::beginTransaction();
        try {
            if (Auth::check() && Auth::user()->id === $qa->user_id) {
                Comment::where('qa_id', $qa->id)->delete();
                Like::where('qa_id', $qa->id)->delete();
                $qa->likes()->delete();
                $qa->comments()->delete();
                $qa->delete();
                DB::commit();
                return response()->json(['message' => 'Bài Q&a đã bị xóa thành công.'], 200);
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
