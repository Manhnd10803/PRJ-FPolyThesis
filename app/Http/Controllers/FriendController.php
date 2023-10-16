<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    //
    public function SendFriendRequest( User $recipient){
        DB::beginTransaction();
        try{
            $user1 = Auth::id();
            $existingFriendship = Friend::where('user_id_1',$user1)->where('user_id_2',$recipient)->first();
            if($existingFriendship){
                DB::rollBack();
                return response()->json($existingFriendship->status);
            }
            Friend::create([
                'user_id_1' => $user1,
                'user_id_2' => $recipient,
                'status' => config('default.friend.status.pending'),
                'friendship_type' => config('default.friend.friendship_type.request')
            ]);
            DB::commit();
            return response()->json(['message' => 'Đã gửi lời mời kết bạn'],200);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()],400);
        }
    }
    public function ConfirmFriendRequest(User $sender)
{
    DB::beginTransaction();
    try{
        $status = config('default.friend.status.accepted');
        $type = config('default.friend.friendship_type.friend');
        $user2 = Auth::id();
        Friend::where('user_id_1',$sender->id)
        ->where('user_id_2',$user2)
        ->update([
            'status' => $status,
            'friendship_type' => $type,
        ]);
        DB::commit();
        return response()->json(['message' => 'Đã chấp nhận'],200);
    }catch(\Exception $e){
        DB::rollBack();
    return response()->json(['error' => $e->getMessage()],400);
    }
}
public function UpdateFriendshipType(User $friend)
{
    DB::beginTransaction();
    try{
        $friendship = Friend::where('user_id_1', Auth::id())
        ->where('user_id_2', $friend->id)->first();
        if ($friendship) {
        $type1 = config('default.friend.friendship_type.friend');
        $type2 = config('default.friend.friendship_type.favourite');
        if($friendship->friendship_type == $type1){
            $friendship->update([
            'friendship_type' => $type2,
            ]);
        }elseif($friendship->friendship_type == $type2){
            $friendship->update([
            'friendship_type' => $type1,
            ]);
        }
        DB::commit();
        return response()->json(['message' => ' Mối quan hệ bạn bè đã được cập nhật'],200);
    }else{
        return response()->json(['message' => 'Không tìm thấy mối quan hệ bạn bè.'], 404);
        }
    }catch(\Exception $e){
        DB::rollBack();
        return response()->json(['error'=> $e->getMessage()],400);
    }
}
    public function FetchAllFriend(){
        $status= config('default.friend.status.accepted');
        $friends = Friend::where('user_id_1',Auth::id())->where('status',$status)->with('friend')->get();
        return response()->json($friends);
    }
}