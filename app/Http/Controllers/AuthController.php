<?php

namespace App\Http\Controllers;

use App\Mail\VerifyAccount;
use App\Models\User;
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
                return response()->json(['message' => 'Đăng ký thành công'], 201);
            } else {
                return response()->json(['errors' => $validator->errors()], 422);
            }
        } catch (\Exception $e) {
            DB::rollback();
            // Log::alert($e);
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    public function verify(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($request->verification_code == $user->verification_code) {
            $user->update(['status' => config('default.user.status.active')]);
        } else {
            return response()->json(['message' => 'Mã xác nhận không chính xác'], 403);
        }
    }
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
                $token = $user->createToken('authToken')->accessToken;
                return response()->json(['user' => $user, 'accessToken' => $token], 200);
            } else {
                return response()->json(['message' => 'Đăng nhập thất bại'], 400);
            }
        } else {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    }
    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens->each(function ($token) {
            $token->delete();
        });
        return response()->json(['message' => 'Đăng xuất thành công'], 200);
    }
    public function googleAuth()
    {
        $redirectUrl = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
        return response()->json(['googleLoginUrl' => $redirectUrl]);
    }
    public function googleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();
        $checkUser = User::where('email', $user->email)->first();
        if ($checkUser) {
            //đăng nhập 
            if ($checkUser->status == config('default.user.status.lock')) {
                return response()->json(['message' => 'Tài khoản chưa được kích hoạt'], 403);
            } else {
                Auth()->login($checkUser);
                $token = $checkUser->createToken('authToken')->accessToken;
                return response()->json(['user' => $user, 'accessToken' => $token], 200);
            }
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
    public function forgotPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);
        DB::beginTransaction();
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        try{
            // Kiểm tra email của người dùng
            $checkUser = User::where('email', $request->email)->first();
            if (!$checkUser) {
                return response()->json(['message' => 'Email bạn nhập không đúng !'], 404);
            }else{
                
                // Tạo mã xác nhận mới
                $verificationCode = str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
                // $checkUser->update(['verification_code' => $verificationCode]);
                DB::table('users')->where('email', $request->email)->update(['verification_code' => $verificationCode]);
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
    
    public function resetPassword(Request $request)
    {
        
        $checkUser = User::where('email', $request->email)->first();
        if (!$checkUser || $request->verification_code != $checkUser->verification_code) {
            return response()->json(['message' => 'Mã xác nhận không chính xác'], 403);
        }
        // $checkUser->update(['password' => Hash::make($request->password)]);
        DB::table('users')->where('email', $request->email)->update(['password' => Hash::make($request->password)]);
        return response()->json(['message' => 'Mật khẩu đã được đặt lại thành công'], 200);
    }
}
