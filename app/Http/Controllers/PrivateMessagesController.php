<?php

namespace App\Http\Controllers;

use App\Events\MessageDeleted;
use App\Events\PrivateMessageSent;
use App\Models\PrivateMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

class PrivateMessagesController extends Controller
{

    public function ShowAllMessage()
    {
        $messages = PrivateMessage::where('sender_id',Auth::id())->with('receiver')->get();
        return response()->json($messages);
    }
    public function SendMessages(Request $request)
    {   
        $senderID  = Auth::id();
        $receiverId =$request->input('receiver_id');
        $content = $request->input('content');
        $message = new PrivateMessage([
            'sender_id' => $senderID,
            'receiver_id' =>$receiverId ,
            'content' => $content,
        ]);
        $message->save();
        broadcast(new PrivateMessageSent($message))->to("private-chat.{$receiverId}");

        return response()->json(['message' => 'Tin nhắn đã được gửi'], 200); 
    }
    public function UpdateMessage(Request $request, PrivateMessage $privateMessage)
    {
        $privateMessage->update([
            'content' => $request->input('content')
        ]);
        return response()->json(['message' => 'Tin nhắn đã được cập nhật',$privateMessage], 200);
    }
    public function DeleteMessage( PrivateMessage $privateMessage)
    {
        $privateMessage->delete();
        broadcast(new MessageDeleted($privateMessage->id))->toOthers();
        return response()->json(['message' => 'Tin nhắn đã được xóa'], 200);
    }
    
}