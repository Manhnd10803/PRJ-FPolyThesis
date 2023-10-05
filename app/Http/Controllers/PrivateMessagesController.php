<?php

namespace App\Http\Controllers;

use App\Events\PrivateMessageSent;
use App\Models\PrivateMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PrivateMessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //lấy tất cả dữ liệu về cuộc trò chuyện của user đang đăng nhập với người dùng khác
        $user = Auth::user();
        $messages = PrivateMessage::where('sender_id',$user->id)->with('receiver')->get();
        return response()->json($messages);
    }
    public function store(Request $request)
    {   
        $user  =Auth::user();
        $message = new PrivateMessage([
            'sender_id' => $user->id,
            'receiver_id' => $request->input('receiver_id'),
            'content' => $request->input('content'),
        ]);
        $message->save();
        broadcast(new PrivateMessageSent($message))->toOthers();
        return response()->json(['message' => 'Tin nhắn đã được gửi'], 200); 
    }
    public function update(Request $request, string $id)
    {
        
    }

    public function destroy(string $id)
    {
        
    }
}
