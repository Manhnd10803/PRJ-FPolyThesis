<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Qa;

class AdminQaController extends Controller
{
    public function index()
    {
        $qas = Qa::all();
        return view('admin.qa.index', compact('qas'));
    }
    public function show(Qa $qa)
    {
        $likes = $qa->likes;
        $comments = $qa->comments;

        $emotionCounts = [];
        $validEmotions = ['dislike', 'like', 'love', 'haha', 'wow', 'sad', 'angry'];
        // Đếm số lượng từng trạng thái lượt thích
        foreach ($validEmotions as $emotion) {
            $emotionCounts[$emotion] = $likes->where('emotion', $emotion)->count();
        }
        return view('admin.qa.show', [
            'qa' => $qa,
            'likeCounts' => $emotionCounts,
            'commentCount' => $comments->count(),
        ]);
    }
    public function destroy(Qa $qa)
    {
        $qa->delete();
        return redirect()->route('admin.qa.index')->with('success', 'Xóa câu hỏi thành công.');
    }
}