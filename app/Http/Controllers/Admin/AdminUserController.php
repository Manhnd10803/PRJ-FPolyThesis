<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\RolePermission;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Major;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use Illuminate\Database\Eloquent\Builder;

class AdminUserController extends Controller
{

    public function __construct()
    {
        $this->middleware('authAdmin');
    }
    //Search User

    public function searchUser(Request $request)
    {
        $request->flash();
        $majors = Major::all();
        $query = User::whereIn('group_id', [config('default.user.groupID.student'), config('default.user.groupID.guest')])->orderByDesc('id');
        if ($request->filled('full_name')) {
            $full_name = $request->input('full_name');
            $query->where(function (Builder $query) use ($full_name) {
                $query->whereRaw('CONCAT(first_name, " ", last_name) LIKE ?', ["%$full_name%"])
                    ->orWhere('first_name', 'like', "%$full_name%")
                    ->orWhere('last_name', 'like', "%$full_name%");
            });
        }

        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->input('email') . '%');
        }

        if ($request->filled('username')) {
            $query->where('username', 'like', '%' . $request->input('username') . '%');
        }

        if ($request->filled('major')) {
            $query->where('major_id', $request->input('major'));
        }

        if ($request->filled('gender')) {
            $query->where('gender', $request->input('gender'));
        }

        if ($request->filled('joined_from')) {
            $query->whereDate('created_at', '>=', $request->input('joined_from'));
        }

        if ($request->filled('joined_to')) {
            $query->whereDate('created_at', '<=', $request->input('joined_to'));
        }

        if ($request->filled('user_group')) {
            $query->where('group_id', $request->input('user_group'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $users = $query->get();

        return view('admin.users.index', compact('users', 'majors'));
    }

    //User
    public function listUser()
    {
        $majors = Major::all();
        // dd($majors);
        $users = User::whereIn('group_id', [config('default.user.groupID.student'), config('default.user.groupID.guest')])->orderByDesc('id')->get();
        return view('admin.users.index', compact('users', 'majors'));
    }
    public function lockUser(User $user)
    {
        $user->update(['status' => config('default.user.status.suspend')]);
        return redirect()->back()->with('success', 'Khóa người dùng thành công');
    }
    public function unlockUser(User $user)
    {
        $user->update(['status' => config('default.user.status.active')]);
        return redirect()->back()->with('success', 'Mở khóa người dùng thành công');
    }
    //Group Member
    public function listGroup()
    {
        $roles = Role::all();
        return view('admin.users.groupAdmin', compact('roles'));
    }
    public function createGroup()
    {
        return view('admin.users.createGroupAdmin');
    }
    public function storeGroup(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles',
        ]);
        DB::beginTransaction();
        try {
            // Thêm nhóm 
            $role = Role::create([
                'name' => $request->name,
            ]);
            // Thêm quyền cho mỗi permission trong mảng
            foreach ($request->permission as $permission) {
                RolePermission::create([
                    'role_id' => $role->id,
                    'permission' => $permission,
                ]);
            }
            DB::commit();
            return redirect()->route('admin.groups.list')->with('success', 'Thêm thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.groups.list')->with('error', 'Có lỗi xảy ra');
        }
    }
    public function editGroup(Role $role)
    {
        $permission = RolePermission::getUserPermistion($role->id);
        return view('admin.users.editGroupAdmin', compact('permission', 'role'));
    }
    public function updateGroup(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required',
        ]);
        DB::beginTransaction();
        try {
            // Thêm nhóm 
            $role->update([
                'name' => $request->name,
            ]);
            RolePermission::where('role_id', $role->id)->delete();
            // Thêm quyền cho mỗi permission trong mảng
            foreach ($request->permission as $permission) {
                RolePermission::create([
                    'role_id' => $role->id,
                    'permission' => $permission,
                ]);
            }
            DB::commit();
            return redirect()->route('admin.groups.list')->with('success', 'Sửa thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.groups.list')->with('error', 'Có lỗi xảy ra');
        }
    }
    public function destroyGroup(Role $role)
    {
        DB::beginTransaction();
        try {
            RolePermission::where('role_id', $role->id)->delete();
            UserRole::where('role_id', $role->id)->delete();
            $role->delete();
            DB::commit();
            return redirect()->route('admin.groups.list')->with('success', 'Xóa thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.groups.list')->with('error', 'Có lỗi xảy ra');
        }
    }
    public function listMember()
    {
        $userRoles = UserRole::all();
        return view('admin.users.listMember', compact('userRoles'));
    }
    public function createMember()
    {
        $roles = Role::all();
        return view('admin.users.createMember', compact('roles'));
    }
    public function getInforMember($email)
    {
        $user = User::where('email', $email)->first();
        $major = $user->major->majors_name;
        $userInfo = [
            'username' => $user->username,
            'name' => $user->first_name . ' ' . $user->last_name,
            'birthday' => $user->birthday,
            'major' => $major,
        ];
        return response()->json($userInfo);
    }
    public function storeMember(Request $request)
    {
        $request->validate([
            'email' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $user = User::where('email', $request->email)->first();
            $user->update(['group_id' => config('default.user.groupID.admin')]);
            UserRole::create([
                'user_id' => $user->id,
                'role_id' => $request->role
            ]);
            DB::commit();
            return redirect()->route('admin.members.list')->with('success', 'Thêm thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.members.list')->with('error', 'Có lỗi xảy ra');
        }
    }
    public function editMember(UserRole $member)
    {
        $roles = Role::all();
        return view('admin.users.editMember', compact('member', 'roles'));
    }
    public function updateMember(Request $request)
    {
        $request->validate([
            'email' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $user = User::where('email', $request->email)->first();
            UserRole::where('user_id', $user->id)->update(['role_id' => $request->role]);
            DB::commit();
            return redirect()->route('admin.members.list')->with('success', 'Sửa thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.members.list')->with('error', 'Có lỗi xảy ra');
        }
    }
    public function destroyMember(UserRole $member)
    {
        DB::beginTransaction();
        try {
            $user = User::where('id', $member->user_id)->first();
            $groupId = strpos($user->email, '@fpt.edu.vn') ? config('default.user.groupID.student') : config('default.user.groupID.guest');
            $user->update(['group_id' =>  $groupId]);
            $member->delete();
            DB::commit();
            return redirect()->route('admin.members.list')->with('success', 'Xóa thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->route('admin.members.list')->with('error', 'Có lỗi xảy ra');
        }
    }
    public function getChartUserData()
    {
        $data = User::select(
            DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
            DB::raw('count(*) as user_count')
        )
            ->where('group_id', '<>', 1)
            ->groupBy('month')
            ->orderBy('month') // Sắp xếp theo thứ tự tăng dần theo tháng
            ->get();
        // return $data;
        $accumulatedData = [];
        $totalUsers = 0;

        foreach ($data as $item) {
            $totalUsers += $item->user_count;
            $accumulatedData[] = [
                'y' => $item->month,
                'item1' => $totalUsers,
            ];
        }

        return response()->json($accumulatedData);
    }
}
