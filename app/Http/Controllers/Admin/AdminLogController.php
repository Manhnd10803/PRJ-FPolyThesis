<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class AdminLogController extends Controller
{
    public function index()
    {
        $activities  = Activity::where('log_name', 'auths')->latest()->get();
        return view('admin.log.index', compact('activities'));
    }
    public function destroy(Activity $activity)
    {
        $activity->delete();
        return redirect()->route('admin.log.index')->with('success', 'Xóa thành công');
    }
}
