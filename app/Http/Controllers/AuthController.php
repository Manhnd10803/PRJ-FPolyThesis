<?php

namespace App\Http\Controllers;

use App\Events\UserCreatedEvent;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
       $users  =User::all();
       return response()->json($users);
    }
    public function store(CreateUserRequest $request)
    {
        $param = $request->all();
        $param['password']  = bcrypt($request->password);
        $user = User::create($param);
        if($user){
            return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
        }
            return response()->json(['message' => 'User registered faile'],401);
        
    }
    public function show(User $user)
    {
        return response()->json($user);
    }
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        if ($user->wasChanged()) {
            return response()->json(['message' => 'User updated successfully', 'user' => $user]);
        } else {
            return response()->json(['message' => 'User not updated'], 400);
        }
    }
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message','Delete Successful']);
    }
    public function login(LoginRequest $request){
        $credentials = $request->only('email','password');
        if(Auth::attempt($credentials)){
            $user = Auth::user();
            return response()->json(['message'=> 'Đăng nhập thành công','user' => $user]);
        }
        return response()->json(['message' => 'Đăng nhập thất bại'], 401);
    }
    public function logout(){
         Auth::guard('api')->logout();
    return response()->json(['message' => 'Đăng xuất thành công']);
    }
}