<?php

namespace App\Http\Controllers;

use App\Events\UpdateActivityUser;
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
use Spatie\Activitylog\Models\Activity;

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
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'major_id' => 'required',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
        ]);
        DB::beginTransaction();
        try {
            if (!$validator->fails()) {
                $groupId = strpos($request->email, '@fpt.edu.vn') ? config('default.user.groupID.student') : config('default.user.groupID.guest');
                $codeVerify = str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
                //thêm id vào đuôi
                if ($groupId == config('default.user.groupID.student')) {
                    $username = explode('@', $request->email)[0] . 's';
                } else if ($groupId == config('default.user.groupID.guest')) {
                    $username = explode('@', $request->email)[0] . 'g';
                }
                DB::table('users')->insert(
                    [
                        'username' => $username,
                        'password' => Hash::make($request->password),
                        'email' => $request->email,
                        'avatar' => config('default.user.avatar.default'),
                        'first_name' => $request->first_name,
                        'last_name' => $request->last_name,
                        'major_id' => $request->major_id,
                        'group_id' => $groupId,
                        'status' => config('default.user.status.lock'),
                        'verification_code' => $codeVerify,
                        'created_at' => Carbon::now(),
                    ]
                );
                Mail::to($request->email)->send(new VerifyAccount($codeVerify));
                $user = User::where('email', $request->email)->first();
                $data  = [
                    'user_id' => $user->id,
                    'username' => $user->username,
                    'ip_address' => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null,
                    'user_agent' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null,
                ];
                activity('auths')
                    ->tap(function (Activity $activity) use ($data) {
                        $activity->properties = $data;
                        $activity->event = 'created';
                    })
                    ->log('User has been created');
                DB::commit();
                return response()->json(['email' => $request->email, 'message' => 'Đăng ký thành công'], 201);
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
                $user->update([
                    'activity_user' => 'Đang hoạt động'
                ]);
                $user->save;
                $friends = $user->friends;
                foreach ($friends as $friend) {
                    broadcast(new UpdateActivityUser($friend, 'Đang hoạt động', $user))->toOthers();
                }
                $request = Request::create('oauth/token', 'POST', [
                    'grant_type' => 'password',
                    'client_id' => env('PASSPORT_PASSWORD_GRANT_CLIENT_ID'),
                    'client_secret' => env('PASSPORT_PASSWORD_GRANT_CLIENT_SECRET'),
                    'username' => $request->email,
                    'password' => $request->password,
                    'scope' => '',
                ]);
                $result = app()->handle($request);
                $response = json_decode($result->getContent(), true);
                //lấy địa chỉ ip và trình duyệt đang sử dụng để check đăng nhập lạ
                $data  = [
                    'user_id' => auth()->id(),
                    'username' => auth()->user()->first_name . ' ' . auth()->user()->last_name,
                    'ip_address' => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null,
                    'user_agent' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null,
                ];
                activity('auths')
                    ->tap(function (Activity $activity) use ($data) {
                        $activity->properties = $data;
                        $activity->event = 'login';
                    })
                    ->log('User has been login');
                return response()->json($response, 200);
            } else {
                $checkAccount = User::where('email', $request->email)->first();
                if ($checkAccount) {
                    return response()->json(['message' => 'Mật khẩu không đúng'], 400);
                } else {
                    return response()->json(['message' => 'Email không tồn tại'], 400);
                }
            }
        } else {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    }
    public function refresh(Request $request)
    {
        if ($request->refresh_token) {
            $request = Request::create('oauth/token', 'POST', [
                'grant_type' => 'refresh_token',
                'client_id' => env('PASSPORT_PASSWORD_GRANT_CLIENT_ID'),
                'client_secret' => env('PASSPORT_PASSWORD_GRANT_CLIENT_SECRET'),
                'refresh_token' => $request->refresh_token,
            ]);
            $result = app()->handle($request);
            $response = json_decode($result->getContent(), true);
            if (isset($response['error'])) {
                return response()->json($response, 401);
            }
            return response()->json($response);
        }
        return response(['message' => 'refresh_token null'], 401);
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

        $user->update([
            'activity_user' => 'Ngoại tuyến'
        ]);

        $user->save;

        $friends = $user->friends;
        foreach ($friends as $friend) {
            broadcast(new UpdateActivityUser($friend, 'Ngoại tuyến', $user))->toOthers();
        }

        DB::table('oauth_refresh_tokens')->where('access_token_id', $user->token()->id)->update(['revoked' => true]);
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

    public function loginGoogle(Request $request)
    {
        $email = $request->email;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $avatar = $request->avatar;
        $checkUser = User::where('email', $email)->first();
        if ($checkUser) {
            //đăng nhập 
            if ($checkUser->status == config('default.user.status.lock')) {
                return response()->json(['message' => 'Tài khoản chưa được kích hoạt'], 403);
            };
            if ($checkUser->status == config('default.user.status.suspend')) {
                return response()->json(['message' => 'Tài khoản đã bị khóa'], 403);
            };
            $checkUser->update([
                'activity_user' => 'Đang hoạt động'
            ]);
            $checkUser->save;
            $friends = $checkUser->friends;
            foreach ($friends as $friend) {
                broadcast(new UpdateActivityUser($friend, 'Đang hoạt động', $checkUser))->toOthers();
            }
            //lấy địa chỉ ip và trình duyệt đang sử dụng để check đăng nhập lạ
            $request = Request::create('oauth/token', 'POST', [
                'grant_type' => 'socialite',
                'client_id' => env('PASSPORT_PASSWORD_GRANT_CLIENT_ID'),
                'client_secret' => env('PASSPORT_PASSWORD_GRANT_CLIENT_SECRET'),
                'username' => $email,
                'password' => $checkUser->password,
                'scope' => '',
            ]);
            $result = app()->handle($request);
            $response = json_decode($result->getContent(), true);
            $data  = [
                'user_id' => $checkUser->id,
                'username' => $checkUser->first_name . ' ' . $checkUser->last_name,
                'ip_address' => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null,
                'user_agent' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null,
            ];
            activity('auths')
                ->tap(function (Activity $activity) use ($data) {
                    $activity->properties = $data;
                    $activity->causer_id= $data['user_id'];
                    $activity->event = 'login';
                })
                ->log('User has been login');
            return response()->json($response, 200);
        } else {
            //đăng ký
            DB::beginTransaction();
            try {
                $username = explode('@', $email)[0] . 's';
                DB::table('users')->insert(
                    [
                        'username' => $username,
                        'password' => Hash::make(config('default.user.password')),
                        'email' => $email,
                        'first_name' => $first_name,
                        'last_name' => $last_name,
                        'avatar' => $avatar,
                        'major_id' => config('default.user.major.default'),
                        'group_id' => config('default.user.groupID.student'),
                        'status' => config('default.user.status.active'),
                    ]
                );
                DB::commit();
                $checkUser = User::where('email', $email)->first();

                $checkUser->update([
                    'activity_user' => 'Đang hoạt động'
                ]);

                $checkUser->save;

                $friends = $checkUser->friends;
                foreach ($friends as $friend) {
                    broadcast(new UpdateActivityUser($friend, 'Đang hoạt động', $checkUser))->toOthers();
                }


                $request = Request::create('oauth/token', 'POST', [
                    'grant_type' => 'socialite',
                    'client_id' => env('PASSPORT_PASSWORD_GRANT_CLIENT_ID'),
                    'client_secret' => env('PASSPORT_PASSWORD_GRANT_CLIENT_SECRET'),
                    'username' => $email,
                    'password' => $checkUser->password,
                    'scope' => '',
                ]);
                $result = app()->handle($request);
                $response = json_decode($result->getContent(), true);
                $data  = [
                    'user_id' => $checkUser->id,
                    'username' => $checkUser->first_name . ' ' . $checkUser->last_name,
                    'ip_address' => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null,
                    'user_agent' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null,
                ];
                activity('auths')
                    ->tap(function (Activity $activity) use ($data) {
                        $activity->properties = $data;
                        $activity->event = 'created';
                    })
                    ->log('User has been created');
                return response()->json($response, 200);
            } catch (\Exception $e) {
                DB::rollback();
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
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        // Kiểm tra email của người dùng
        $checkUser = User::where('email', $request->email)->first();

        DB::beginTransaction();
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {

            if (!$checkUser) {
                return response()->json(['message' => 'Email bạn nhập không đúng !'], 404);
            } else {

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
     *     path="/api/auth/confirm-password",
     *     summary="Xác minh email và mật khẩu người dùng",
     *     description="Xác minh email và mật khẩu của người dùng đang đăng nhập.",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Dữ liệu đăng nhập",
     *         @OA\JsonContent(
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Email và mật khẩu chính xác",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Email và mật khẩu chính xác"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Email và mật khẩu không khớp hoặc lỗi đăng nhập",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Email và mật khẩu không khớp"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Lỗi validation",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object", example={"email": {"The email field is required."}, "password": {"The password field is required."}}),
     *         ),
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     },
     * )
     */

    public function confirmPassword(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if (!$validator->fails()) {
            if ($user->email === $request->email && Hash::check($request->password, $user->password)) {
                // Tạo mã xác nhận mới
                $verificationCode = str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
                // $checkUser->update(['verification_code' => $verificationCode]);
                DB::table('users')->where('email', $request->email)->update(
                    [
                        'verification_code' => $verificationCode,
                    ]
                );
                Mail::to($request->email)->send(new VerifyAccount($verificationCode));
                return response()->json(['message' => 'Email và mật khẩu chính xác'], 200);
            } else {
                return response()->json(['message' => 'Email và mật khẩu không khớp'], 400);
            }
        } else {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/post-reset-password",
     *     summary="Cập nhật mật khẩu",
     *     description="Cập nhật lại mật khẩu với verification code.",
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
        } else {
            DB::table('users')->where('verification_code', $request->verification_code)->update(['password' => Hash::make($request->password)]);

            Mail::to($checkVerify->email)->send(new ForgotPassword($request->password, $checkVerify->username));
            DB::commit();
            return response()->json(['message' => 'Mật khẩu đã được đặt lại thành công'], 200);
        }
    }

    public function getUser(Request $request, $id = null)
    {
        if ($id !== null) {
            $user = User::find($id);
        } else {
            $user = $request->user();
        }
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $userData = $user->toArray();

        $user->load(['major' => function ($query) {
            $query->select('id', 'majors_name');
        }]);

        // Thêm majors_name vào mảng dữ liệu của người dùng
        $userData['majors_name'] = $user->major->majors_name;

        return response()->json(['user' => $userData], 200);
    }


    public function CheckActivityUser(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $activity  = $request->activity_user;

            $user->update([
                'activity_user' => $activity,
            ]);
            $user->save;

            $friends = $user->friends;
            foreach ($friends as $friend) {
                broadcast(new UpdateActivityUser($friend, $activity, $user))->toOthers();
            }
            DB::commit();
            $data = [
                'user_id' => $user->id,
                'activity_user' => $activity,
            ];
            return response()->json(['data' => $data], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
