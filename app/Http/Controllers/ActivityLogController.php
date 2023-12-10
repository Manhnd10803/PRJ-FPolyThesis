<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function GetLogName()
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            $logNames = Activity::select('log_name')
                ->where('causer_id', $userId)
                ->groupBy('log_name')
                ->get();
            DB::commit();
            return response()->json(['logNames' => $logNames], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function GetLogActivity(Request $request, $logname)
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            $startTime = $request->input('start_time');
            $endTime = $request->input('end_time');
            $query = Activity::where('causer_id', $userId)
                ->whereBetween('created_at', [$startTime, $endTime])
                ->orderBy('created_at', 'desc');
            if ($logname) {
                $query->where('log_name', $logname);
            }
            $Activities = $query->get();
            DB::commit();
            return response()->json(['Activities' => $Activities], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function DeleteLogActivity($logname)
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            $query = Activity::where('causer_id', $userId)->where('log_name', $logname);
            $query->delete();
            DB::commit();
            return response()->json(['message' => 'Delete success'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
