<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
 * @OA\Post(
 *     path="/api/like/{model}/{item}/{emotion}",
 *     summary="Thích hoặc bỏ thích một mục",
 *     description="Thích hoặc bỏ thích một mục (Post, Blog, hoặc Qa) với một cảm xúc cụ thể.",
 *     operationId="likeItem",
 *     tags={"Likes"},
 *     @OA\Parameter(
 *         name="model",
 *         in="path",
 *         description="Loại mục (post, qa)",
 *         required=true,
 *         @OA\Schema(type="string", enum={"post","qa"})
 *     ),
 *     @OA\Parameter(
 *         name="item",
 *         in="path",
 *         description="ID của mục",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="emotion",
 *         in="path",
 *         description="Loại cảm xúc (emotion)",
 *         required=true,
 *         @OA\Schema(type="string", enum={"like", "love", "haha", "wow","sad","angry"})
 *     ),
 *     @OA\Response(
 *         response="200",
 *         description="Cảm xúc được cập nhật thành công",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response="400",
 *         description="Lỗi",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */

    public function LikeItem(Request $request, $model, $item, $emotion)
    {
        $user = Auth::user();
        $validEmotions = config('default.valid_emotions');
        if (!in_array($emotion, $validEmotions)) {
            return response()->json(['error' => 'Invalid emotion type'], 400);
        }
        // Xác định tên của model (Post hoặc Qa)
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
     * @OA\Post(
     *     path="/api/like/blog/{item}/{action}",
     *     summary="Thích hoặc bỏ thích câu hỏi",
     *     description="Thích hoặc bỏ thích một câu hỏi với một cảm xúc cụ thể.",
     *     operationId="likeItemBlog",
     *     tags={"Likes"},
     *     @OA\Parameter(
     *         name="item",
     *         in="path",
     *         description="ID của câu hỏi",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="action",
     *         in="path",
     *         description="Loại cảm xúc (emotion)",
     *         required=true,
     *         @OA\Schema(type="string", enum={"like", "dislike"})
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Cảm xúc được cập nhật thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Lỗi",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */
    public function LikeItemBlog(Request $request, $item, $action)
    {
        $user = Auth::user();
        $validEmotions = config('default.valid_emotions');

        if (!in_array($action, $validEmotions)) {
            return response()->json(['error' => 'Invalid emotion type'], 400);
        }

        $existingReaction = Like::where('user_id', $user->id)->where('blog_id', $item)->first();

        if ($existingReaction) {
            // Nếu đã có phản ứng trước đó
            if ($existingReaction->emotion === $action) {
                // Nếu cảm xúc hiện tại là giống với hành động người dùng, xóa cảm xúc
                $existingReaction->delete();
                $message = 'Removed reaction successfully';
            } else {
                // Nếu cảm xúc hiện tại khác với hành động người dùng, cập nhật thành cảm xúc mới
                $existingReaction->emotion = $action;
                $existingReaction->save();
                $message = 'Updated reaction successfully';
            }
        } else {
            // Nếu không có phản ứng trước đó, tạo phản ứng mới
            $like = new Like([
                'user_id' => $user->id,
                'blog_id' => $item,
                'emotion' => $action,
            ]);
            $like->save();
            $message = 'Added ' . $action . ' successfully';
        }
        return response()->json(['message' => $message]);
    }

    /**
     * @OA\Post(
     *     path="/api/like/qa/{item}/{action}",
     *     summary="Thích hoặc bỏ thích câu hỏi và câu trả lời",
     *     description="Thích hoặc bỏ thích một câu hỏi hoặc câu trả lời với một cảm xúc cụ thể.",
     *     operationId="likeItemQandA",
     *     tags={"Likes"},
     *     @OA\Parameter(
     *         name="item",
     *         in="path",
     *         description="ID của câu hỏi hoặc câu trả lời",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="action",
     *         in="path",
     *         description="Loại cảm xúc (emotion)",
     *         required=true,
     *         @OA\Schema(type="string", enum={"like", "dislike"})
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Cảm xúc được cập nhật thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Lỗi",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */

    public function LikeItemQandA(Request $request, $item, $action)
    {
        $user = Auth::user();
        $validEmotions = config('default.valid_emotions');

        if (!in_array($action, $validEmotions)) {
            return response()->json(['error' => 'Invalid emotion type'], 400);
        }

        $existingReaction = Like::where('user_id', $user->id)->where('qa_id', $item)->first();

        if ($existingReaction) {
            // Nếu đã có phản ứng trước đó
            if ($existingReaction->emotion === $action) {
                // Nếu cảm xúc hiện tại là giống với hành động người dùng, xóa cảm xúc
                $existingReaction->delete();
                $message = 'Removed reaction successfully';
            } else {
                // Nếu cảm xúc hiện tại khác với hành động người dùng, cập nhật thành cảm xúc mới
                $existingReaction->emotion = $action;
                $existingReaction->save();
                $message = 'Updated reaction successfully';
            }
        } else {
            // Nếu không có phản ứng trước đó, tạo phản ứng mới
            $like = new Like([
                'user_id' => $user->id,
                'qa_id' => $item,
                'emotion' => $action,
            ]);
            $like->save();
            $message = 'Added ' . $action . ' successfully';
        }
        return response()->json(['message' => $message]);
    }

    /**
     * @OA\Get(
     *     path="/api/like",
     *     tags={"Emotions"},
     *     summary="Danh sách các loại cảm xúc (emotions) dành cho post và qa",
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