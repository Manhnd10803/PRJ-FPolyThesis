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
    
  public function CreateQa(Request $request){
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
public function UpdateQa(Request $request, Qa $qa) {
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
public function DeleteQa(Qa $qa){
    DB::beginTransaction();
    try {
        if(Auth::check() && Auth::user()->id === $qa->user_id){
        Comment::where('qa_id', $qa->id)->delete();
        Like::where('qa_id',$qa->id)->delete();
        $qa->likes()->delete();
        $qa->comments()->delete();
        $qa->delete();
        DB::commit();
        return response()->json(['message' => 'Bài Q&a đã bị xóa thành công.'], 200);
        }else{
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
     *     path="/api/quests/count-like/{qa}/like-info",
     *     tags={"Q&A"},
     *     summary="Lấy số lượng lượt thích của bài viết kèm info user",
     *     description="Lấy số lượng lượt thích thông tin user và sắp xếp theo loại cảm xúc của một bài viết dựa trên ID của bài viết.",
     *     @OA\Parameter(
     *         name="qa",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Số lượng lượt thích của bài viết"),
     *     @OA\Response(response=404, description="Bài viết không được tìm thấy")
     * )
     */
    public function CountLikeInQa(Qa $qa){
        DB::beginTransaction();
        try{
            // Đếm lượt thích của Qa
            $likeCount = $qa->likes->count();
            $likers = $qa->likes->map(function ($like) {
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
     *     path="/api/quests/count-cmt/{qa}",
     *     tags={"Q&A"},
     *     summary="Lấy số lượng bình luận và trả lời của bài viết",
     *     description="Lấy số lượng bình luận và trả lời của một bài viết dựa trên ID của bài viết.",
     *     @OA\Parameter(
     *         name="qa",
     *         in="path",
     *         required=true,
     *         description="ID của bài viết",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Số lượng bình luận và trả lời của bài viết"),
     *     @OA\Response(response=404, description="Bài viết không được tìm thấy")
     * )
     */

     public function CountCommentInQa(Qa $qa){
        $commentCount = Comment::where('qa_id', $qa->id)->count();
        $replyCount = Comment::where('qa_id', $qa->id)->where('parent_id', '>', 0)->count();
        $totalCommentsAndReplies = $commentCount + $replyCount;
        return response()->json(['total' => $totalCommentsAndReplies], 200);
     }
}