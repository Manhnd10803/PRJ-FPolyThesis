<?php

namespace App\Http\Controllers;

use App\Events\FriendAccept;
use App\Events\ReceiveNotification;
use App\Models\Friend;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/send-request/{recipient}",
     *     tags={"Friendship"},
     *     summary="Gửi lời mời kết bạn",
     *     description="Gửi một lời mời kết bạn đến một người dùng khác hoặc hủy lời mời nếu nó tồn tại và đang ở trạng thái 'pending'.",
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="recipient_id",
     *                 type="integer",
     *                 description="ID của người dùng nhận lời mời kết bạn."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lời mời kết bạn đã được gửi hoặc hủy thành công.",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Lỗi xảy ra khi gửi lời mời hoặc hủy.",
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Không thể gửi lời mời cho chính bạn.",
     *     ),
     * )
     */
    public function SendFriendRequest(User $recipient)
    {
        DB::beginTransaction();
        try {
            $user1 = Auth::id();
            if ($user1 == $recipient->id) {
                return response()->json(['error' => 'Không thể gửi lời mời cho chính bạn'], 403);
            }
            $existingFriendship = Friend::where('user_id_1', $user1)->where('user_id_2', $recipient->id)->first();
            if ($existingFriendship) {
                // Nếu lời mời đã tồn tại và đang ở trạng thái "pending", hủy lời mời
                $status = config('default.friend.status.pending');
                if ($existingFriendship->status === $status) {
                    $existingFriendship->delete();
                    DB::commit();
                    return response()->json(['message' => 'Đã hủy lời mời kết bạn'], 200);
                }
            } else {
                // Nếu lời mời chưa tồn tại, tạo lời mời mới
                $friend =  Friend::create([
                    'user_id_1' => $user1,
                    'user_id_2' => $recipient->id,
                    'status' => config('default.friend.status.pending'),
                    'friendship_type' =>  config('default.friend.friendship_type.follow')
                ]);
                //Thông báo
                $content = Auth::user()->username . ' đã gửi cho bạn lời mời kết bạn.';
                $notification = Notification::create([
                    'sender' => Auth::id(),
                    'recipient' => $recipient->id,
                    'content' => $content,
                    'notification_type' => config('default.notification.notification_type.friend'),
                    'status' => config('default.notification.status.not_seen'),
                    'objet_id' => Auth::id(),
                ]);
                $notification->avatar_sender = Auth::user()->avatar;
                broadcast(new ReceiveNotification($notification))->toOthers();
                DB::commit();
                return response()->json(['message' => 'Đã gửi lời mời kết bạn', 'friend' => $friend], 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    /**
     * @OA\Post(
     *     path="/api/confirm-request/{sender}",
     *     tags={"Friendship"},
     *     summary="Chấp nhận lời mời kết bạn",
     *     description="Chấp nhận một lời mời kết bạn từ một người dùng đã gửi lời mời.",
     *     @OA\Parameter(
     *         name="sender",
     *         in="path",
     *         required=true,
     *         description="ID của người gửi lời mời kết bạn.",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lời mời đã được chấp nhận thành công.",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Thông báo thành công."),
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Lỗi xảy ra khi chấp nhận lời mời.",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", description="Thông báo lỗi.")
     *         )
     *     ),
     * )
     */
    public function ConfirmFriendRequest(User $sender)
    {
        DB::beginTransaction();
        try {
            $user2 = Auth::id();
            Friend::where('user_id_1', $sender->id)
                ->where('user_id_2', $user2)
                ->update([
                    'status' => config('default.friend.status.accepted'),
                    'friendship_type' => config('default.friend.friendship_type.friend'),
                ]);
            $existingFriendship = Friend::where('user_id_1', $user2)
                ->where('user_id_2', $sender->id)
                ->first();
            if ($existingFriendship) {
                $existingFriendship->update([
                    'status' => config('default.friend.status.accepted'),
                    'friendship_type' => config('default.friend.friendship_type.friend'),
                ]);
            } elseif (!$existingFriendship) {
                Friend::create([
                    'user_id_1' => $user2,
                    'user_id_2' => $sender->id,
                    'status' => config('default.friend.status.accepted'),
                    'friendship_type' => config('default.friend.friendship_type.friend'),
                ]);
            }
            $content = Auth::user()->username . ' đã đồng ý lời mời kết bạn.';
            $notification = Notification::create([
                'sender' => Auth::id(),
                'recipient' => $sender->id,
                'content' => $content,
                'notification_type' => config('default.notification.notification_type.friend'),
                'status' => config('default.notification.status.not_seen'),
                'objet_id' => Auth::id(),
            ]);
            $notification->avatar_sender = Auth::user()->avatar;
            broadcast(new ReceiveNotification($notification))->toOthers();
            DB::commit();
            return response()->json(['message' => 'Đã chấp nhận'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    /**
     * @OA\Delete(
     *     path="/api/delete-request/{sender}",
     *     tags={"Friendship"},
     *     summary="Hủy lời mời kết bạn",
     *     description="Hủy lời mời kết bạn từ một người dùng khác hoặc từ chính bạn nếu nó tồn tại.",
     *     @OA\Parameter(
     *         name="sender",
     *         in="path",
     *         required=true,
     *         description="ID của người gửi lời mời kết bạn.",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lời mời đã được hủy thành công.",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", description="Thông báo thành công."),
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Lỗi xảy ra khi hủy lời mời hoặc không tìm thấy lời mời để hủy.",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", description="Thông báo lỗi."),
     *         )
     *     ),
     * )
     */
    public function DeleteFriendRequest(User $sender)
    {
        DB::beginTransaction();
        try {
            $user2 = Auth::id();
            $friendship = Friend::where(function ($query) use ($user2, $sender) {
                $query->where('user_id_1', $user2)
                    ->where('user_id_2', $sender->id);
            })->orWhere(function ($query) use ($user2, $sender) {
                $query->where('user_id_1', $sender->id)
                    ->where('user_id_2', $user2);
            })->first();

            if ($friendship) {
                $friendship->delete(); // Xóa lời mời kết bạn
                DB::commit();
                return response()->json(['message' => 'Đã hủy lời mời kết bạn'], 200);
            } else {
                DB::rollBack();
                return response()->json(['message' => 'Không tìm thấy lời mời để hủy'], 400);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/friend-list",
     *     tags={"Friendship"},
     *     summary="Lấy danh sách bạn bè",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách bạn bè",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="user_id_1", type="integer"),
     *                 @OA\Property(property="user_id_2", type="integer"),
     *                 @OA\Property(property="status", type="integer", description="Trạng thái bạn bè"),
     *                 @OA\Property(property="friendship_type", type="string", description="Loại mối quan hệ bạn bè"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật"),
     *                 @OA\Property(property="friend", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="username", type="string", description="Tên người bạn"),
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
     *             )
     *         )
     *     ),
     *     security={{ "bearerAuth": {} }}
     * )
     */
    public function FetchAllFriend($quantity = null)
    {
        $status = config('default.friend.status.accepted');
        $friends = Friend::where('user_id_1', Auth::id())->where('status', $status)->with('friend')->get();
        if ($quantity != null) {
            $currentPage = LengthAwarePaginator::resolveCurrentPage();
            $perPage = $quantity;
            $currentPageFriends = $friends->slice(($currentPage - 1) * $perPage, $perPage)->all();
            $friendsPaginated = new LengthAwarePaginator(
                $currentPageFriends,
                count($friends),
                $perPage,
                $currentPage,
                ['path' => LengthAwarePaginator::resolveCurrentPath()]
            );
            return response()->json($friendsPaginated);
        }
        return response()->json($friends);
    }

    /**
     * @OA\Get(
     *     path="/api/friend-list-request",
     *     tags={"Friendship"},
     *     summary="Lấy danh sách lời mời kết bạn",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách lời mời kết bạn",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="user_id_1", type="integer"),
     *                 @OA\Property(property="user_id_2", type="integer"),
     *                 @OA\Property(property="status", type="integer", description="Trạng thái bạn bè"),
     *                 @OA\Property(property="friendship_type", type="string", description="Loại mối quan hệ bạn bè"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật"),
     *                 @OA\Property(property="friend", type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="username", type="string", description="Tên người bạn"),
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
     *             )
     *         )
     *     ),
     *     security={{ "bearerAuth": {} }}
     * )
     */
    public function listFriendRequest($quantity = null)
    {
        $status = config('default.friend.status.pending');
        if ($quantity) {
            $friends = Friend::where('user_id_2', Auth::id())->where('status', $status)->paginate($quantity);
        } else {
            $friends = Friend::where('user_id_2', Auth::id())->where('status', $status)->get();
        }
        foreach ($friends as $friend) {
            $friend->friend = User::where('id', $friend->user_id_1)->first();
        }
        return response()->json($friends);
    }

    /**
     * @OA\Delete(
     *     path="/api/unfriend/{friend}",
     *     tags={"Friendship"},
     *     summary="Hủy kết bạn với người dùng khác",
     *     @OA\Parameter(
     *         name="friend",
     *         in="path",
     *         required=true,
     *         description="ID của người muốn hủy kết bạn",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Hủy kết bạn thành công",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", description="Thông báo hủy kết bạn thành công")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Không thể hủy kết bạn",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", description="Thông báo không thành công")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Lỗi xác thực",
     *     ),
     *     security={{ "bearerAuth": {} }}
     * )
     */
    public function unfriend($friend)
    {
        DB::beginTransaction();
        try {
            $self = Auth::id();
            if ($self == $friend) {
                throw new \Exception('Bạn không thể tự unfriend chính mình.');
            }
            $friendship = Friend::where(function ($query) use ($self, $friend) {
                $query->where('user_id_1', $self)
                    ->where('user_id_2', $friend)
                    ->where('status', 1);
            })->orWhere(function ($query) use ($self, $friend) {
                $query->where('user_id_1', $friend)
                    ->where('user_id_2', $self)
                    ->where('status', 1);
            })->get();
            $friendId1 = $friendship->pluck('user_id_1')->toArray();
            $friendId2 = $friendship->pluck('user_id_2')->toArray();
            if ($friendship) {
                Friend::whereIn('user_id_1', $friendId1)->whereIn('user_id_2', $friendId2)->delete();
                DB::commit();
                return response()->json(['message' => 'Đã hủy bạn bè'], 200);
            } else {
                DB::rollBack();
                return response()->json(['message' => 'Không thành công'], 400);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    // Trạng thái bạn bè 
    public function getFriendshipStatus($user_id2)
    {
        $self = Auth::id();
        $friendship = Friend::where(function ($query) use ($self, $user_id2) {
            $query->where('user_id_1', $self)
                ->where('user_id_2', $user_id2)
                ->where('status', 1);
        })->orWhere(function ($query) use ($self, $user_id2) {
            $query->where('user_id_1', $user_id2)
                ->where('user_id_2', $self)
                ->where('status', 1);
        })->first();
        if ($friendship) {
            return 'Bạn bè';
        } else {
            $friendshipRequest = Friend::where(function ($query) use ($self, $user_id2) {
                $query->where('user_id_1', $self)
                    ->where('user_id_2', $user_id2)
                    ->where('status', 0);
            })->first();

            if ($friendshipRequest) {
                return 'Đã gửi lời mời kết bạn';
            } else {
                return 'Không phải bạn bè';
            }
        }
    }
    public function getFriendSuggestions()
    {
        $self = Auth::user();
        // Lấy danh sách ID của những người đã gửi lời mời kết bạn cho người dùng hiện tại
        $friendIds = Friend::where('user_id_1', $self->id)
            ->whereIn('status', [
                config('default.friend.status.pending'),
                config('default.friend.status.accepted')
            ])
            ->pluck('user_id_2')
            ->toArray();
        $friendRequestsIds = Friend::where('user_id_2', $self->id)
            ->whereIn('status', [
                config('default.friend.status.pending'),
                config('default.friend.status.accepted')
            ])
            ->pluck('user_id_1')
            ->toArray();
        // Kết hợp danh sách ID của bạn bè và người đã gửi lời mời kết bạn
        $combinedIds = array_merge($friendIds, $friendRequestsIds);
        // Lấy gợi ý kết bạn dựa trên cùng một chuyên ngành và không phải là bạn bè hoặc người đã gửi lời mời kết bạn
        $friendSuggestions = User::where('major_id', $self->major_id)
            ->where('id', '!=', $self->id)
            ->whereNotIn('id', $combinedIds)
            ->get()
            ->map(function ($user) {
                $user->major_name = $user->major ? $user->major->name : null;
                unset($user->major);
                return $user;
            });

        return response()->json($friendSuggestions);
    }
}
