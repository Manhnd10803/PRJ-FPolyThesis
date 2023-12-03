<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function viewLogin()
    {
        return view('admin.auth.login');
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ], [
            'email.required' => 'Email không được bỏ trống',
            'password.required' => 'Password không được bỏ trống'
        ]);
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::where('email', $request->email)->first();
            if ($user->group_id == 1 || $user->group_id == 2) {
                Auth::login($user);
                return redirect()->route('admin.dashboard');
            }
            return redirect()->back()->with('error', 'Không đủ quyền truy cập');
        } else {
            return redirect()->back()->with('error', 'Sai mật khẩu');
        }
    }
    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }
}
