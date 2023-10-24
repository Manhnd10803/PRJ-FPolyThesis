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

  public function CreateQa(Request $request){
    DB::beginTransaction();
    try{
        $data = $request->all();
      
       $qa = new Qa([
        'user_id' => Auth::id(),
        'title' => $data['title'],
        'content' => $data['content'],
        'majors_id' => $data['majors_id'],
        'hashtag' => $data['hashtag'],
       ]);
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
     *     summary="Cập nhật câu hỏi",
     *     description="Cập nhật một câu hỏi với tiêu đề, nội dung, chuyên ngành liên quan và hashtag.",
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
     *     @OA\Response(response=400, description="Lỗi khi cập nhật câu hỏi"),
     *     @OA\Response(response=404, description="Câu hỏi không được tìm thấy")
     * )
     */

public function UpdateQa(Request $request, Qa $qa) {
    DB::beginTransaction();
    try {
        $data = $request->all();
        $qa->update([
            'title' => $data['title'],
            'content' => $data['content'],
            'majors_id' => $data['majors_id'],
            'hashtag' => $data['hashtag'],
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
     *     tags={"Q&A"},
     *     summary="Xóa câu hỏi và câu trả lời",
     *     description="Xóa một câu hỏi và tất cả các câu trả lời liên quan dựa trên ID.",
     *     @OA\Parameter(
     *         name="qa",
     *         in="path",
     *         required=true,
     *         description="ID của câu hỏi cần xóa",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Câu hỏi và câu trả lời đã bị xóa thành công"),
     *     @OA\Response(response=400, description="Lỗi khi xóa câu hỏi và câu trả lời"),
     *     @OA\Response(response=401, description="Không được phép xóa câu hỏi và câu trả lời"),
     *     @OA\Response(response=404, description="Câu hỏi không được tìm thấy")
     * )
     */

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

}