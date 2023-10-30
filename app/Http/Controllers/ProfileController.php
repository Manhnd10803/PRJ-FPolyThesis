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

class ProfileController extends Controller
{
      
    public function Profile(){
        
    }
/**
 * @OA\Get(
 *     path="/api/profile/posts/{user}",
 *     summary="Hiển thị thông tin người dùng và bài viết",
 *     tags={"Profile"},
 *     @OA\Parameter(
 *         name="user",
 *         in="path",
 *         description="ID của người dùng",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Thông tin người dùng và các bài viết",
 *         @OA\JsonContent(
 *             type="object", 
 *             @OA\Property(property="users", type="object",
 *                 @OA\Property(property="id", type="integer", format="int64", description="ID tài khoản người dùng"),
 *                 @OA\Property(property="username", type="string", description="Tên đăng nhập"),
 *                 @OA\Property(property="first_name", type="string", description="Họ"),
 *                 @OA\Property(property="last_name", type="string", description="Tên"),
 *                 @OA\Property(property="group_id", type="integer", format="int32", description="ID nhóm"),
 *                 @OA\Property(property="email", type="string", format="email", description="Địa chỉ email"),
 *                 @OA\Property(property="birthday", type="string", description="Ngày sinh"),
 *                 @OA\Property(property="avatar", type="string", description="Link đến ảnh đại diện"),
 *                 @OA\Property(property="phone", type="string", description="Số điện thoại"),
 *                 @OA\Property(property="address", type="string", description="Địa chỉ"),
 *                 @OA\Property(property="biography", type="string", description="Tiểu sử"),
 *                 @OA\Property(property="gender", type="string", description="Giới tính"),
 *                 @OA\Property(property="status", type="integer", format="int32", description="Trạng thái"),
 *                 @OA\Property(property="major_id", type="integer", format="int32", description="ID ngành học"),
 *                 @OA\Property(property="permissions", type="array", description="Danh sách quyền",
 *                     @OA\Items(type="string")
 *                 ),
 *                 @OA\Property(property="verification_code", type="string", description="Mã xác minh"),
 *                 @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật"),
 *                 @OA\Property(property="posts", type="object",
 *                     @OA\Property(property="id", type="integer", description="id bài viết"),
 *                     @OA\Property(property="user_id", type="integer", description="id người đăng"),
 *                     @OA\Property(property="content", type="string", description="Nội dung"),
 *                     @OA\Property(property="feeling", type="string", description="cảm giác vd: cảm thấy vui vẻ"),
 *                     @OA\Property(property="image", type="string", description="ảnh bài viết"),
 *                     @OA\Property(property="hashtag", type="string", description="HashTag liên quan đến post"),
 *                     @OA\Property(property="status", type="integer", description="trạng thái bài viết vd ẩn hoặc hiện"),
 *                     @OA\Property(property="views", type="integer", description="Số lượt xem"),
 *                     @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
 *                     @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
 *                     @OA\Property(property="likes", type="array",
 *                         @OA\Items(
 *                             @OA\Property(property="id", type="integer"),
 *                             @OA\Property(property="user_id", type="integer"),
 *                             @OA\Property(property="emotion", type="string"),
 *                             @OA\Property(property="post_id", type="integer"),
 *                             @OA\Property(property="blog_id", type="integer"),
 *                             @OA\Property(property="qa_id", type="integer"),
 *                             @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
 *                             @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
 *                             @OA\Property(property="user", type="object",
 *                                 @OA\Property(property="id", type="integer"),
 *                                 @OA\Property(property="username", type="string"),
 *                                 @OA\Property(property="first_name", type="string", nullable=true),
 *                                 @OA\Property(property="last_name", type="string", nullable=true)
 *                             )
 *                         )
 *                     ),
 *                     @OA\Property(property="like_counts_by_emotion", type="object",
 *                         @OA\Property(property="total_likes", type="integer", description="Tổng số lượt thích"),
 *                         @OA\Property(property="emotion1", type="integer", description="Số lượt thích với emotion1"),
 *                         @OA\Property(property="emotion2", type="integer", description="Số lượt thích với emotion2")
 *                     ),
 *                     @OA\Property(property="total_comments", type="integer", description="Tổng số bình luận"),
 *                     @OA\Property(property="comments", type="array",
 *                         @OA\Items(
 *                             @OA\Property(property="id", type="integer"),
 *                             @OA\Property(property="user_id", type="integer"),
 *                             @OA\Property(property="content", type="string", description="Nội dung bình luận"),
 *                             @OA\Property(property="parent_id", type="integer"),
 *                             @OA\Property(property="post_id", type="integer"),
 *                             @OA\Property(property="blog_id", type="integer"),
 *                             @OA\Property(property="qa_id", type="integer"),
 *                             @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
 *                             @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
 *                             @OA\Property(property="reply", type="integer", description="Số lượng reply"),
 *                             @OA\Property(property="user", type="object",
 *                                 @OA\Property(property="id", type="integer"),
 *                                 @OA\Property(property="username", type="string"),
 *                                 @OA\Property(property="first_name", type="string", nullable=true),
 *                                 @OA\Property(property="last_name", type="string", nullable=true)
 *                             )
 *                         )
 *                     )
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Lỗi trong quá trình xử lý",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="errors", type="string")
 *         )
 *     )
 * )
 */
    public function ShowPostProfile(User $user)
    {
        DB::beginTransaction();
        try {
            $loggedInUser = Auth::user();
            // truy vấn lấy tất cả bài viết (Nếu là user đang đăng nhập) và nếu là người dùng khác xem tcn (Hiển thị bài viết được hiển thị (Status =0) Status =1 (ẩn)) 
            $postsQuery = Post::where('user_id', $user->id)
            ->where(function ($query) use ($user, $loggedInUser) {
                if ($user->id != $loggedInUser->id) {
                    $query->where('status', 0);
                }
            })->orderBy('created_at', 'DESC');        
            $posts = $postsQuery->paginate(10);
            $result = [];
            foreach ($posts as $post) {
                // Tính toán số lượt like cho bài viết
                $likeCount = $post->likes->count();
                // Tính toán số lượng comment cho bài viết
                $commentCount = Comment::where('post_id', $post->id)->count();
                // Tính toán số lượng reply cho mỗi bình luận
                $comments = Comment::where('post_id', $post->id)->get();
                $replyCount = 0;
                foreach ($comments as $comment) {
                    $replyCount += Comment::where('post_id', $post->id)->where('parent_id', $comment->id)->count();
                }
                // Lấy thông tin về người like
                $likers = $post->likes->map(function ($like) {
                    return [
                        'user' => $like->user,
                        'emotion' => $like->emotion,
                    ];
                });
                // Lấy thông tin về người comment và reply
                $commentData = [];
                foreach ($comments as $comment) {
                    $commentUser = $comment->user;
                    $replies = Comment::where('post_id', $post->id)->where('parent_id', $comment->id)->get();
                    $replyData = [];
                    foreach ($replies as $reply) {
                        $replyUser = $reply->user;
                        $replyData[] = [
                            'reply' => $reply,
                            'user' => $replyUser,
                        ];
                    }
                    $commentData[] = [
                        'comment' => $comment,
                        'user' => $commentUser,
                        'replies' => $replyData,
                    ];
                }
                // Tạo một mảng chứa thông tin về bài viết và tất cả thông tin liên quan
                $postData = [
                    'user' => $user,
                    'post' => $post,
                    'like_count' => $likeCount,
                    'comment_count' => $commentCount,
                    'reply_count' => $replyCount,
                    'likers' => $likers,
                    'comments' => $commentData,
                ];
                array_push($result, $postData);
            }
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    /**
     * @OA\Get(
     *     path="/api/profile/blogs",
     *     summary="Hiển thị danh sách blog của người dùng",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách blog của người dùng",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="user", type="object",
     *                 @OA\Property(property="id", type="integer", format="int64", description="ID tài khoản người dùng"),
     *                 @OA\Property(property="username", type="string", description="Tên đăng nhập"),
     *                 @OA\Property(property="first_name", type="string", description="Họ"),
     *                 @OA\Property(property="last_name", type="string", description="Tên"),
     *                
     *                 @OA\Property(property="avatar", type="string", description="Link đến ảnh đại diện"),
     *                 @OA\Property(property="phone", type="string", description="Số điện thoại"),
     *                 @OA\Property(property="address", type="string", description="Địa chỉ"),
     *                 @OA\Property(property="biography", type="string", description="Tiểu sử"),
     *                 @OA\Property(property="gender", type="string", description="Giới tính"),
     *                 @OA\Property(property="status", type="integer", format="int32", description="Trạng thái"),
     *                 @OA\Property(property="major_id", type="integer", format="int32", description="ID ngành học"),
     *                 @OA\Property(property="permissions", type="array", description="Danh sách quyền",
     *                     @OA\Items(type="string")
     *                 ),
     *                 @OA\Property(property="verification_code", type="string", description="Mã xác minh"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật"),
     *             ),
     *             @OA\Property(property="blogs", type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="status", type="integer", description="trạng thái bài blog"),
     *                     @OA\Property(property="user_id", type="integer", description="người đăng blog"),
     *                     @OA\Property(property="title", type="string", description="tiêu đề bài blog"),
     *                     @OA\Property(property="content", type="string", description="nội dung bài blog"),
     *                     @OA\Property(property="thumbnail", type="string", description="ảnh  bài blog"),
     *                     @OA\Property(property="majors_id", type="integer", description="id của chuyên ngành liên quan đến blog"),
     *                     @OA\Property(property="hashtag", type="string", description="hashtag liên quan đến blog"),
     *                     @OA\Property(property="views", type="integer", description="Số lượt xem bài blog"),
     *                     @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
     *                     @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Lỗi trong quá trình xử lý",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */
    public function ShowBlogProfile(){
        DB::beginTransaction();
        try{
            $user = Auth::user();
            $blogs = Blog::where('user_id', $user->id)->orderBy('created_at', 'DESC')->paginate(10);
            
            $blogData = [
                'user' => $user,
                'blog' => $blogs,
            ];
            array_push($result,$blogData);
            DB::commit();
            return response()->json($result);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()],400) ;
        }
    }
    /**
    * @OA\Get(
        *     path="/api/profile/quests",
        *     summary="Hiển thị danh sách Qa của người dùng",
        *     tags={"Profile"},
        *     security={{"bearerAuth":{}}},
        *     @OA\Response(
        *         response=200,
        *         description="Danh sách Qa của người dùng",
        *         @OA\JsonContent(
        *             type="object",
        *             @OA\Property(property="user", type="object",
        *                @OA\Property(property="id", type="integer", format="int64", description="ID tài khoản người dùng"),
        *                 @OA\Property(property="username", type="string", description="Tên đăng nhập"),
        *                 @OA\Property(property="first_name", type="string", description="Họ"),
        *                 @OA\Property(property="last_name", type="string", description="Tên"),
        *                
        *                 @OA\Property(property="avatar", type="string", description="Link đến ảnh đại diện"),
        *                 @OA\Property(property="phone", type="string", description="Số điện thoại"),
        *                 @OA\Property(property="address", type="string", description="Địa chỉ"),
        *                 @OA\Property(property="biography", type="string", description="Tiểu sử"),
        *                 @OA\Property(property="gender", type="string", description="Giới tính"),
        *                 @OA\Property(property="status", type="integer", format="int32", description="Trạng thái"),
        *                 @OA\Property(property="major_id", type="integer", format="int32", description="ID ngành học"),
        *                 @OA\Property(property="permissions", type="array", description="Danh sách quyền",
        *                     @OA\Items(type="string")
        *                 ),
        *                 @OA\Property(property="verification_code", type="string", description="Mã xác minh"),
        *                 @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
        *                 @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật"),
        *             ),
        *             @OA\Property(property="qa", type="array",
        *                 @OA\Items(
        *                     @OA\Property(property="id", type="integer"),
        *                     @OA\Property(property="title", type="string", description="tiêu đề bài blog"),
        *                     @OA\Property(property="content", type="string", description="nội dung bài blog"),
        *                     @OA\Property(property="user_id", type="integer", description="người đăng blog"),
        *                     @OA\Property(property="majors_id", type="integer", description="id của chuyên ngành liên quan đến blog"),
        *                     @OA\Property(property="hashtag", type="string", description="hashtag liên quan đến blog"),
        *                     @OA\Property(property="views", type="integer", description="Số lượt xem bài blog"),
        *                     @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
        *                     @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
        *                 )
        *             )
        *         )
        *     ),
        *     @OA\Response(
        *         response=401,
        *         description="Unauthorized"
        *     ),
        *     @OA\Response(
        *         response=400,
        *         description="Lỗi trong quá trình xử lý",
        *         @OA\JsonContent(
        *             type="object",
        *             @OA\Property(property="error", type="string")
        *         )
        *     )
        * )
        */
    public function ShowQaProfile(){
        DB::beginTransaction();
        try{
            $user = Auth::user();
            $qas = Qa::where('user_id',$user->id)->orderBy('created_at','DESC')->paginate(10);
            $qaData = [
                'user' => $user,
                'qa' => $qas,
            ];
            array_push($result,$qaData);
            DB::commit();
            return response()->json($result);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()],400) ;
        }
    }
    /**
 * @OA\Get(
 *     path="/api/profile/images",
 *     summary="Hiển thị danh sách ảnh của người dùng từ các bài viết",
 *     tags={"Profile"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(
 *         response=200,
 *         description="Danh sách ảnh của người dùng",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="user", type="object",
 *                 @OA\Property(property="id", type="integer", format="int64", description="ID tài khoản người dùng"),
 *                 @OA\Property(property="username", type="string", description="Tên đăng nhập"),
 *                 @OA\Property(property="first_name", type="string", description="Họ"),
 *                 @OA\Property(property="last_name", type="string", description="Tên"),
 *                
 *                 @OA\Property(property="avatar", type="string", description="Link đến ảnh đại diện"),
 *                 @OA\Property(property="phone", type="string", description="Số điện thoại"),
 *                 @OA\Property(property="address", type="string", description="Địa chỉ"),
 *                 @OA\Property(property="biography", type="string", description="Tiểu sử"),
 *                 @OA\Property(property="gender", type="string", description="Giới tính"),
 *                 @OA\Property(property="status", type="integer", format="int32", description="Trạng thái"),
 *                 @OA\Property(property="major_id", type="integer", format="int32", description="ID ngành học"),
 *                 @OA\Property(property="permissions", type="array", description="Danh sách quyền",
 *                     @OA\Items(type="string")
 *                 ),
 *                 @OA\Property(property="verification_code", type="string", description="Mã xác minh"),
 *                 @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật"),
 *             ),
 *             @OA\Property(property="images", type="array",
 *                     @OA\Items(type="string")             
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Unauthorized"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Lỗi trong quá trình xử lý",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */
    public function ShowImageProfile(){
        DB::beginTransaction();
        try{
            $user = Auth::user();
            $posts = $user->posts;
            $images = [];
            // Lặp qua các bài post và lấy từng ảnh trong mảng 'images'
            foreach ($posts as $post) {
            // Mảng ảnh trong bài post
            $postImages = $post->images; 
            // Lặp qua mảng ảnh và thêm từng ảnh vào mảng kết quả
            if (!is_null($postImages)) {
                foreach ($postImages as $image) {
                    $images[] = $image;
                }
            }
            };
            $imageData  =[
                'user' => $user,
                'images' => $images,
            ];
            $result = [];
            if (empty($images)) {
                // Nếu không có ảnh, gán mảng images thành một mảng rỗng
                $imageData['images'] = [];
            }
            array_push($result,$imageData);
            DB::commit();
            return response()->json($result);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()],400) ;
        }
    }
}