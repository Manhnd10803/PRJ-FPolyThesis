<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Qa;
use App\Models\Search;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/search/{model}",
     *      operationId="searchEverything",
     *      tags={"Search"},
     *      summary="Tìm kiếm dữ liệu theo mô hình",
     *      description="Trả về kết quả tìm kiếm dựa trên mô hình được chỉ định.",
     *      @OA\Parameter(
     *          name="model",
     *          in="path",
     *          required=true,
     *          description="Tên mô hình (user, post, comment, blog, qa hoặc nếu gọi tất cả dùng default)",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Parameter(
     *          name="search",
     *          in="query",
     *          required=true,
     *          description="Từ khóa tìm kiếm",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Thành công",
     *          @OA\JsonContent(
     *              type="object",
     *              properties={
     *                  @OA\Property(property="users", type="array",
     *                      @OA\Items(
     *                          @OA\Property(property="id", type="integer"),
     *                          @OA\Property(property="username", type="string"),
     *                          @OA\Property(property="first_name", type="string"),
     *                          @OA\Property(property="last_name", type="string"),
     *                          @OA\Property(property="group_id", type="integer"),
     *                          @OA\Property(property="email", type="string"),
     *                          @OA\Property(property="birthday", type="string"),
     *                          @OA\Property(property="avatar", type="string"),
     *                          @OA\Property(property="cover_photo", type="string"),
     *                          @OA\Property(property="phone", type="string"),
     *                          @OA\Property(property="address", type="string"),
     *                          @OA\Property(property="biography", type="string"),
     *                          @OA\Property(property="gender", type="string"),
     *                          @OA\Property(property="status", type="string"),
     *                          @OA\Property(property="activity_user", type="string"),
     *                          @OA\Property(property="major_id", type="string"),
     *                          @OA\Property(property="permissions", type="string"),
     *                          @OA\Property(property="verification_code", type="string"),
     *                          @OA\Property(property="created_at", type="string", format="date-time"),
     *                          @OA\Property(property="updated_at", type="string", format="date-time"),
     *                      )
     *                  ),
     *                  @OA\Property(property="posts", type="array",    
     *                      @OA\Items(
     *                          @OA\Property(property="id", type="integer"),
     *                          @OA\Property(property="user_id", type="integer"),
     *                          @OA\Property(property="content", type="string"),
     *                          @OA\Property(property="feeling", type="string", nullable=true),
     *                          @OA\Property(property="image", type="object", nullable=true,
     *                              @OA\Property(property="url", type="string"),
     *                              @OA\Property(property="width", type="integer"),
     *                              @OA\Property(property="height", type="integer"),
     *                          ),
     *                          @OA\Property(property="hashtag", type="string", nullable=true),
     *                          @OA\Property(property="status", type="integer"),
     *                          @OA\Property(property="views", type="integer"),
     *                          @OA\Property(property="created_at", type="string", format="date-time"),
     *                          @OA\Property(property="updated_at", type="string", format="date-time"),
     *                      )
     *                  ),
     *                  @OA\Property(property="comments", type="array",
     *                      @OA\Items(
     *                          @OA\Property(property="id", type="integer"),
     *                          @OA\Property(property="user_id", type="integer"),
     *                          @OA\Property(property="content", type="string"),
     *                          @OA\Property(property="parent_id", type="integer"),
     *                          @OA\Property(property="post_id", type="integer"),
     *                          @OA\Property(property="blog_id", type="integer"),
     *                          @OA\Property(property="qa_id", type="integer"),
     *                          @OA\Property(property="created_at", type="string", format="date-time"),
     *                          @OA\Property(property="updated_at", type="string", format="date-time"),
     *                      )
     *                  ),
     *                  @OA\Property(property="blogs", type="array", 
     *                      @OA\Items(
     *                          @OA\Property(property="id", type="integer"),
     *                          @OA\Property(property="status", type="integer", description="trạng thái bài blog"),
     *                          @OA\Property(property="user_id", type="integer", description="người đăng blog"),
     *                          @OA\Property(property="title", type="string", description="tiêu đề bài blog"),
     *                          @OA\Property(property="content", type="text", description="nội dung bài blog"),
     *                          @OA\Property(property="thumbnail", type="object", description="ảnh  bài blog", nullable=true,
     *                              @OA\Property(property="url", type="string"),
     *                              @OA\Property(property="width", type="integer"),
     *                              @OA\Property(property="height", type="integer"),
     *                          ),
     *                          @OA\Property(property="majors_id", type="integer", description="id của chuyên ngành liên quan đến blog"),
     *                          @OA\Property(property="hashtag", type="string", description="hashtag liên quan đến blog"),
     *                          @OA\Property(property="views", type="integer", description="Số lượt xem bài blog"),
     *                          @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
     *                          @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
     *                      )
     *                  ),
     *                  @OA\Property(property="qas", type="array", 
     *                      @OA\Items(
     *                          @OA\Property(property="id", type="integer"),
     *                          @OA\Property(property="title", type="string", description="Tiêu đề câu hỏi"),
     *                          @OA\Property(property="content", type="string", description="Nội dung câu hỏi"),
     *                          @OA\Property(property="majors_id", type="integer", description="ID của chuyên ngành liên quan đến câu hỏi"),
     *                          @OA\Property(property="user_id", type="integer", description="ID của người đặt câu hỏi"),
     *                          @OA\Property(property="hashtag", type="string", description="HashTag liên quan đến câu hỏi"),
     *                          @OA\Property(property="views", type="integer", description="Số lượt xem câu hỏi"),
     *                          @OA\Property(property="created_at", type="string", format="date-time", nullable=true),
     *                          @OA\Property(property="updated_at", type="string", format="date-time", nullable=true),
     *                      )
     *                  ),
     *              }
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Lỗi",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="error", type="string")
     *          )
     *      ),
     * )
     */

    public function SearchEverything(Request $request, $model)
    {
        DB::beginTransaction();
        try {
            $user = Auth::id();
            $query = $request->input('search');
            if (empty($query)) {
                return response()->json(['message' => 'No search query provided'], 200);
            }
            $modelName = strtolower(class_basename($model));
            // Trường hợp tìm kiếm theo tab như facebook
            switch ($modelName) {
                case 'user':
                    $model = User::where(function ($queryBuilder) use ($query) {
                        $queryBuilder->where('username', 'like', '%' . $query . '%')
                            ->orWhere('first_name', 'like', '%' . $query . '%')
                            ->orWhere('last_name', 'like', '%' . $query . '%');
                    })->where('id', '!=', $user)->get();
                    break;
                case 'post':
                    $model = Post::with('user:id,first_name,last_name,avatar')->withCount('likes')->withCount('comments')
                        ->where('content', 'like', '%' . $query . '%')->get();
                    break;
                case 'blog':
                    $model = Blog::with('user:id,username,first_name,last_name,avatar', 'major:id,majors_name')->withCount('likes')->withCount('comments')
                        ->where('title', 'like', '%' . $query . '%')->get();
                    break;
                case 'qa':
                    $model = Qa::with('user:id,username,first_name,last_name,avatar', 'major:id,majors_name')->withCount('likes')->withCount('comments')
                        ->where('title', 'like', '%' . $query . '%')->get();
                    break;
                default:
                    // Trường hợp mặc định: Tìm kiếm theo tất cả các model url có dạng api/search/default
                    $model = [
                        'user' => [],
                        'post' => [],
                        'blog' => [],
                        'qa' => [],
                    ];
                    $model['user'] = User::where(function ($queryBuilder) use ($query) {
                        $queryBuilder->where('username', 'like', '%' . $query . '%')
                            ->orWhere('first_name', 'like', '%' . $query . '%')
                            ->orWhere('last_name', 'like', '%' . $query . '%');
                    })->where('id', '!=', $user)->get()->map(function ($item) {
                        return $item;
                    });
                    $model['post'] = Post::with('user:id,first_name,last_name,avatar')->withCount('likes')->withCount('comments')
                        ->where('content', 'like', '%' . $query . '%')->get()->map(function ($item) {
                            return $item;
                        });
                    $model['blog'] = Blog::with('user:id,first_name,last_name,avatar', 'major:id,majors_name')->withCount('likes')->withCount('comments')
                        ->where('title', 'like', '%' . $query . '%')->get()->map(function ($item) {
                            return $item;
                        });
                    $model['qa'] = Qa::with('user:id,first_name,last_name,avatar', 'major:id,majors_name')->withCount('likes')->withCount('comments')
                        ->where('title', 'like', '%' . $query . '%')->get()->map(function ($item) {
                            return $item;
                        });
                    break;
            }
            Search::create([
                'user_id' => $user,
                'query' => $query,
            ]);
            DB::commit();
            return response()->json($model, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function getRecentSearches()
    {
        $userId = Auth::id();
        $recentSearches = Search::where('user_id', $userId)->orderBy('created_at', 'desc')->limit(10)->get();
        return response()->json($recentSearches, 200);
    }
    public function deleteOtherRecentSearches(Search $search)
    {
        $userId = Auth::id();
        $deleteItem = Search::where('user_id', $userId)->where('id', $search->id);
        $deleteItem->delete();
        return response()->json(['message' => 'Delete item successfully'], 200);
    }
    public function deleteAllRecentSearches(Search $search)
    {
        $userId = Auth::id();
        $search = Search::where('user_id', $userId);
        $search->delete();
        return response()->json(['message' => 'Delete item successfully'], 200);
    }
}