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
        DB::table('oauth_refresh_tokens')->where('access_token_id', $user->token()->id)->update(['revoked' => true]);
        $user->tokens->each(function ($token) {
            $token->delete();
        });
        
        return response()->json(['message' => 'Đăng xuất thành công' ], 200);
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


    // Forgot password

    /**
     * @OA\Post(
     *     path="/api/auth/post-forgot-password",
     *     summary="Forgot password",
     *     description="Sends a verification code to the user's email for password reset.",
     *     operationId="forgotPassword",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Email address for password reset",
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Verification code sent successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Mã xác nhận đã được gửi đến mail của bạn. Kiểm tra ngay nhé!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Email bạn nhập không đúng !")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Unprocessable Entity",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 example={"email": {"The email field is required."}}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.")
     *         )
     *     )
     * )
     */
    public function forgotPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        // Kiểm tra email của người dùng
        $checkUser = User::where('email', $request->email)->first();

        DB::beginTransaction();
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try{

            if (!$checkUser) {
                return response()->json(['message' => 'Email bạn nhập không đúng !'], 404);
            }else{

                // Tạo mã xác nhận mới
                $verificationCode = str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
                // $checkUser->update(['verification_code' => $verificationCode]);
                DB::table('users')->where('email', $request->email)->update(
                    [
                        'verification_code' => $verificationCode,
                        'status' => 1
                    ]
                );
                Mail::to($request->email)->send(new VerifyAccount($verificationCode));
                DB::commit();
                return response()->json(['message' => 'Mã xác nhận đã được gửi đến mail của bạn. Kiểm tra ngay nhé!'], 200);
            }

        } catch (\Exception $e) {
            DB::rollback();
            // Log::alert($e);
            return response()->json(['message' => 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.'], 500);
        }
    }
    /**
     * @OA\Post(
     *     path="/api/auth/post-reset-password",
     *     summary="Reset user password",
     *     description="Resets the user password using verification code.",
     *     operationId="resetPassword",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Password reset details",
     *         @OA\JsonContent(
     *             required={"verification_code", "password"},
     *             @OA\Property(property="verification_code", type="string", format="uuid", example="123456"),
     *             @OA\Property(property="password", type="string", format="password", example="new_password"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Password reset successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Mật khẩu đã được đặt lại thành công")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Mã xác nhận không chính xác")
     *         )
     *     )
     * )
     */
    public function resetPassword(Request $request)
    {

        $checkVerify = User::where('verification_code', $request->verification_code)->first();
        DB::beginTransaction();
        if (!$checkVerify) {
            return response()->json(['message' => 'Mã xác nhận không chính xác'], 403);
        }else{
            // $checkUser->update(['password' => Hash::make($request->password)]);
            DB::table('users')->where('verification_code', $request->verification_code)->update(['password' => Hash::make($request->password)]);
            Mail::to($checkVerify->email)->send(new ForgotPassword($request->password, $checkVerify->username));
            DB::commit();
            return response()->json(['message' => 'Mật khẩu đã được đặt lại thành công'], 200);
        }

    }

    public function getUser(Request $request)
    {
        $user = $request->user();
        return response()->json(['user' => $user ], 200);
    }
   
}