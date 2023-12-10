<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function GetLogActivity(Request $request)
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            // $startTime = $request->input('start_time');
            // $endTime = $request->input('end_time');
            $startTime = now()->subDays(7); // Ví dụ: 7 ngày trước
            $endTime = now();
            $Activities = Activity::where('causer_id', $userId)->whereBetween('created_at', [$startTime, $endTime])
                ->orderBy('created_at', 'desc')->get();
            DB::commit();
            return response()->json(['Activities' => $Activities, 200]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
