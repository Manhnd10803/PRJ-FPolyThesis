<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminUserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/admin/user/",
     *     tags={"User Management"},
     *     summary="Danh sách tất cả tài khoản người dùng",
     *     description="Lấy danh sách tất cả tài khoản người dùng trong hệ thống.",
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách tài khoản người dùng thành công",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 properties={
     *                     @OA\Property(property="id", type="integer", format="int64", description="ID tài khoản người dùng"),
     *                     @OA\Property(property="username", type="string", description="Tên đăng nhập"),
     *                     @OA\Property(property="first_name", type="string", description="Họ"),
     *                     @OA\Property(property="last_name", type="string", description="Tên"),
     *                     @OA\Property(property="group_id", type="integer", format="int32", description="ID nhóm"),
     *                     @OA\Property(property="email", type="string", format="email", description="Địa chỉ email"),
     *                     @OA\Property(property="birthday", type="string", description="Ngày sinh"),
     *                     @OA\Property(property="avatar", type="string", description="Link đến ảnh đại diện"),
     *                     @OA\Property(property="phone", type="string", description="Số điện thoại"),
     *                     @OA\Property(property="address", type="string", description="Địa chỉ"),
     *                     @OA\Property(property="biography", type="string", description="Tiểu sử"),
     *                     @OA\Property(property="gender", type="string", description="Giới tính"),
     *                     @OA\Property(property="status", type="integer", format="int32", description="Trạng thái"),
     *                     @OA\Property(property="major_id", type="integer", format="int32", description="ID ngành học"),
     *                     @OA\Property(property="permissions", type="array", description="Danh sách quyền",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(property="verification_code", type="string", description="Mã xác minh"),
     *                     @OA\Property(property="created_at", type="string", format="date-time", description="Ngày tạo"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật")
     *                 }
     *             )
     *         )
     *     )
     * )
     */
    //danh sách người dùng
    public function listUser()
    {
        $users = User::all();
        $users->load('major'); 
        return response()->json(['users' => $users], 200);
    }

    //chi tiết
    /**
     * @OA\Get(
     *     path="/api/admin/user/detail/{user}",
     *     tags={"User Management"},
     *     summary="Xem chi tiết tài khoản người dùng",
     *     description="Xem chi tiết thông tin tài khoản người dùng.",
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="ID của tài khoản người dùng",
     *         @OA\Schema(type="integer", format="int32")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Thông tin chi tiết của tài khoản người dùng",
     *         @OA\JsonContent(
     *             type="object",
     *             properties={
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
     *                 @OA\Property(property="updated_at", type="string", format="date-time", description="Ngày cập nhật")
     *             }
     *         )
     *     ),
     *     @OA\Response(response=404, description="Không tìm thấy tài khoản")
     * )
     */
    public function detailUser(User $user)
    {
        $user->load('major'); 
        return response()->json(['user' => $user], 200);
    }
    //tạm khóa người dùng
    /**
     * @OA\Put(
     *     path="/api/admin/user/suspend/{user}",
     *     tags={"User Management"},
     *     summary="Tạm khóa tài khoản người dùng",
     *     description="Tạm khóa tài khoản người dùng dựa trên ID.",
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="ID của tài khoản người dùng",
     *         @OA\Schema(type="integer", format="int32")
     *     ),
     *     @OA\Response(response=200, description="Tạm khóa tài khoản thành công"),
     *     @OA\Response(response=400, description="Lỗi trong quá trình xử lý"),
     *     @OA\Response(response=404, description="Không tìm thấy tài khoản")
     * )
     */
    public function suspendUser(User $user)
    {
        DB::beginTransaction();
        try {
            $user->update(['status' => config('default.user.status.suspend')]);
            DB::commit();
            return response()->json(['message' => 'Khóa tài khoản thành công'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    //kích hoạt người dùng
    /**
     * @OA\Put(
     *     path="/api/admin/user/active/{user}",
     *     tags={"User Management"},
     *     summary="Mở khóa tài khoản người dùng",
     *     description="Mở khóa tài khoản người dùng dựa trên ID.",
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="ID của tài khoản người dùng",
     *         @OA\Schema(type="integer", format="int32")
     *     ),
     *     @OA\Response(response=200, description="Mở khóa tài khoản thành công"),
     *     @OA\Response(response=400, description="Lỗi trong quá trình xử lý"),
     *     @OA\Response(response=404, description="Không tìm thấy tài khoản")
     * )
     */
    public function activeUser(User $user)
    {
        DB::beginTransaction();
        try {
            $user->update(['status' => config('default.user.status.active')]);
            DB::commit();
            return response()->json(['message' => 'Mở khóa tài khoản thành công'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    //xóa tài khoản
    /**
     * @OA\Delete(
     *     path="/api/admin/user/delete/{user}",
     *     tags={"User Management"},
     *     summary="Xóa tài khoản người dùng",
     *     description="Xóa tài khoản người dùng dựa trên ID.",
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="ID của tài khoản người dùng",
     *         @OA\Schema(type="integer", format="int32")
     *     ),
     *     @OA\Response(response=200, description="Xóa tài khoản thành công"),
     *     @OA\Response(response=400, description="Lỗi trong quá trình xử lý"),
     *     @OA\Response(response=404, description="Không tìm thấy tài khoản")
     * )
     */
    public function deleteUser(User $user)
    {
        DB::beginTransaction();
        try {
            $user->delete();
            DB::commit();
            return response()->json(['message' => 'Xóa tài khoản thành công'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}