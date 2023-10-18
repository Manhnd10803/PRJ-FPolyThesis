<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Qa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QaController extends Controller
{
  public function CreateQa(Request $request){
    DB::beginTransaction();
    try{
        $data = $request->all();
      
       $qa = new Qa([
        'user_id' => Auth::id(),
        'title' => $data['title'],
        'content' => $data['content'],
        'majors_id' => $data['majors_id'],
        'hashtag' => $data['hashtag'],
       ]);
       $qa->save();
       DB::commit();
       return response()->json($qa, 200);
    }catch(\Exception $e){
        DB::rollBack();
        return response()->json(['errors' => $e->getMessage()], 400);
    }
  }
public function UpdateQa(Request $request, Qa $qa) {
    DB::beginTransaction();
    try {
        $data = $request->all();
        $qa->update([
            'title' => $data['title'],
            'content' => $data['content'],
            'majors_id' => $data['majors_id'],
            'hashtag' => $data['hashtag'],
        ]);
        $qa->save();
        DB::commit();
        return response()->json($qa, 200);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['errors' => $e->getMessage()], 400);
    }
}
public function DeleteQa(Qa $qa){
    DB::beginTransaction();
    try {
        if(Auth::check() && Auth::user()->id === $qa->user_id){
        Comment::where('qa_id', $qa->id)->delete();
        Like::where('qa_id',$qa->id)->delete();
        $qa->likes()->delete();
        $qa->comments()->delete();
        $qa->delete();
        DB::commit();
        return response()->json(['message' => 'Bài Q&a đã bị xóa thành công.'], 200);
        }else{
             DB::rollBack();
            return response()->json(['message' => 'Bạn không có quyền này']);
        }
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['errors' => $e->getMessage()], 400);
    }
}

}