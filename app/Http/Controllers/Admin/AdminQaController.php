<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Qa;
use App\Models\Major;

class AdminQaController extends Controller
{
    public function __construct()
    {
        $this->middleware('authAdmin');
    }
   
    public function searchQa(Request $request)
    {
        $request->flash();
        $majors = Major::all();

        $query = Qa::query();

        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->input('title') . '%');
        }

        if ($request->has('creator')) {
            $query->whereHas('user', function ($userQuery) use ($request) {
                $userQuery->where('username', 'like', '%' . $request->input('creator') . '%');
            });
        }

        if ($request->filled('major')) {
            $query->where('majors_id', $request->input('major'));
        }

        if ($request->filled('hashtag')) {
            $query->where('hashtag', 'like', '%' . $request->input('hashtag') . '%');
        }

        $qas = $query->get();

        return view('admin.qa.index', compact('qas', 'majors'));
    }

    public function index()
    {
        $majors = Major::all();
        $qas = Qa::all();
        return view('admin.qa.index', compact('qas', 'majors'));
    }
    public function show(Qa $qa)
    {
        // $likes = $qa->likes;
        // $comments = $qa->comments;

        // $emotionCounts = [];
        // $validEmotions = ['dislike', 'like', 'love', 'haha', 'wow', 'sad', 'angry'];
        // // Đếm số lượng từng trạng thái lượt thích
        // foreach ($validEmotions as $emotion) {
        //     $emotionCounts[$emotion] = $likes->where('emotion', $emotion)->count();
        // }
        // return view('admin.qa.show', [
        //     'qa' => $qa,
        //     'likeCounts' => $emotionCounts,
        //     'commentCount' => $comments->count(),
        // ]);
        
        $qa = Qa::with('user', 'likes', 'comments')->find($qa->id);
        // Calculate like, dislike, and comment counts
        $qa->like_count = $qa->likes->where('emotion', 'like')->count();
        $qa->dislike_count = $qa->likes->where('emotion', 'dislike')->count();
        $qa->comment_count = $qa->comments->count();
        return view('admin.qa.show', compact('qa'));
    }
    public function showWithUser(Qa $qa)
    {
        $qa = Qa::with('user', 'likes', 'comments')->find($qa->id);
        // Calculate like, dislike, and comment counts
        $qa->like_count = $qa->likes->where('emotion', 'like')->count();
        $qa->dislike_count = $qa->likes->where('emotion', 'dislike')->count();
        $qa->comment_count = $qa->comments->count();
        return view('admin.qa.show-with-user', compact('qa'));
    }
    public function destroy(Qa $qa)
    {
        $qa->delete();
        return redirect()->route('admin.qa.index')->with('success', 'Xóa câu hỏi thành công.');
    }
}
