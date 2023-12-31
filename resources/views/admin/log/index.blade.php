@extends('admin.layouts.app')
@section('title') Quản lý hoạt động @endsection
@section('content')
@push('css')
<link rel="stylesheet" href="../../bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
<style>
    .example-modal .modal {
        position: relative;
        top: auto;
        bottom: auto;
        right: auto;
        left: auto;
        display: block;
        z-index: 1;
    }

    .example-modal .modal {
        background: transparent !important;
    }
</style>
@endpush
@php
    $userGroupId = auth()->user()->group_id;
    $isSPAdmin = $userGroupId == config('default.user.groupID.superAdmin') ? true : false;
    if(!$isSPAdmin){
    $role_id = App\Models\UserRole::where('user_id', Auth::user()->id)->first()->role_id;
    if(!is_null($role_id)){
        $userPermission = App\Models\RolePermission::getUserPermistion($role_id);
    }
    }
@endphp
<div class="row">
    <div class="col-xs-12 mx-5">

        {{-- <div class="box">
            <div class="box-header">
                <h3 class="box-title">Tìm kiếm</h3>
            </div>
            <div class="box-body">
                <form action="{{ route('admin.reports.search') }}" method="get">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-xs-3">
                                <label for="full_name">Người tố cáo</label>
                                <input type="text" class="form-control" name="reporter_name" value="{{ old('reporter_name') }}">
                            </div>
                            <div class="col-xs-3">
                                <label for="email">Người bị tố cáo</label>
                                <input type="text" class="form-control" name="reported_name" value="{{ old('reported_name') }}">
                            </div>
                            <div class="col-xs-3">
                                <label for="major">Tiêu đề</label>
                                <input type="text" class="form-control" name="title" value="{{ old('title') }}">
                            </div>   
                            <div class="col-xs-3">
                                <label for="major">Nội dung</label>
                                <input type="text" class="form-control" name="content" value="{{ old('content') }}">
                            </div>                        
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-xs-3">
                                <label for="created_from">Ngày tạo từ</label>
                                <input type="date" class="form-control" name="created_from" value="{{ old('created_from') }}" placeholder="">
                            </div>
                            <div class="col-xs-3">
                                <label for="created_to">Đến</label>
                                <input type="date" class="form-control" name="created_to" value="{{ old('created_to') }}" placeholder="">
                            </div>
                            <div class="col-xs-2">
                                <label for="report_type">Loại tố cáo</label>
                                <select name="report_type" class="form-control">
                                    <option value="">Tất cả</option>
                                    <option value="blog" {{ old('report_type') == 'blog' ? 'selected' : '' }}>Blog</option>
                                    <option value="post" {{ old('report_type') == 'post' ? 'selected' : '' }}>Post</option>
                                    <option value="user" {{ old('report_type') == 'user' ? 'selected' : '' }}>User</option>
                                    <option value="qa" {{ old('report_type') == 'qa' ? 'selected' : '' }}>QA</option>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <label for="status">Trạng thái</label>
                                <select name="status" class="form-control">
                                    <option value="">Tất cả</option>
                                    <option value="{{ config('default.report.status.resolved') }}" {{ old('status') == config('default.report.status.resolved') ? 'selected' : '' }}>Resolved</option>
                                    <option value="{{ config('default.report.status.dismissed') }}" {{ old('status') == config('default.report.status.dismissed') ? 'selected' : '' }}>Dismissed</option>
                                </select>
                            </div>                            
                        </div>
                        <br>
                        <button type="submit" class="btn btn-primary pull-right">Tìm kiếm</button>
                    </div>
                </form>
            </div>
        </div>
         --}}
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Danh sách đăng nhập</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                {{-- <a href="{{ route('admin.blogs.create') }}" class="btn btn-primary mb-3">Tạo mới</a> --}}
                <table id="example1" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản đăng nhập</th>
                            <th>Địa chỉ IP</th>
                            <th>Thông tin máy truy cập</th>
                            <th>Thời gian truy cập</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                            $stt = 1;
                        @endphp
                        @foreach($activities as $activity)
                        @php
                        $properties = json_decode($activity->properties, true);
                        @endphp
                        <tr>
                            <td>{{ $stt++ }}</td>
                            <td>{{ $properties['username']?? ''}}</td>
                            <td>{{ $properties['ip_address']?? ''}}</td>
                            <td>{{ $properties['user_agent']?? ''}}</td>
                            <td>{{ $activity->created_at}}</td>
                            <td>
                              @if ($isSPAdmin || in_array('admin.log.destroy', $userPermission))
                                  <button type="submit" class="btn btn-danger btn-sm" data-toggle="modal"
                                      data-target="#modal-danger-{{ $activity->id }}"><i
                                          class="fa fa-trash-o"></i></button>
                                  <div class="modal fade in" id="modal-danger-{{ $activity->id }}">
                                      <div class="modal-dialog">
                                          <div class="modal-content">
                                              <div class="modal-header">
                                                  <button type="button" class="close" data-dismiss="modal"
                                                      aria-label="Close">
                                                      <span aria-hidden="true">&times;</span></button>
                                                  <h4 class="modal-title">FpolyZone</h4>
                                              </div>
                                              <div class="modal-body">
                                                  <p>Bạn có chắc muốn xóa lần đăng nhập này ? </p>
                                              </div>
                                              <div class="modal-footer">
                                                  <button type="button" class="btn btn-default  pull-left"
                                                      data-dismiss="modal">Hủy</button>
                                                  <form action="{{ route('admin.log.destroy', $activity->id) }}"
                                                      method="POST" style="display: inline-block;">
                                                      @csrf
                                                      @method('DELETE')
                                                      <button type="submit" class="btn btn-primary">Đồng
                                                          ý</button>
                                                  </form>
                                              </div>
                                          </div>
                                          <!-- /.modal-content -->
                                      </div>
                                      <!-- /.modal-dialog -->
                                  </div>
                              @endif
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@push('js')
<script src="{{ asset('bower_components/datatables.net/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>
<script>
    $(function () {
        $('#example1').DataTable()
        $('#example2').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': false
        })
    })
</script>
@endpush
@endsection