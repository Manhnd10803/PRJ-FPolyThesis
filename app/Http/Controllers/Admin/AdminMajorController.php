<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Major;
use Illuminate\Http\Request;

class AdminMajorController extends Controller
{
    public function __construct()
    {
        $this->middleware('authAdmin');
    }
    //Admin web
    public function index()
    {
        $majors = Major::latest()->get();
        return view('admin.majors.index', compact('majors'));
    }
    public function create()
    {
        return view('admin.majors.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'majors_name' => 'required|string|max:255|unique:majors',
            'majors_code' => 'required|unique:majors',
            'description' => 'nullable|string',
        ], [
            'majors_name.required' => 'Tên chuyên ngành không được để trống.',
            'majors_name.max' => 'Tên chuyên ngành không được vượt quá :max ký tự.',
            'majors_name.unique' => 'Tên chuyên ngành đã tồn tại trong hệ thống.',
            'majors_code.required' => 'Mã chuyên ngành không được để trống.',
            'majors_code.unique' => 'Mã chuyên ngành đã tồn tại trong hệ thống.',
            // Thêm các thông báo khác tại đây...
        ]);
        // $majors_code = sprintf('%05d', rand(1, 99999));
        // // Kiểm tra xem majors_code đã tồn tại chưa, nếu có thì tạo lại
        // while (Major::where('majors_code', $majors_code)->exists()) {
        //     $majors_code = sprintf('%05d', rand(1, 99999));
        // }

        // Thêm mới bản ghi với majors_code đã sinh
        Major::create([
            'majors_name' => $request->majors_name,
            'majors_code' => $request->majors_code,
            'description' => $request->description,
        ]);
        return redirect()->route('admin.majors.index')->with('success', 'Thêm thành công chuyên ngành mới.');
    }

    public function edit(Major $major)
    {
        return view('admin.majors.edit', compact('major'));
    }

    public function update(Request $request, Major $major)
    {
        $request->validate([
            'majors_name' => 'required|string|max:255|unique:majors,majors_name,' . $major->id,
            'description' => 'nullable|string',
        ], [
            'majors_name.required' => 'Tên chuyên ngành không được để trống.',
            'majors_name.max' => 'Tên chuyên ngành không được vượt quá :max ký tự.',
            'majors_name.unique' => 'Tên chuyên ngành đã tồn tại trong hệ thống.',
            // Thêm các thông báo khác tại đây...
        ]);

        $major->update($request->only(['majors_name', 'majors_code', 'description']));
        return redirect()->route('admin.majors.index')->with('success', 'Chuyên ngành đã được chỉnh sửa thành công.');
    }
    public function destroy(Major $major)
    {
        $major->delete();
        return redirect()->route('admin.majors.index')->with('success', 'Xóa thành công chuyên ngành.');
    }
}
