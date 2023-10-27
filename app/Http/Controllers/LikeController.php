<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Emotion;
use App\Models\Like;
use App\Models\Post;
use App\Models\Qa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function LikeItem(Request $request, $model, $item, $emotion)
    {
        $user = Auth::user();
        $validEmotions = config('default.valid_emotions');
        if (!in_array($emotion, $validEmotions)) {
            return response()->json(['error' => 'Invalid emotion type'], 400);
        }
        // Xác định tên của model (Post, Blog, hoặc Qa)
        $modelName = strtolower(class_basename($model));
        // Kiểm tra xem người dùng đã có cảm xúc cho mục này chưa
        $existingLike = Like::where('user_id', $user->id)->where($modelName . '_id', $item)->first();
        if ($existingLike) {
            // Nếu đã tồn tại và cảm xúc trùng khớp với cảm xúc hiện tại, xóa cảm xúc
            if ($existingLike->emotion === $emotion) {
                $existingLike->delete();
                $message = 'Emotion removed successfully';
            } else {
                // Nếu đã tồn tại, nhưng cảm xúc không trùng khớp, cập nhật lại cảm xúc
                $existingLike->update(['emotion' => $emotion]);
                $message = 'Emotion updated successfully';
            }
        } else {
            // Nếu chưa tồn tại, tạo mới cảm xúc
            Like::create([
                'user_id' => $user->id,
                $modelName . '_id' => $item,
                'emotion' => $emotion,
            ]);
            $message = 'Emotion added successfully';
        }
        return response()->json(['message' => $message]);
    }
    /**
     * @OA\Get(
     *     path="/api/emotions",
     *     tags={"Emotions"},
     *     summary="Danh sách các loại cảm xúc (emotions)",
     *     description="Lấy danh sách các loại cảm xúc (emotions) được hỗ trợ.",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách các loại cảm xúc",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="emotions",
     *                 type="array",
     *                 @OA\Items(
     *                     type="string",
     *                     enum={"like", "love", "haha", "wow", "sad", "angry"}
     *                 ),
     *                 description="Danh sách các loại cảm xúc được hỗ trợ"
     *             )
     *         )
     *     )
     * )
     */
    public function listEmotion()
    {
        $emotions = config('default.valid_emotions');
        return response()->json(['emotions' => $emotions]);
    }
}