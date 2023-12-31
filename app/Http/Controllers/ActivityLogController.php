<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use DateTime;
use DateTimeZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
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

    function convertTimezoneAndFormat($time)
    {
        $time = new DateTime($time);
        $time->setTimezone(new DateTimeZone('Asia/Ho_Chi_Minh'));
        return $time->format('Y-m-d H:i:s');
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
                $newStartTime = $this->convertTimezoneAndFormat($startTime);
                $newEndTime = $this->convertTimezoneAndFormat($endTime);
                $query->whereBetween('created_at', [$newStartTime, $newEndTime]);
            }

            $activities = $query->orderBy('created_at', 'desc')->paginate(9);

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
