<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
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
    public function SendFriendRequest( User $recipient){
        DB::beginTransaction();
        try{
            $user1 = Auth::id();
            if ($user1 == $recipient->id) {
                return response()->json(['error' => 'Không thể gửi lời mời cho chính bạn'], 403);
            }
            $existingFriendship = Friend::where('user_id_1',$user1)->where('user_id_2',$recipient->id)->first();
            if ($existingFriendship) {
                // Nếu lời mời đã tồn tại và đang ở trạng thái "pending", hủy lời mời
                $status = config('default.friend.status.pending');
                if ($existingFriendship->status === $status ) {
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
                DB::commit();
                return response()->json(['message' => 'Đã gửi lời mời kết bạn','friend'=> $friend], 200);
            }
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()],400);
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
    try{
        $user2 = Auth::id();
         Friend::where('user_id_1',$sender->id)
        ->where('user_id_2',$user2)
        ->update([
            'status' => config('default.friend.status.accepted'),
            'friendship_type' => config('default.friend.friendship_type.friend'),
        ]);
        DB::commit();
        return response()->json(['message' => 'Đã chấp nhận' ],200);
    }catch(\Exception $e){
        DB::rollBack();
    return response()->json(['error' => $e->getMessage()],400);
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
    public function DeleteFriendRequest(User $sender){
    DB::beginTransaction();
    try{
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
    }catch(\Exception $e){
        DB::rollBack();
        return response()->json(['error' => $e->getMessage()],400);
    }
}
   /**
 * @OA\Get(
 *     path="/api/fetch-all-friends",
 *     tags={"Friendship"},
 *     summary="Lấy danh sách bạn bè",
 *     description="Lấy danh sách tất cả bạn bè đã chấp nhận lời mời kết bạn của người dùng hiện tại.",
 *     @OA\Response(
 *         response=200,
 *         description="Danh sách bạn bè đã chấp nhận lời mời kết bạn.",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="id", type="integer", format="int64", description="ID tài khoản người dùng"),
 *                 @OA\Property(property="username", type="string", description="Tên đăng nhập"),
 *                 @OA\Property(property="first_name", type="string", description="Họ"),
 *                 @OA\Property(property="last_name", type="string", description="Tên"),
 *                 @OA\Property(property="group_id", type="integer", format="int32", description="ID nhóm"),
 *                 @OA\Property(property="email", type="string", format="email", description="Địa chỉ email"),
 *                 @OA\Property(property="birthday", type="string", description="Ngày sinh"),
 *                 @OA\Property(property="avatar", type="string", description="Link đến ảnh đại diện"),
 *                 @OA\Property(property="phone", type="string", description="Số điện thoại"),
 *                 @OA\Property(property="address", type="string", description="Địa chỉ"),
 *                 @OA\Property(property="biography", type="string", description="Tiểu sử"),
 *                 @OA\Property(property="gender", type="string", description="Giới tính"),
 *                 @OA\Property(property="status", type="integer", format="int32", description="Trạng thái"),
 *                 @OA\Property(property="major_id", type="integer", format="int32", description="ID ngành học"),
 *                 @OA\Property(property="permissions", type="array", description="Danh sách quyền",
 *                     @OA\Items(type="string")
 *                 ),
 *                 @OA\Property(property="verification_code", type="string", description="Mã xác minh"),
 *                 @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật")
 *             )
 *         ),
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Không được phép truy cập.",
 *     ),
 * )
 */
    public function FetchAllFriend(){
        $status= config('default.friend.status.accepted');
        $friends = Friend::where('user_id_1',Auth::id())->where('status',$status)->with('friend')->get();
        return response()->json($friends);
    }
}