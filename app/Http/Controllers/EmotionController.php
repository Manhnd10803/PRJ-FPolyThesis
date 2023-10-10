<?php

namespace App\Http\Controllers;

use App\Models\Emotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmotionController extends Controller
{
    public function CreateEmotion(Request $request){
        DB::beginTransaction();
       try{
        $icon = $request->file('images');
        if(!$icon->isValid() || !in_array($icon->getClientOriginalExtension(),['jpg','jpeg','png','gif'])){
            return response()->json('error', 'Tệp tin không hợp lệ. Chỉ chấp nhận tệp tin JPEG , JPG hoặc PNG.');
        }
        $iconPath = time() . '.' . $icon->extension();
        $icon->move(storage_path('app/public'),$iconPath);
        $emotion = new Emotion([
            'icon' => $iconPath,
        ]);
        $emotion->save();
        DB::commit();
        return response()->json($emotion,200);
       }catch(\Exception $e){
        DB::rollBack();
        return response()->json(['errors'=> $e->getMessage()], 400);
       }
    }
}
