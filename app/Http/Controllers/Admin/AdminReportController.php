<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;

class AdminReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('authAdmin');
    }
    public function index()
    {
        $reports = Report::with('reporter:id,first_name,last_name', 'reported:id,first_name,last_name')
            ->whereIn('report_status', [
                config('default.report.status.resolved'),
                config('default.report.status.dismissed')
            ])->orderBy('created_at', 'desc')->get();
        return view('admin.report.index', compact('reports'));
    }
    public function pending()
    {
        $reports  = Report::with('reporter:id,first_name,last_name', 'reported:id,first_name,last_name')
            ->where('report_status', config('default.report.status.pending'))
            ->orderBy('created_at', 'desc')
            ->get();
        return view('admin.report.index', compact('reports'));
    }
    public function show(Report $report)
    {
        $report = Report::with('reporter:id,first_name,last_name,avatar', 'reported:id,first_name,last_name,avatar')->find($report->id);
        return view('admin.report.show', compact('report'));
    }
    public function ResolvedReport(Report $report)
    {
        $report->update(['report_status' => config('default.report.status.resolved')]);
        return redirect()->route('admin.report.show', ['report' => $report->id])
            ->with('redirect', route('admin.report.index'));
    }
    public function DismissedReport(Report $report)
    {
        $report->update(['report_status' => config('default.report.status.dismissed')]);
        return redirect()->route('admin.report.show', ['report' => $report->id])
            ->with('redirect', route('admin.report.pending')); 
    }
    public function CountPendingReports()
    {
        $count = Report::where('report_status', config('default.report.status.pending'))->count();
        return $count;
    }
    public function DeleteReport(Report $report)
    {
        $report->delete();
        return redirect()->route('admin.report.index');
    }
}
