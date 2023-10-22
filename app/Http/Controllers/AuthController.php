<?php

namespace App\Http\Controllers;

use App\Mail\ForgotPassword;
use App\Mail\VerifyAccount;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     tags={"Authentication"},
     *     summary="Đăng ký tài khoản",
     *     description="Tạo một tài khoản mới.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             required={"username", "email", "password"},
     *             @OA\Property(
     *                 property="username",
     *                 type="string",
     *                 description="Tên đăng nhập của người dùng"
     *             ),
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 format="email",
     *                 description="Địa chỉ email của người dùng"
     *             ),
     *             @OA\Property(
     *                 property="password",
     *                 type="string",
     *                 minLength=8,
     *                 description="Mật khẩu của người dùng"
     *             )
     *         )
     *     ),
     *     @OA\Response(response=201, description="Tạo tài khoản thành công"),
     *     @OA\Response(response=400, description="Lỗi trong quá trình xử lý"),
     *     @OA\Response(response=422, description="Dữ liệu không hợp lệ")
     * )
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8'
        ]);
        DB::beginTransaction();
        try {
            if (!$validator->fails()) {
                $groupId = strpos($request->email, '@fpt.edu.vn') ? config('default.user.groupID.student') : config('default.user.groupID.guest');
                $codeVerify = str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
                DB::table('users')->insert(
                    [
                        'username' => $request->username,
                        'password' => Hash::make($request->password),
                        'email' => $request->email,
                        'group_id' => $groupId,
                        'status' => config('default.user.status.lock'),
                        'verification_code' => $codeVerify,
                    ]
                );
                Mail::to($request->email)->send(new VerifyAccount($codeVerify));
                DB::commit();
                return response()->json(['email' => $request->email,'message' => 'Đăng ký thành công'], 201);
            } else {
                return response()->json(['errors' => $validator->errors()], 422);
            }
        } catch (\Exception $e) {
            DB::rollback();
            // Log::alert($e);
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    /**
     * @OA\Post(
     *     path="/api/auth/verify",
     *     tags={"Authentication"},
     *     summary="Xác minh tài khoản",
     *     description="Xác minh tài khoản người dùng bằng mã xác nhận.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             required={"email", "verification_code"},
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 format="email",
     *                 description="Địa chỉ email của người dùng"
     *             ),
     *             @OA\Property(
     *                 property="verification_code",
     *                 type="string",
     *                 description="Mã xác nhận"
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200, description="Xác minh tài khoản thành công"),
     *     @OA\Response(response=403, description="Mã xác nhận không chính xác"),
     *     @OA\Response(response=404, description="Không tìm thấy tài khoản")
     * )
     */
    public function verify(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($request->verification_code == $user->verification_code) {
            $user->update(['status' => config('default.user.status.active')]);
            return response()->json(['message' => 'Kích hoạt tài khoản thành công'], 200);
        } else {
            return response()->json(['message' => 'Mã xác nhận không chính xác'], 403);
        }
    }
    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     tags={"Authentication"},
     *     summary="Đăng nhập",
     *     description="Đăng nhập vào hệ thống bằng địa chỉ email và mật khẩu.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             required={"email", "password"},
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 format="email",
     *                 description="Địa chỉ email của người dùng"
     *             ),
     *             @OA\Property(
     *                 property="password",
     *                 type="string",
     *                 minLength=8,
     *                 description="Mật khẩu của người dùng"
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200, description="Đăng nhập thành công"),
     *     @OA\Response(response=400, description="Đăng nhập thất bại"),
     *     @OA\Response(response=403, description="Tài khoản chưa được kích hoạt"),
     *     @OA\Response(response=422, description="Dữ liệu không hợp lệ")
     * )
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8'
        ]);
        if (!$validator->fails()) {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user();
                if ($user->status == config('default.user.status.lock')) {
                    return response()->json(['message' => 'Tài khoản chưa được kích hoạt'], 403);
                }
                if ($user->status == config('default.user.status.suspend')) {
                    return response()->json(['message' => 'Tài khoản đã bị khóa'], 403);
                }
                if ($user->group_id == config('default.user.groupID.superAdmin') || $user->group_id == config('default.user.groupID.admin')) {
                    //Token role admin
                    $token = $user->createToken('authToken', ['admin'])->accessToken;
                } else {
                    //Token role user
                    $token = $user->createToken('authToken')->accessToken;
                }
                return response()->json(['user' => $user, 'accessToken' => $token], 200);
            } else {
                return response()->json(['message' => 'Đăng nhập thất bại'], 400);
            }
        } else {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/logout",
     *     tags={"Authentication"},
     *     summary="Đăng xuất",
     *     description="Đăng xuất khỏi hệ thống và hủy bỏ tất cả các token truy cập.",
     *     @OA\Response(response=200, description="Đăng xuất thành công")
     * )
     */
    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens->each(function ($token) {
            $token->delete();
        });
        return response()->json(['message' => 'Đăng xuất thành công'], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/auth/google-auth",
     *     tags={"Authentication"},
     *     summary="Khởi tạo quá trình đăng nhập bằng Google",
     *     description="Khởi tạo quá trình đăng nhập bằng Google và trả về URL để chuyển hướng đến trang đăng nhập Google.",
     *     @OA\Response(response=200, description="URL đăng nhập Google")
     * )
     */
    public function googleAuth()
    {
        $redirectUrl = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
        return response()->json(['googleLoginUrl' => $redirectUrl]);
    }

    /**
     * @OA\Get(
     *     path="/api/auth/google-callback",
     *     tags={"Authentication"},
     *     summary="Xử lý đăng nhập bằng Google",
     *     description="Xử lý việc đăng nhập bằng Google, lấy thông tin trả về từ Google thực hiện đăng ký hoặc đăng nhập.",
     *     @OA\Response(response=200, description="Đăng nhập bằng Google thành công"),
     *     @OA\Response(response=403, description="Tài khoản bị khóa hoặc lỗi trong quá trình xử lý"),
     *     @OA\Response(response=400, description="Lỗi trong quá trình xử lý")
     * )
     */
    public function googleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();
        $checkUser = User::where('email', $user->email)->first();
        if ($checkUser) {
            //đăng nhập 
            if ($checkUser->status == config('default.user.status.lock')) {
                return response()->json(['message' => 'Tài khoản chưa được kích hoạt'], 403);
            };
            if ($checkUser->status == config('default.user.status.suspend')) {
                return response()->json(['message' => 'Tài khoản đã bị khóa'], 403);
            };
            if ($checkUser->group_id == config('default.user.groupID.superAdmin') || $checkUser->group_id == config('default.user.groupID.admin')) {
                //Token role admin
                $token = $checkUser->createToken('authToken', ['admin'])->accessToken;
            } else {
                //Token role user
                $token = $checkUser->createToken('authToken')->accessToken;
            }
            Auth()->login($checkUser);
            return response()->json(['user' => $checkUser, 'accessToken' => $token], 200);
        } else {
            // dd($user);
            //đăng ký
            DB::beginTransaction();
            try {
                $username = explode('@', $user->email)[0];
                DB::table('users')->insert(
                    [
                        'username' => $username,
                        'password' => Hash::make(config('default.user.password')),
                        'email' => $user->email,
                        'group_id' => config('default.user.groupID.student'),
                        'status' => config('default.user.status.active'),
                    ]
                );
                DB::commit();
                $checkUser = User::where('email', $user->email)->first();
                Auth()->login($checkUser);
                $token = $checkUser->createToken('authToken')->accessToken;
                return response()->json(['user' => $user, 'accessToken' => $token], 200);
            } catch (\Exception $e) {
                DB::rollback();
                // Log::alert($e);
                return response()->json(['errors' => $e->getMessage()], 400);
            }
        }
    }
    public function refreshToken()
    {
        DB::beginTransaction();
        try {
            $user = auth()->user();
            $user->tokens->each(function ($token, $key) {
                $token->delete();
            });
            $newToken = auth()->user()->createToken('authToken')->accessToken;
            DB::commit();
            return response()->json(['access_token' => $newToken], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}