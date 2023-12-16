<?php

namespace App\Http\Controllers;

use App\Events\PrivateMessageSent;
use App\Events\ReceiveNotification;
use App\Models\Notification;
use App\Models\PrivateMessage;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PrivateMessagesController extends Controller
{
    public function ShowListUserChat($quantity = null)
    {
        $user_id = Auth::id();

        $listUserIds = PrivateMessage::where(function ($query) use ($user_id) {
            $query->where('sender_id', $user_id)
                ->orWhere('receiver_id', $user_id);
        })
            ->where(function ($query) use ($user_id) {
                $query->whereNull('deleted_by')
                    ->orWhereJsonDoesntContain('deleted_by', $user_id);
            })
            ->pluck('sender_id', 'receiver_id')
            ->map(function ($sender_id, $receiver_id) use ($user_id) {
                return $sender_id == $user_id ? $receiver_id : $sender_id;
            })
            ->unique();
        $listUserChat = User::select('id', 'username', 'first_name', 'last_name', 'email', 'birthday', 'avatar', 'phone', 'address', 'biography', 'gender', 'status', 'activity_user', 'major_id')
            ->whereIn('id', $listUserIds)
            ->with(['major' => function ($query) {
                $query->select('id', 'majors_name');
            }])
            ->withCount(['messages as unread_messages_count' => function ($query) use ($user_id) {
                $query->where('sender_id', $user_id)
                    ->where('status', '!=', config('default.private_messages.status.read'));
            }])
            ->when($quantity, function ($query) use ($quantity) {
                return $query->paginate($quantity);
            }, function ($query) {
                return $query->get();
            });

        $totalunreadMessagesCount = PrivateMessage::where('receiver_id', $user_id)
            ->where('status', '!=', config('default.private_messages.status.read'))
            ->count();
        // Lấy tin nhắn cuối cùng giữa hai người dùng
        $listLastMessages = PrivateMessage::whereIn('id', function ($query) use ($user_id) {
            $query->select(DB::raw('MAX(id)'))
                ->from('private_messages')
                ->where(function ($query) use ($user_id) {
                    $query->where('sender_id', $user_id)
                        ->orWhere('receiver_id', $user_id);
                })
                ->where(function ($query) use ($user_id) {
                    $query->whereNull('deleted_by')
                        ->orWhereJsonDoesntContain('deleted_by', $user_id);
                })
                ->groupBy(DB::raw('IF(sender_id > receiver_id, sender_id, receiver_id)'))
                ->groupBy(DB::raw('IF(sender_id > receiver_id, receiver_id, sender_id)'));
        })
            ->with(['sender:id,avatar', 'receiver:id,avatar,username'])
            ->get();
        return response()->json(['data' => $listUserChat, 'total_mess_count' => $totalunreadMessagesCount, 'list' => $listLastMessages], 200);
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

    public function ShowAllMessage(User $user, $quantity = null)
    {
        $user1Id  = Auth::id();
        $user2Id = $user->id;

        if ($user1Id == $user2Id) {
            return response()->json(['error' => 'Không thể tải tin nhắn'], 400);
        }

        $messages = PrivateMessage::where(function ($query) use ($user1Id, $user2Id) {
            $query->where(function ($query) use ($user1Id, $user2Id) {
                $query->where('sender_id', $user1Id)
                    ->where('receiver_id', $user2Id);
            })->orWhere(function ($query) use ($user1Id, $user2Id) {
                $query->where('sender_id', $user2Id)
                    ->where('receiver_id', $user1Id);
            });
        })->where(function ($query) use ($user1Id) {
            $query->whereNull('deleted_by')
                ->orWhereJsonDoesntContain('deleted_by', $user1Id);
        })->orderBy('created_at', 'desc')->with(['sender:id,avatar', 'receiver:id,avatar,username']);

        if ($quantity) {
            $messages = $messages->paginate($quantity);
        } else {
            $messages = $messages->get();
        }

        return response()->json($messages, 200);
    }
    // public function ShowAllMessage(User $user)
    // {
    //     $user1Id  = Auth::id();
    //     $user2Id = $user->id;
    //     if ($user1Id == $user2Id) {
    //         return response()->json(['error' => 'không thể tải tin nhắn'], 400);
    //     }
    //     $messages = PrivateMessage::where(function ($query) use ($user1Id, $user2Id) {
    //         $query->where('sender_id', $user1Id)
    //             ->where('receiver_id', $user2Id);
    //     })->orWhere(function ($query) use ($user1Id, $user2Id) {
    //         $query->where('sender_id', $user2Id)
    //             ->where('receiver_id', $user1Id);
    //     })->orderBy('created_at', 'asc')->with(['sender:id,avatar', 'receiver:id,avatar,username'])
    //         ->get();
    //     return response()->json($messages, 200);
    // }
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
            // relationship to take major_name of sender
            $messageWithSender = $message->load(['sender.major' => function ($query) {
                $query->select('id', 'majors_name');
            }]);
            $messageWithSender->sender->majors_name = $messageWithSender->sender->major->majors_name;
            unset($messageWithSender->sender->major);
            broadcast(new PrivateMessageSent($messageWithSender))->toOthers();
            //Thông báo
            $content = Auth::user()->username . ' đã gửi cho bạn tin nhắn mới.';
            $notification = Notification::where('notification_type', config('default.notification.notification_type.message'))->where('sender', Auth::id())->where('recipient', $receiverId)->where('objet_id', Auth::id())->orderByDesc('id')->first();
            if (!is_null($notification)) {
                //Update thông báo
                $notification->update([
                    'content' => $content,
                    'updated_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                    'status' => config('default.notification.status.not_seen'),
                ]);
            } else {
                $notification = Notification::create([
                    'sender' => Auth::id(),
                    'recipient' => $receiverId,
                    'content' => $content,
                    'notification_type' => config('default.notification.notification_type.message'),
                    'status' => config('default.notification.status.not_seen'),
                    'objet_id' => Auth::id(),
                ]);
            }
            $avatar_sender = Auth::user()->avatar;
            broadcast(new ReceiveNotification($notification, $avatar_sender))->toOthers();
            return response()->json(['message' => 'Tin nhắn đã được gửi', 'data' => $message->load('receiver')], 200);
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
        broadcast(new PrivateMessageSent($privateMessage, 'delete'))->toOthers();
        return response()->json(['message' => 'Tin nhắn đã được xóa', 'data' => $privateMessage->load('sender')], 200);
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
        $user1Id = Auth::id();
        $user2Id = $user->id;

        if ($user2Id) {
            $messages = PrivateMessage::where(function ($query) use ($user1Id, $user2Id) {
                $query->where('sender_id', $user1Id)
                    ->where('receiver_id', $user2Id);
            })->orWhere(function ($query) use ($user1Id, $user2Id) {
                $query->where('sender_id', $user2Id)
                    ->where('receiver_id', $user1Id);
            })->get();
            foreach ($messages as $message) {
                $deletedBy = json_decode($message->deleted_by, true) ?? [];
                if (empty($deletedBy)) {
                    if ($user1Id) {
                        $deletedBy[] = $user1Id;
                    } elseif ($user2Id) {
                        $deletedBy[] = $user2Id;
                    }
                } elseif (!in_array($user1Id, $deletedBy)) {
                    $deletedBy[] = $user1Id;
                }
                $message->deleted_by = json_encode($deletedBy);
                $message->save();
                $updatedDeletedBy = json_decode($message->deleted_by, true) ?? [];
                if (in_array($user1Id, $updatedDeletedBy) && in_array($user2Id, $updatedDeletedBy)) {
                    $message->delete(); // Xóa tin nhắn
                }
            }
            return response()->json(['message' => 'Xóa tất cả tin nhắn thành công'], 200);
        } else {
            return response()->json(['message' => 'Xóa tất cả tin nhắn thất bại'], 400);
        }
    }
    public function changestatus(User $user)
    {
        $loginUser = Auth::id();
        $senderId = $user->id;
        $messages = PrivateMessage::where('sender_id', $senderId)->where('receiver_id', $loginUser)->get();
        foreach ($messages as $message) {
            $message->update([
                'status' => config('default.private_messages.status.read')
            ]);
        }
        return response()->json(['messages' => 'ok rồi']);
    }
}
