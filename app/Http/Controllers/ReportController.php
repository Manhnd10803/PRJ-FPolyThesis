<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Post;
use App\Models\Qa;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
  public function CreateReport(Request $request, User $user, $model, $item)
  {
    DB::beginTransaction();
    try {
      $reported_id = $user->id;
      if (!$reported_id || $reported_id === Auth::id()) {
        DB::rollBack();
        return response()->json(['message' => 'người dùng không tồn tại hoặc bạn đang tự tố cáo chính mình '], 400);
      }
      
      
      $report_title = $request->input('report_title');
      $report_content = $request->input('report_content');
      $report_image = $request->input('report_image');
      $modelName = strtolower(class_basename($model));
      switch ($modelName) {
        case 'user':
          $model = User::find($item);
          break;
        case 'post':
          $model = Post::find($item);
          break;
        case 'blog':
          $model = Blog::find($item);
          break;
        case 'qa':
          $model = Qa::find($item);
          break;
        default:
          break;
      }
      $existingReport = Report::where('reporter_id', Auth::id())
        ->where('reported_id', $reported_id)
        ->where('report_type', $modelName)
        ->where('report_type_id', $item)
        ->where('report_status', config('default.report.status.pending'))->first();
      if ($existingReport) {
        DB::rollBack();
        return response()->json(['message' => 'Bạn đã báo cáo người này trước đó'], 400);
      }
      $report = Report::create([
        'reporter_id' =>  Auth::id(),
        'reported_id' => $reported_id,
        'report_title' => $report_title,
        'report_content' => $report_content,
        'report_type' => $modelName,
        'report_type_id' => $item,
        'report_status' =>  config('default.report.status.pending'),
        'report_image' => $report_image
      ]);
      DB::commit();
      return response()->json($report, 200);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['error' => $e->getMessage()], 400);
    }
  }
}