<?php

namespace App\Http\Controllers;

use App\Events\PrivateMessageSent;
use App\Models\PrivateMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PrivateMessagesController extends Controller
{
    public function ShowListUserChat()
    {
        $user_id = Auth::id();

        // Danh sách người gửi tin nhắn đến người dùng hiện tại
        $sentMessages = PrivateMessage::where('sender_id', $user_id)->pluck('receiver_id');

        // Danh sách người nhận tin nhắn từ người dùng hiện tại
        $receivedMessages = PrivateMessage::where('receiver_id', $user_id)->pluck('sender_id');

        // Kết hợp danh sách người gửi và người nhận tin nhắn, loại bỏ trùng lặp và lấy thông tin người dùng
        $listUserIds = $sentMessages->merge($receivedMessages)->unique();
        $listUserChat = User::whereIn('id', $listUserIds)->get();

        return response()->json($listUserChat);
    }
    /**
     * @OA\Get(
     *     path="/api/messages/{user}",
     *     summary="Lấy tất cả tin nhắn giữa hai người dùng",
     *     tags={"Messages"},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         description="Người dùng cần lấy tin nhắn với",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Danh sách tin nhắn giữa hai người dùng",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *             @OA\Property(property="id", type="integer" , description="id tin nhắn"),
     *             @OA\Property(property="sender_id", type="integer" , description="id người gửi tin nhắn"),
     *             @OA\Property(property="receiver_id", type="integer" , description="id người nhận tin nhắn"), 
     *             @OA\Property(property="status", type="integer" , description="trạng thái tin nhắn "),
     *             @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
     *             @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật"),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Lỗi khi không thể tải tin nhắn",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="không thể tải tin nhắn")
     *         )
     *     )
     * )
     */

    public function ShowAllMessage(User $user)
    {
        $user1Id  = Auth::id();
        $user2Id = $user->id;
        if ($user1Id == $user2Id) {
            return response()->json(['error' => 'không thể tải tin nhắn'], 400);
        }
        $messages = PrivateMessage::where(function ($query) use ($user1Id, $user2Id) {
            $query->where('sender_id', $user1Id)
                ->where('receiver_id', $user2Id);
        })->orWhere(function ($query) use ($user1Id, $user2Id) {
            $query->where('sender_id', $user2Id)
                ->where('receiver_id', $user1Id);
        })->orderBy('created_at', 'asc')->with(['sender:id,avatar', 'receiver:id,avatar,username'])
            ->get();
        return response()->json($messages, 200);
    }
    /**
     * @OA\Post(
     *     path="/api/messages/{user}",
     *     summary="Gửi tin nhắn tới một người dùng",
     *     tags={"Messages"},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         description="Người dùng nhận tin nhắn",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Nội dung tin nhắn",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="content", type="string", example="Nội dung tin nhắn")
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Tin nhắn đã được gửi thành công",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Tin nhắn đã được gửi"),
     *             @OA\Property(property="data", type="object",
     *                @OA\Property(property="id", type="integer" , description="id tin nhắn"),
     *                @OA\Property(property="sender_id", type="integer" , description="id người gửi tin nhắn"),
     *                @OA\Property(property="receiver_id", type="integer" , description="id người nhận tin nhắn"), 
     *                @OA\Property(property="status", type="integer" , description="trạng thái tin nhắn "),
     *                @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
     *                @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật"),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Lỗi khi không thể gửi tin nhắn",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="không thể gửi tin nhắn cho chính mình")
     *         )
     *     )
     * )
     */
    public function SendMessages(Request $request, User $user)
    {
        DB::beginTransaction();
        try {
            $senderID  = Auth::id();
            $receiverId = $user->id;
            if ($senderID == $receiverId) {
                return response()->json(['error' => 'không thể gửi tin nhắn cho chính mình'], 400);
            }
            $content = $request->input('content');
            $message = new PrivateMessage([
                'sender_id' => $senderID,
                'receiver_id' => $receiverId,
                'content' => $content,
                'status' => config('default.private_messages.status.send'),
            ]);
            $message->save();
            DB::commit();
            // 
            broadcast(new PrivateMessageSent($message->load('sender')))->toOthers();
            return response()->json(['message' => 'Tin nhắn đã được gửi', 'data' => $message->load('sender')], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
    /**
     * @OA\Put(
     *     path="/api/messages/{privateMessage}",
     *     summary="Cập nhật nội dung tin nhắn",
     *     tags={"Messages"},
     *     @OA\Parameter(
     *         name="privateMessage",
     *         in="path",
     *         description="Tin nhắn cần cập nhật",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Thông tin cập nhật tin nhắn",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="content", type="string", example="Nội dung tin nhắn mới")
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Tin nhắn đã được cập nhật thành công",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Tin nhắn đã được cập nhật"),
     *             @OA\Property(property="data", type="object",
     *                @OA\Property(property="id", type="integer" , description="id tin nhắn"),
     *                @OA\Property(property="sender_id", type="integer" , description="id người gửi tin nhắn"),
     *                @OA\Property(property="receiver_id", type="integer" , description="id người nhận tin nhắn"), 
     *                @OA\Property(property="status", type="integer" , description="trạng thái tin nhắn "),
     *                @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
     *                @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật"),
     *             )
     *         )
     *     )
     * )
     */
    public function UpdateMessage(Request $request, PrivateMessage $privateMessage)
    {
        $privateMessage->update([
            'content' => $request->input('content')
        ]);
        return response()->json(['message' => 'Tin nhắn đã được cập nhật', $privateMessage], 200);
    }
    /**
     * @OA\Delete(
     *     path="/api/message/{privateMessage}",
     *     summary="Xóa tin nhắn",
     *     tags={"Messages"},
     *     @OA\Parameter(
     *         name="privateMessage",
     *         in="path",
     *         description="Tin nhắn cần xóa",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Tin nhắn đã được xóa thành công",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Tin nhắn đã được xóa")
     *         )
     *     )
     * )
     * )
     */
    public function DeleteMessage(PrivateMessage $privateMessage)
    {
        $privateMessage->delete();
        return response()->json(['message' => 'Tin nhắn đã được xóa'], 200);
    }
    /**
     * @OA\Delete(
     *     path="/api/message/chat/{user}}",
     *     summary="Xóa tin nhắn",
     *     tags={"Messages"},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         description="Người được xóa hết tin nhắn",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Toàn bộ tin nhắn đã được xóa thành công",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Tin nhắn đã được xóa")
     *         )
     *     )
     * )
     * )
     */
    public function DeleteMessagesBetweenUsers(User $user)
    {
        $user_1 = Auth::id();
        $user_2 = $user->id;
        if ($user_2) {
            PrivateMessage::where(function ($query) use ($user_1, $user_2) {
                $query->where('sender_id', $user_1)->where('receiver_id', $user_2);
            })->orWhere(function ($query) use ($user_1, $user_2) {
                $query->where('sender_id', $user_2)->where('receiver_id', $user_1);
            })->delete();
            return response()->json(['message' => 'Xóa tất cả tin nhắn thành công'], 200);
        } else {
            return response()->json(['message' => 'Xóa tất cả tin nhắn thất bại'], 400);
        }
    }
}
