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
            $startTime = $request->startDate;
            $endTime = $request->endDate;

            $query = Activity::where('log_name', $logname)->where('causer_id', $userId);

            if ($startTime && $endTime) {

                $query->whereBetween('created_at', [$startTime, $endTime]);
            }

            $activities = $query->orderBy('created_at', 'desc')->get();

            DB::commit();

            return response()->json($activities, 200);
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
    public function DeleteOneLogActivity(Activity $activity)
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            $query = Activity::where('causer_id', $userId)->where('id', $activity->id);
            $query->delete();
            DB::commit();
            return response()->json(['message' => 'Delete success'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
