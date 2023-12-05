<?php

namespace App\Http\Controllers;

use App\Events\ReceiveNotification;
use App\Models\Blog;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Qa;
use App\Models\User;
use Carbon\Carbon;
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

        $score = config('default.user.score.like');

        if ($existingLike) {
            // Nếu đã tồn tại và cảm xúc trùng khớp với cảm xúc hiện tại, xóa cảm xúc
            $modelClass = null;

            switch ($modelName) {
                case 'blog':
                    $modelClass = Blog::class;
                    break;
                case 'qa':
                    $modelClass = Qa::class;
                    break;
                default:
                    break;
            }
            if ($existingLike->emotion === $emotion) {
                if (in_array($modelName, ['blog', 'qa'])) {
                    if ($modelClass !== null) {
                        $detailModel = $modelClass::find($item);
                        if ($detailModel) {
                            $user = User::find($detailModel->user_id);
                            if ($user && $user->score > 0) {
                                $user->score -= $score;
                                $user->save();
                            }
                        }
                    }
                }
                $existingLike->delete();
                $message = 'Emotion removed successfully';
            } else {
                if ($emotion == 'like') {
                    $score = config('default.user.score.like');
                } elseif ($emotion == 'dislike') {
                    $score = config('default.user.score.dislike');
                }
                // Nếu đã tồn tại, nhưng cảm xúc không trùng khớp, cập nhật lại cảm xúc
                if (in_array($modelName, ['blog', 'qa'])) {
                    if ($modelClass !== null) {
                        $detailModel = $modelClass::find($item);
                        if ($detailModel) {
                            $user = User::find($detailModel->user_id);
                            if ($user) {
                                $user->score += $score;
                                $user->save();
                            }
                        }
                    }
                }
                $existingLike->update(['emotion' => $emotion]);
                $message = 'Emotion updated successfully';
            }
        } else {
            if ($emotion == 'like') {
                $score = config('default.user.score.like');
            } elseif ($emotion == 'dislike') {
                $score = config('default.user.score.dislike');
            }
            // Nếu chưa tồn tại, tạo mới cảm xúc
            Like::create([
                'user_id' => $user->id,
                $modelName . '_id' => $item,
                'emotion' => $emotion,
            ]);
            //thông báo
            $participants = [];
            switch ($modelName) {
                case 'post':
                    $model = Post::find($item);
                    $notificationType = config('default.notification.notification_type.like_post');
                    $message = Auth::user()->username . ' đã bày tỏ cảm xúc về ' . $modelName . ' của bạn.';
                    $participants[] = Auth::id();
                    break;
                case 'blog':
                    $model = Blog::find($item);
                    $user = User::find($model->user_id);
                    if ($score != 0) {
                        if ($user->score == 0) {
                            $score = 0;
                        }
                        $user->score += $score;
                        $user->save();
                    }
                    $notificationType = config('default.notification.notification_type.like_blog');
                    $message = Auth::user()->username . ' đã bày tỏ cảm xúc về ' . $modelName . ' của bạn.';
                    $participants[] = Auth::id();
                    break;
                case 'qa':
                    $model = Qa::find($item);
                    $user = User::find($model->user_id);
                    if ($score != 0) {
                        if ($user->score == 0) {
                            $score = 0;
                        }
                        $user->score += $score;
                        $user->save();
                    }
                    $notificationType = config('default.notification.notification_type.like_qa');
                    $message = Auth::user()->username . ' đã bày tỏ cảm xúc về ' . $modelName . ' của bạn.';
                    $participants[] = Auth::id();
                    break;
                default:
                    break;
            }
            if (Auth::user()->id != $model->user_id) {
                // Những người đã bày tỏ cảm xúc trước
                $likes = $model->likes()->where('likes.user_id', '!=', Auth::id())->orderByDesc('id')->get();
                foreach ($likes as $like) {
                    $participants[] = $like->user_id;
                }
                $notification = Notification::where('notification_type', $notificationType)->where('objet_id', $item)->orderByDesc('id')->first();
                if (count($participants) > 1) {
                    //Cập nhật nội dung thông báo
                    $latestLiker = User::find(array_shift($participants));
                    $remainingLikesCount = count($participants);
                    $message = $latestLiker->username . ' và ' . $remainingLikesCount . ' người khác đã bày tỏ cảm xúc về ' . $modelName . ' của bạn.';
                    if (!is_null($notification)) {
                        //Update thời gian thông báo
                        $notification->update([
                            'content' => $message,
                            'updated_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                            'status' => config('default.notification.status.not_seen'),
                        ]);
                        $avatar_sender = Auth::user()->avatar;
                        broadcast(new ReceiveNotification($notification, $avatar_sender))->toOthers();
                    } else {
                        //Tạo mới thông báo
                        $notification = Notification::create([
                            'sender' => Auth::id(),
                            'recipient' => $model->user_id,
                            'content' => $message,
                            'notification_type' => $notificationType,
                            'status' => config('default.notification.status.not_seen'),
                            'objet_id' => $item,
                        ]);
                        $avatar_sender = Auth::user()->avatar;
                        broadcast(new ReceiveNotification($notification, $avatar_sender))->toOthers();
                    }
                } else {
                    if (!is_null($notification)) {
                        //Update thời gian thông báo
                        $notification->update([
                            'content' => $message,
                            'updated_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                            'status' => config('default.notification.status.not_seen'),
                        ]);
                        $avatar_sender = Auth::user()->avatar;
                        broadcast(new ReceiveNotification($notification, $avatar_sender))->toOthers();
                    } else {
                        //Tạo mới thông báo
                        $notification = Notification::create([
                            'sender' => Auth::id(),
                            'recipient' => $model->user_id,
                            'content' => $message,
                            'notification_type' => $notificationType,
                            'status' => config('default.notification.status.not_seen'),
                            'objet_id' => $item,
                        ]);
                        $avatar_sender = Auth::user()->avatar;
                        broadcast(new ReceiveNotification($notification, $avatar_sender))->toOthers();
                    }
                }
            }
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
