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

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8'
        ]);
        DB::beginTransaction();
        try{
            if(!$validator->fails()){
                //3-student, 4-guest
                $groupId = strpos($request->email, '@fpt.edu.vn') ? 3 : 4;
                $codeVerify = str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
                DB::table('users')->insert(
                    [
                        'username' => $request->username,
                        'password' => Hash::make($request->password),
                        'email' => $request->email,
                        'group_id' => $groupId,
                        'status' => 0, //lock
                        'verification_code' => $codeVerify,
                    ]
                );
                Mail::to($request->email)->send(new VerifyAccount($codeVerify));
                DB::commit();
                return response()->json(['message' => 'Đăng ký thành công'], 200);
            }else{
                return response()->json(['errors' => $validator->errors()], 422);
            }
        }catch(\Exception $e){
            DB::rollback();
            // Log::alert($e);
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
    public function verify(Request $request){
        $user = User::where('email', $request->email)->first();
        if($request->verification_code == $user->verification_code){
            $user->update(['status' => 1]);
        }else{
            return response()->json(['message' => 'Mã xác nhận không chính xác'], 400);
        }
    }
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8'
        ]);
        if(!$validator->fails()){
            if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
                $user = Auth::user();
                if($user->status == 0){
                    return response()->json(['message' => 'Tài khoản chưa được kích hoạt'], 400);
                }
                $token = $user->createToken('authToken')->accessToken;
                return response()->json(['user' => $user, 'accessToken' => $token], 200);
            }else{
                return response()->json(['message' => 'Đăng nhập thất bại'], 400);
            }
        }else{
            return response()->json(['errors' => $validator->errors()], 422);
        }
    }
}
