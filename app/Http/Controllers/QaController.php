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
     *     path="/api/quests/list-all-qanda",
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
    public function ShowAllQa(Request $request)
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

            $qas = $query->latest()->get();

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

                $emotions = $likers->pluck('emotion')->unique();

                foreach ($emotions as $emotion) {
                    $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                }
                // Tổng số bình luận + 3 bình luận demo
                $totalComment = Comment::where('qa_id', $qa->id)->count();
                $commentDemos = Comment::where('qa_id', $qa->id)->where('parent_id', 0)->limit(3)->get();
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


    public function listA() {
        $qa = Qa::all();
        return response()->json($qa);
    }

    /**
     * @OA\Get(
     *     path="/api/quests/{qa}",
     *     summary="Lấy thông tin chi tiết của câu hỏi",
     *     tags={"Q&A"},
     *     @OA\Parameter(
     *         name="qa",
     *         in="path",
     *         description="Lấy thông tin chi tiết của một câu hỏi qua id",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *    @OA\Response(response=500, description="Lỗi xảy ra khi hiển thị chi tiết câu hỏi", @OA\JsonContent())
     * )
     */

    public function detailQandA($id)
    {
        DB::beginTransaction();
        try {
            $qa = Qa::find($id);

            if (!$qa) {
                // Xử lý trường hợp không tìm thấy bài đăng
                return response()->json(['error' => 'Câu hỏi không tồn tại'], 404);
            }

            $likeCountsByEmotion = [];
            $likeCountsByEmotion['total_likes'] = $qa->likes->count();

            $likers = $qa->likes->map(function ($like) {
                return [
                    'user' => $like->user,
                    'emotion' => $like->emotion,
                ];
            });

            $emotions = $likers->pluck('emotion')->unique();

            foreach ($emotions as $emotion) {
                $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
            }

            // Tổng số bình luận + 3 bình luận demo
            $totalComment = Comment::where('qa_id', $qa->id)->count();
            $commentDemos = Comment::where('qa_id', $qa->id)->where('parent_id', 0)->limit(3)->get();
            foreach ($commentDemos as $commentDemo) {
                $commentDemo->user;
                // Số lượng reply
                $commentDemo->reply = Comment::where('qa_id', $qa->id)->where('parent_id', $commentDemo->id)->count();
            }

            DB::commit();

            return response()->json([
                'qa' => $qa,
                'like_counts_by_emotion' => $likeCountsByEmotion,
                'total_comments' => $totalComment,
                'comments' => $commentDemos,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
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
        try{
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
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/quests/{qa}",
     *     tags={"Q&A"},
     *     summary="Cập nhật thông tin của câu hỏi",
     *     description="Cập nhật thông tin của một câu hỏi đã tồn tại",
     *     @OA\Parameter(
     *         name="qa",
     *         in="path",
     *         required=true,
     *         description="ID của câu hỏi cần cập nhật",
     *         @OA\Schema(type="integer")
     *     ),
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
     *     @OA\Response(response=200, description="Câu hỏi đã được cập nhật thành công"),
     *     @OA\Response(response=400, description="Lỗi xử lý")
     * )
     */

    public function UpdateQa(Request $request, Qa $qa)
    {
        DB::beginTransaction();
        try {
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