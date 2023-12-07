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

    protected function applySearchFilters($query, Request $request, $includeStatusFilter = true)
    {
        $reporterName = $request->input('reporter_name');
        $reportedName = $request->input('reported_name');
        $title = $request->input('title');
        $content = $request->input('content');
        $createdFrom = $request->input('created_from');
        $createdTo = $request->input('created_to');
        $reportType = $request->input('report_type');
        $status = $request->input('status');

        if ($reporterName) {
            $nameParts = explode(' ', $reporterName);
            $query->whereHas('reporter', function ($q) use ($nameParts) {
                $q->where(function ($query) use ($nameParts) {
                    foreach ($nameParts as $part) {
                        $query->where('first_name', 'LIKE', "%$part%")
                              ->orWhere('last_name', 'LIKE', "%$part%");
                    }
                });
            });
        }

        if ($reportedName) {
            $nameParts = explode(' ', $reportedName);
            $query->whereHas('reported', function ($q) use ($nameParts) {
                $q->where(function ($query) use ($nameParts) {
                    foreach ($nameParts as $part) {
                        $query->where('first_name', 'LIKE', "%$part%")
                              ->orWhere('last_name', 'LIKE', "%$part%");
                    }
                });
            });
        }

        if ($title) {
            $query->where('report_title', 'LIKE', "%$title%");
        }

        if ($content) {
            $query->where('report_content', 'LIKE', "%$content%");
        }

        if ($createdFrom) {
            $query->whereDate('created_at', '>=', $createdFrom);
        }

        if ($createdTo) {
            $query->whereDate('created_at', '<=', $createdTo);
        }

        if ($reportType) {
            $query->where('report_type', $reportType);
        }

        if ($includeStatusFilter && $status !== null) {
            if ($status !== config('default.report.status.pending')) {
                $query->where('report_status', $status);
            }
        } elseif ($includeStatusFilter) {
            $query->whereIn('report_status', [
                config('default.report.status.resolved'),
                config('default.report.status.dismissed')
            ]);
        }
    }
    public function search(Request $request)
    {
        $request->flash();

        $query = Report::query();
        $this->applySearchFilters($query, $request);

        $reports = $query->get();

        return view('admin.report.index', compact('reports'));
    }

    public function index()
    {
        $query = Report::with('reporter:id,first_name,last_name', 'reported:id,first_name,last_name');
        $this->applySearchFilters($query, request());

        // Bổ sung điều kiện lọc chỉ lấy dữ liệu của index (loại bỏ trạng thái pending).
        $reports = $query->whereIn('report_status', [
            config('default.report.status.resolved'),
            config('default.report.status.dismissed')
        ])->get();
        return view('admin.report.index', compact('reports'));
    }
    public function pending()
    {

        $query = Report::with('reporter:id,first_name,last_name', 'reported:id,first_name,last_name')
        ->where('report_status', config('default.report.status.pending'));
    
        // Bổ sung điều kiện lọc chỉ lấy dữ liệu của pending.
        $this->applySearchFilters($query, request(), false); 

        $reports = $query->orderBy('created_at', 'desc')->get();

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
