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
    public function ShowAllQa(Request $request)
    {
        DB::beginTransaction();
        try {
            $majorsId = $request->input('majors_id');
            $hashtag = $request->input('hashtag');
            $query = Qa::query();

            if ($majorsId) {
                $query->where('majors_id', $majorsId);
            }

            if ($hashtag) {
                $query->where('content', 'LIKE', '%' . $hashtag . '%');
            }

            $qas = $query->latest()->get();

            $result = [];

            foreach ($qas as $qa) {
                $likeCountsByEmotion = [];
                $likeCountsByEmotion['total_likes'] = $qa->likes->count();

                $likers = $qa->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });

                $emotions = $likers->pluck('emotion')->unique();

                foreach ($emotions as $emotion) {
                    $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                }
                // Tổng số bình luận + 3 bình luận demo
                $totalComment = Comment::where('qa_id', $qa->id)->count();
                $commentDemos = Comment::where('qa_id', $qa->id)->where('parent_id', 0)->limit(3)->get();
                foreach ($commentDemos as $commentDemo) {
                    $commentDemo->user;
                    //số lượng reply
                    $commentDemo->reply = Comment::where('qa_id', $qa->id)->where('parent_id', $commentDemo->id)->count();
                }
                $qaData = [
                    'qa' => $qa,
                    'like_counts_by_emotion' => $likeCountsByEmotion,
                    'total_comments' => $totalComment,
                    'comments' => $commentDemos,
                ];
                array_push($result, $qaData);
            }

            DB::commit();
            return response()->json($result, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    public function ListQa(Request $request)
    {
        $hashtag = $request->input('hashtag');
        $majorsId = $request->input('majors_id');
        $query = Qa::orderBy("created_at", "desc");
        if ($hashtag) {
            $query->where('hashtag', 'LIKE', '%' . $hashtag . '%');
        }
        if ($majorsId) {
            $query->where('majors_id', $majorsId);
        }
        $qa = $query->paginate(10);
        return response()->json($qa, 200);
    }

    public function CreateQa(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $qa = new Qa([
                'user_id' => Auth::id(),
                'title' => $data['title'],
                'content' => $data['content'],
                'majors_id' => $data['majors_id'],
            ]);
            if (isset($data['hashtag']) && !empty($data['hashtag'])) {
                // Tách chuỗi thành mảng các từ (dùng khoảng trắng để tách)
                $words = preg_split('/\s+/', $data['hashtag']);
                $hashtags = [];
                // Lọc các từ có dấu '#' ở đầu
                foreach ($words as $word) {
                    if (strpos($word, '#') === 0) {
                        $hashtags[] = $word;
                    }
                }
                // Giới hạn số lượng hashtag tối đa là 5
                $hashtags = array_slice($hashtags, 0, 5);
                $qa->hashtag = implode(',', $hashtags);
            }
            $qa->save();
            DB::commit();
            return response()->json($qa, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    public function UpdateQa(Request $request, Qa $qa)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            if (isset($data['hashtag']) && !empty($data['hashtag'])) {
                $words = preg_split('/\s+/', $data['hashtag']);
                $hashtags = [];
                // Lọc các từ có dấu '#' ở đầu
                foreach ($words as $word) {
                    if (strpos($word, '#') === 0) {
                        $hashtags[] = $word;
                    }
                }
                // Giới hạn số lượng hashtag tối đa là 5
                $hashtags = array_slice($hashtags, 0, 5);
                $qa->hashtag = implode(',', $hashtags);
            }
            $qa->update([
                'title' => $data['title'],
                'content' => $data['content'],
                'majors_id' => $data['majors_id'],
            ]);
            $qa->save();
            DB::commit();
            return response()->json($qa, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    public function DeleteQa(Qa $qa)
    {
        DB::beginTransaction();
        try {
            if (Auth::check() && Auth::user()->id === $qa->user_id) {
                Comment::where('qa_id', $qa->id)->delete();
                Like::where('qa_id', $qa->id)->delete();
                $qa->likes()->delete();
                $qa->comments()->delete();
                $qa->delete();
                DB::commit();
                return response()->json(['message' => 'Bài Q&a đã bị xóa thành công.'], 200);
            } else {
                DB::rollBack();
                return response()->json(['message' => 'Bạn không có quyền này']);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}
