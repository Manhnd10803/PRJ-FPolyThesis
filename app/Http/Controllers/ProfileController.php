<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Qa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\FuncCall;
use PhpParser\Node\Stmt\Break_;
use Spatie\Activitylog\Models\Activity;

class ProfileController extends Controller
{

    public function DetailProfileUser(User $user)
    {
        DB::beginTransaction();
        try {
            $user = User::withCount(['posts', 'blogs', 'friends'])->find($user->id);

            $countposts = $user->posts_count;
            $countblogs = $user->blogs_count;
            $countfriends = $user->friends_count;
            $major = $user->major;
            $profileData = [
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'avatar' => $user->avatar,
                    'major' => $major->majors_name,
                    'cover_photo' => $user->cover_photo,
                    'birthday' => $user->birthday,
                    'bio' => $user->biography,
                    'score' => $user->score,
                ],
                'total_post' => $countposts,
                'total_blog' => $countblogs,
                'total_friend' => $countfriends,
            ];
            DB::commit();
            return response()->json($profileData);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
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
                    $friendDetails = [];

                    // Duyệt qua danh sách bạn bè để lấy thông tin ID, firstname, lastname và avatar
                    foreach ($friends as $friend) {
                        $friendInfo = [
                            'id' => $friend->id,
                            'first_name' => $friend->first_name,
                            'last_name' => $friend->last_name,
                            'avatar' => $friend->avatar,
                        ];
                        // Thêm thông tin của người bạn vào mảng friendDetails
                        $friendDetails[] = $friendInfo;
                    }
                    // Lấy danh sách bài viết của người dùng
                    $postsQuery = Post::where('user_id', $user->id)->orderBy('created_at', 'DESC');
                    //lấy bạn bè của người dùng
                    $loginfriends = $loggedInUser->friends;
                    $friendIds = $loginfriends->pluck('id')->toArray();
                    //nếu không phải người đăng nhập
                    if ($user->id != $loggedInUser->id) {
                        //nhưng là bạn bè
                        if (in_array($user->id, $friendIds)) {
                            // Nếu là bạn bè, lấy các bài viết có status là 0 và 1
                            $postsQuery->whereIn('status', [0, 1]);
                            //không phải bạn bè
                        } else {
                            // Nếu không phải là bạn bè, lấy các bài viết có status là 0
                            $postsQuery->where('status', 0);
                        }
                    } elseif ($user->id == $loggedInUser->id) {
                        $postsQuery->whereIn('status', [0, 1, 2]);
                    }
                    $images = [];
                    $postList = $postsQuery->get();
                    foreach ($postList as $post) {
                        $postImages = $post->image;
                        if (!is_null($postImages) && is_array($postImages)) {
                            foreach ($postImages as $image) {
                                $images[] = $image;
                            }
                        } elseif (!is_null($postImages) && is_string($postImages)) {
                            if ($postImages == "null") {
                                continue;
                            }
                            $images[] = $postImages;
                        }
                    }
                    $allImageUrls = [];
                    foreach ($images as $imageString) {
                        // Xử lý chuỗi JSON để lấy danh sách URL hình ảnh
                        $imageArray = json_decode($imageString);

                        // Kiểm tra nếu là một chuỗi JSON hợp lệ
                        if (json_last_error() === JSON_ERROR_NONE && is_array($imageArray)) {
                            foreach ($imageArray as $imageUrl) {
                                // Xử lý các đường dẫn hình ảnh và thêm vào mảng tất cả các đường dẫn
                                $imageUrl = str_replace(['\\"', '"'], ['', ''], $imageUrl); // Loại bỏ ký tự \ và "
                                $allImageUrls[] = $imageUrl;
                            }
                        } else {
                            // Nếu không phải là chuỗi JSON, xử lý trực tiếp URL và thêm vào mảng
                            $imageUrl = str_replace(['\\"', '"'], ['', ''], $imageString); // Loại bỏ ký tự \ và "
                            $allImageUrls[] = $imageUrl;
                        }
                    }

                    $posts = $postsQuery->with(['likes.user', 'comments'])->paginate(5);
                    $listPost = [];
                    foreach ($posts as $post) {
                        // Lấy tất cả like của bài viết
                        $likeCountsByEmotion = [];
                        $likeCountsByEmotion['total_likes'] = $post->likes->count();
                        $likers = $post->likes->map(function ($like) {
                            return [
                                'user' => $like->user,
                                'user_id' => $like->user->id,
                                'emotion' => $like->emotion,
                            ];
                        });
                        $emotions = $likers->pluck('emotion')->unique();
                        foreach ($emotions as $emotion) {
                            $likeCountsByEmotion[$emotion] = $likers->where('emotion', $emotion)->count();
                        }
                        // Count the total number of comments associated with the post
                        $totalComment = $post->comments->count();

                        // Get the first 3 top-level comments
                        $commentDemos = $post->comments->where('parent_id', 0)->take(3);

                        // For each of these comments
                        foreach ($commentDemos as $commentDemo) {
                            // Load the associated user
                            $commentDemo->user;

                            // Count the number of replies to the comment
                            $commentDemo->reply = $post->comments->where('parent_id', $commentDemo->id)->count();
                        }
                        $postData = [
                            'post' => $post,
                            'like_counts_by_emotion' => $likeCountsByEmotion,
                            'liker' => $likers,
                            'total_comments' => $totalComment,
                            'comments' => $commentDemos,
                        ];
                        array_push($listPost, $postData);
                    }
                    $detailTimeline = [
                        'user' => [
                            'id' => $user->id,
                            'first_name' => $user->first_name,
                            'last_name' => $user->last_name,
                            'avatar' => $user->avatar,
                        ],
                        'friend_details' => $friendDetails,
                        'images' => $allImageUrls,
                    ];

                    DB::commit();
                    return response()->json([
                        'datas' => $listPost, 'current_page' => $posts->currentPage(),
                        'last_page' => $posts->lastPage(), 'detailTimeline' => $detailTimeline
                    ], 200);
                    break;
                    // Load blog
                case 'blog':
                    $status = request('status') ?? 'approved';
                    $statuses = config('default.blog.status');
                    if (in_array($status, array_keys($statuses))) {
                        $statusValue = $statuses[$status];
                        $blogs = Blog::where('user_id', $loggedInUser->id)
                            ->where('status', $statusValue)
                            ->orderBy('created_at', 'DESC')
                            ->paginate(7);

                        if ($blogs->isEmpty()) {
                            $message = "Không có blog với trạng thái $status";
                            return response()->json(['data' => [], 'message' => $message], 200);
                        }

                        $data = [
                            'datas' => $blogs->items(),
                            'current_page' => $blogs->currentPage(),
                            'last_page' => $blogs->lastPage(),
                        ];

                        return response()->json($data, 200);
                    } else {
                        return response()->json(['error' => 'Trạng thái không hợp lệ'], 400);
                    }
                    break;
                case 'qa':
                    $qas = Qa::where('user_id', $loggedInUser->id)->orderBy('created_at', 'DESC')->paginate(7);
                    if ($qas->isEmpty()) {
                        return response()->json(['data' => [], 'message' => 'Không có bài viết'], 200);
                    }
                    $data = [
                        'datas' => $qas->items(),
                        'current_page' => $qas->currentPage(),
                        'last_page' => $qas->lastPage(),
                    ];

                    return response()->json($data, 200);
                    break;
                case 'commentedQuestions':
                    $perPage = 7;
                    $commentedQas = Comment::select('qa_id')
                        ->where('user_id', $loggedInUser->id)
                        ->whereNotNull('qa_id')
                        ->with(['qa' => function ($query) {
                            $query->select('id', 'title', 'user_id', 'updated_at');
                        }])
                        ->orderBy('qa_id')
                        ->orderBy('created_at', 'DESC')
                        ->get();

                    $groupedQas = $commentedQas->groupBy('qa_id');
                    $uniqueQas = $groupedQas->map(function ($items) {
                        return [
                            'id' => $items->first()->qa_id,
                            'title' => $items->first()->qa->title,
                            'user_id' => $items->first()->qa->user_id,
                            'updated_at' => $items->first()->qa->updated_at,
                        ];
                    });

                    $filteredQas = $uniqueQas->filter(function ($item) use ($loggedInUser) {
                        $userIdOfQa = $item['user_id'];
                        return $userIdOfQa !== $loggedInUser->id;
                    });

                    $page = request()->get('page', 1);
                    $paginatedQas = new LengthAwarePaginator(
                        $filteredQas->forPage($page, $perPage),
                        $filteredQas->count(),
                        $perPage,
                        $page,
                        ['path' => request()->url(), 'query' => request()->query()]
                    );

                    $data = [
                        'datas' => $paginatedQas->values()->all(),
                        'current_page' => $paginatedQas->currentPage(),
                        'last_page' => $paginatedQas->lastPage(),
                    ];
                    return response()->json($data, 200);
                    break;
            }
            DB::commit();
            return response()->json(['data' => $result], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function UpdateAvatarForUser(Request $request)
    {
        $user = Auth::user();
        $avatar = $request->input('avatar');
        $user->avatar = $avatar;
        $user->update();
        $post = new Post([
            'user_id' => $user->id,
            'content' => " ",
            'image' => json_encode($avatar),
        ]);
        $post->save();
        activity('users')
            ->tap(function (Activity $activity) use ($avatar) {
                $activity->subject_type = class_basename(User::class); // Lấy tên lớp của đối tượng $user
                $activity->subject_id = Auth::id();
                $activity->properties = $avatar;
                $activity->event = 'updated';
            })
            ->log('User has been updated');
        activity('posts')
            ->tap(function (Activity $activity) use ($post) {
                $activity->properties = $post;
                $activity->event = 'created';
            })
            ->log('User has been created');
        return response()->json(['data' => [$user, $post], 'message' => 'Thêm ảnh đại diện thành công'], 200);
    }
    public function UpdateCoverPhotoForUser(Request $request)
    {
        $user = Auth::user();
        $cover_photo = $request->input('cover_photo');
        $user->cover_photo = $cover_photo;
        $user->update();
        $post = new Post([
            'user_id' => $user->id,
            'content' => " ",
            'image' => json_encode($cover_photo),
        ]);
        $post->save();
        activity('users')
            ->tap(function (Activity $activity) use ($cover_photo) {
                $activity->properties = $cover_photo;
                $activity->event = 'updated';
            })
            ->log('User has been updated');
        activity('posts')
            ->tap(function (Activity $activity) use ($post) {
                $activity->properties = $post;
                $activity->event = 'created';
            })
            ->log('User has been created');
        return response()->json(['message' => 'Cập nhật ảnh bìa thành công'], 200);
    }
    public function updateProfile(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $inputData = $request->except('password');
            if ($request->input('avatar')) {
                $inputData['avatar'] = $request->input('avatar');
            } else {
                $inputData['avatar'] = $user->avatar;
            }
            $user->update($inputData);
            activity('users')
                ->tap(function (Activity $activity) use ($user) {
                    $activity->properties = $user;
                    $activity->event = 'updated';
                })
                ->log('User has been updated');
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
