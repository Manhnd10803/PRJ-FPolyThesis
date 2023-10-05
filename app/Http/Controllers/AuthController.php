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
            return response()->json(['message' => 'User not updated','user'=>$user], 400);
        }
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message','Delete Successful']);
    }
    public function login(LoginRequest $request){
        $credentials = $request->only('username','password');
        if(Auth::attempt($credentials)){
            $user = Auth::user();
            $token = $user->createToken('MyApp')->accessToken;

            return response()->json(['token' => $token]);
        }
        return response()->json(['message' => 'Unauthorized'], 401);
    }
    public function logout(){
         Auth::logout();
    return response()->json(['message' => 'Đăng xuất thành công']);
    }
}