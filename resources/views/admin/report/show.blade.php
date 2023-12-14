@extends('admin.layouts.app')
@section('title')
    Chi tiết {{$report->report_title }}
@endsection
@section('content')
    @php
        $userGroupId = auth()->user()->group_id;
        $isSPAdmin = $userGroupId == config('default.user.groupID.superAdmin') ? true : false;
        if (!$isSPAdmin) {
            $role_id = App\Models\UserRole::where('user_id', Auth::user()->id)->first()->role_id;
            if (!is_null($role_id)) {
                $userPermission = App\Models\RolePermission::getUserPermistion($role_id);
            }
        }
    @endphp
    <div class="row">
        <div class="col-md-12">
            <!-- The time line -->
            <ul class="timeline">
                <!-- timeline atime label -->
                <li class="time-label">
                    <span class="bg-red">
                        {{ $report->created_at->format('d M. Y') }}
                    </span>
                    {{-- <span class="btn btn-aqua pull-right"><a href="/profile/{{ $report->reported_id }}">Xem tại phía người dùng</a></span> --}}
                    <td style="text-align: left; vertical-align: middle;">
                        @if ($report->report_type === "blog")
                            <span class="btn btn-aqua pull-left"><a href="/blog/{{ $report->report_type_id }}">Xem tại phía người dùng</a></span>
                        @elseif ($report->report_type === "qa")
                            <span class="btn btn-aqua pull-left"><a href="/quests/{{ $report->report_type_id }}">Xem tại phía người dùng</a></span>
                        @elseif ($report->report_type === "user")
                            <span class="btn btn-aqua pull-left"><a href="/profile/{{ $report->report_type_id }}">Xem tại phía người dùng</a></span>
                        @elseif ($report->report_type === "comment")
                            <span class="btn btn-aqua pull-left"><a href="/comment/{{ $report->report_type_id }}">Xem tại phía người dùng</a></span>
                        @elseif ($report->report_type === "post")
                            <span class="btn btn-aqua pull-left"><a href="/post/{{ $report->report_type_id }}">Xem tại phía người dùng</a></span>
                        @endif
                        
                    </td>
                </li>
                <li>
                  <i class=" fa fa-pencil"></i>
                    <div class="timeline-item">
                        <h3 class="timeline-header">
                          Tiêu đề
                        </h3>
                        <div class="timeline-body">
                          {{$report->report_title}}
                        </div>
                    </div>
                </li>
                <li>
                    <i class="fa fa-book bg-light-blue"></i>
                    <div class="timeline-item">
                        <h3 class="timeline-header">
                            Nội dung
                        </h3>
                        <div class="timeline-body ">
                            {{$report->report_content}}
                        </div>
                        <div class="timeline-footer">
                        </div>
                    </div>
                </li>
                @if($report->report_image)
                <li>
                    <i class="fa fa-camera bg-purple"></i>
                    <div class="timeline-item">
                        <h3 class="timeline-header">Hình ảnh</h3>
                        <div class="timeline-body" style="display: flex;justify-content: center">
                            <img src="{{ $report->report_image }}" alt="..." class="margin" width="400" height="350"
                                style="border-radius: 3%">
                        </div>
                    </div>
                </li>
              @endif
              @if($report->report_status  == config('default.report.status.pending'))
              <li>
                <i class="fa fa-spinner fa-spin" style="background-color: #ffc107"></i>
                <div class="timeline-item">
                    <h3 class="timeline-header">
                        Trạng thái ( Đang xem xét)
                    </h3>
                    <div class="timeline-body" style="display:flex;justify-content:space-evenly;">
                        @if ($isSPAdmin || in_array('admin.report.statusResolved', $userPermission))
                            <span class="time">
                                <input type="button" class="btn btn-success" value="Chấp nhận báo cáo" data-toggle="modal" data-target="#modal-success">
                                <div class="modal modal-success fade" id="modal-success">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                <h4 class="modal-title">FpolyZone</h4>
                                            </div>
                                            <div class="modal-body">
                                                <p>Bạn có chắc muốn chấp nhận báo cáo về nội dung bài {{$report->report_type}} có id là {{$report->report_type_id}} do người dùng  {{$report->reporter->first_name}} {{$report->reporter->last_name}} báo cáo
                                                </p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Hủy</button>
                                                <form action="{{ route('admin.report.statusResolved', ['report' => $report->id]) }}" method="post" style="display: inline;">
                                                    @csrf
                                                    @method('PUT')
                                                    <button type="submit" class="btn btn-outline">Đồng ý</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        @endif
                        @if ($isSPAdmin || in_array('admin.report.statusDismissed', $userPermission))
                        <span class="time">
                            <input type="button" class="btn btn-danger" value="Hủy báo cáo" data-toggle="modal" data-target="#modal-danger">
                            <div class="modal modal-danger fade" id="modal-danger">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <h4 class="modal-title">FpolyZone</h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>Bạn có chắc muốn hủy báo cáo về nội dung bài {{$report->report_type}} có id là {{$report->report_type_id}} do người dùng  {{$report->reporter->first_name}} {{$report->reporter->last_name}} báo cáo
                                            </p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Hủy</button>
                                            <form action="{{ route('admin.report.statusDismissed', ['report' => $report->id]) }}" method="post" style="display: inline;">
                                                @csrf
                                                @method('PUT')
                                                <button type="submit" class="btn btn-outline">Đồng ý</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    @endif
                    </div>                  
                    <div class="timeline-footer">
                    </div>
                </div>
            </li>
              @elseif($report->report_status == config('default.report.status.resolved'))
              <li>
                <i class="fa fa-check bg-green"></i>
                <div class="timeline-item">
                    <h3 class="timeline-header">
                        Trạng thái ( Chấp Nhận )
                    </h3>
                    <div class="timeline-body ">
                        Admin đã chấp nhận báo cáo của người dùng <strong>{{$report->reporter->first_name}} {{$report->reporter->last_name}}</strong> đối với người dùng <strong>{{$report->reported->first_name}} {{$report->reported->last_name}}</strong> về hành vi " {{$report->report_title}} ".
                    </div>
                    <div class="timeline-footer">
                    </div>
                </div>
              </li>
                @elseif($report->report_status == config('default.report.status.dismissed'))
                <li>
                <i class="fa fa-times bg-red"></i>
                <div class="timeline-item">
                    <h3 class="timeline-header">
                        Trạng thái ( Không chấp nhận )
                    </h3>
                    <div class="timeline-body " >
                      Admin không chấp nhận báo cáo của người dùng <strong>{{$report->reporter->first_name}} {{$report->reporter->last_name}}</strong> đối với người dùng <strong>{{$report->reported->first_name}} {{$report->reported->last_name}}</strong> về hành vi " {{$report->report_title}} ".  <br><br>
                      @if ($isSPAdmin || in_array('admin.report.delete', $userPermission))
                      <span class="time">
                          <input type="button" class="btn btn-danger" value="Xóa báo cáo này" data-toggle="modal" data-target="#modal-delete">
                          <div class="modal modal-danger fade" id="modal-delete">
                              <div class="modal-dialog">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                          </button>
                                          <h4 class="modal-title">FpolyZone</h4>
                                      </div>
                                      <div class="modal-body">
                                          <p>Bạn có chắc muốn xóa báo cáo về nội dung bài {{$report->report_type}} có id là {{$report->report_type_id}} do người dùng  {{$report->reporter->first_name}} {{$report->reporter->last_name}} báo cáo
                                          </p>
                                      </div>
                                      <div class="modal-footer">
                                          <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Hủy</button>
                                          <form action="{{ route('admin.report.delete', ['report' => $report->id]) }}" method="post" style="display: inline;">
                                              @csrf
                                              @method('DELETE')
                                              <button type="submit" class="btn btn-outline">Đồng ý</button>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </span>
                  @endif
                    </div>
                    <div class="timeline-footer">
                    </div>
                </div>
            </li>
            @endif
            </ul>
        </div>
    </div>
    <script>
        var redirectUrl = "{{ session('redirect') }}";
        if (redirectUrl) {
            setTimeout(function () {
                window.location.href = redirectUrl;
            }, 3000);
        }
    </script>
    
@endsection
