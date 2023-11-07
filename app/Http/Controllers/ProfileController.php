<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Qa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\FuncCall;

class ProfileController extends Controller
{

    public function DetailProfileUser(User $user) {
        DB::beginTransaction();
        try{
            // $user = Auth::user();
            $countposts = $user->posts->count();
            $countblogs  =$user->blogs->count();
            $countfriends = $user->friends->count();
            $major=$user->major;
            $profileData = [
                'user' =>[
                    'id'=>$user->id,
                    'username'=>$user->username,
                    'avatar'=>$user->avatar,
                    'major'=>$major->majors_name
                ],
                'total_post' => $countposts,
                'total_blog' => $countblogs,
                'total_friend' => $countfriends,
            ];
            DB::commit();
            return response()->json($profileData);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()],400);
        }
    }
    

    public function Profile(User $user, $type, $status = null)
    {
        DB::beginTransaction();
        try {
            $loggedInUser = Auth::user();
            $result = [];
            switch ($type) {
                // Lấy post với friend và images
                case 'post':
                    // Lấy danh sách bạn bè của người dùng
                    $friends = $user->friends;
                    // Lấy danh sách bài viết của người dùng
                    $postsQuery = Post::where('user_id', $user->id)->orderBy('created_at', 'DESC');
                        if ($user->id != $loggedInUser->id) {
                            $postsQuery->where('status', 0);
                        }
                    $posts = $postsQuery->paginate(10);
                    $images = [];
                    foreach ($posts as $post) {
                        // Lấy danh sách ảnh của bài viết
                        $postImages = $post->images;
                        if (!is_null($postImages)) {
                            foreach ($postImages as $image) {
                                $images[] = $image;
                            }
                        }
                        // Lấy tất cả like của bài viết
                        $likeCountsByEmotion = [];
                        $likeCountsByEmotion['total_likes'] = $post->likes->count();
                        $likers = $post->likes->map(function ($like) {
                            return [
                                'user' => $like->user,
                                'emotion' => $like->emotion,
                            ];
                        });
                        $emotions = $likers->pluck('emotion')->unique();
                        $emotionLikeCounts = [];
                        foreach ($emotions as $emotion) {
                            $emotionLikeCounts[$emotion] = $likers->where('emotion', $emotion)->count();
                        }
                        // Tổng số bình luận + 3 bình luận demo
                        $totalComment = Comment::where('post_id', $post->id)->count();
                        $commentDemos = Comment::where('post_id', $post->id)->where('parent_id', 0)->limit(3)->get();
                        foreach ($commentDemos as $commentDemo) {
                            $commentDemo->user;
                            // Số lượng reply
                            $commentDemo->reply = Comment::where('post_id', $post->id)->where('parent_id', $commentDemo->id)->count();
                        }
                        $postData = [
                            'user' => [
                                'username'=>$user->username,
                                'avatar'=>$user->avatar
                            ],
                            'images' => $images,
                            'friends' => $friends,
                            'post' => $post,
                            'like_counts_by_emotion' => $likeCountsByEmotion,
                            'emotion_like_counts' => $emotionLikeCounts,
                            'total_comments' => $totalComment,
                            'democomments' => $commentDemos,
                        ];
                        array_push($result, $postData);
                    }
                    break;
                // Load blog
                case 'blog':
                    $status = request('status')??'approved';
                    $statuses = config('default.blog.status');
                    if (in_array($status, array_keys($statuses))) {
                        // Xử lý logic cho trường hợp 'blog' dựa trên trạng thái (pending , approved , reject)
                        $statusValue = $statuses[$status];
                        $query = Blog::where('user_id', $loggedInUser->id)->where('status', $statusValue)->orderBy('created_at', 'DESC');
                        $blogs = $query->paginate(10);
                        if ($blogs->isEmpty()) {
                            $message = "Không có blog với trạng thái $status";
                            return response()->json(['data' => [], 'message' => $message], 200);
                        }
                        $blogData = [
                            'blog' => $blogs,
                        ];
                        array_push($result, $blogData);
                    } else {
                        return response()->json(['error' => 'Trạng thái không hợp lệ'], 400);
                    }
                    break;
                // Load qa
                case 'qa':
                    $qas = Qa::where('user_id', $loggedInUser->id)->orderBy('created_at', 'DESC')->paginate(10);
                    if ($qas->isEmpty()) {
                        return response()->json(['data' => [], 'message' => 'Không có bài viết'], 200);
                    }
                    $qaData = [
                        'qa' => $qas,
                    ];
                    array_push($result, $qaData);
                    break;
            }
            DB::commit();
            return response()->json(['data' => $result],200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function UpdateAvatarForUser(Request $request){
        $user = Auth::user();
        $avatar =$request->input('avatar');
        $user->avatar = $avatar;
        $user->update();
        $post = new Post([
            'user_id'=> $user->id,
            'content' => " ",
            'image' => json_encode($avatar),
        ]);
        $post->save();
        return response()->json(['data'=> [$user,$post], 'message'=> 'Thêm ảnh đại diện thành công'],200);
    }
    public function UpdateCoverPhotoForUser(Request $request){
        $user = Auth::user();
        $cover_photo =$request->input('cover_photo');
        $user->cover_photo = $cover_photo;
        $user->update();
        $post = new Post([
            'user_id'=> $user->id,
            'content' => " ",
            'image' => json_encode($cover_photo),
        ]);
        $post->save();
        return response()->json(['data'=> [$user,$post], 'message'=> 'Thêm ảnh đại diện thành công'],200);
        
    }
    public function updateProfile(Request $request)
{
    DB::beginTransaction();
    try {
        $user = Auth::user();

        // Retrieve input data
        $inputData = $request->except('password');
        
        if ($request->input('avatar')) {
           
            $inputData['avatar'] = $request->input('avatar');
        } else {
            // Nếu không có tệp tin avatar mới, giữ nguyên giá trị avatar hiện có
            $inputData['avatar'] = $user->avatar;
        }
        
        $user->update($inputData);
        DB::commit();
        return response()->json($user, 200);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['error' => $e->getMessage()], 400);
    }
}
   
    public function getInfoUser()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }
            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}