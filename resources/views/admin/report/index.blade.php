@extends('admin.layouts.app')
@section('title') Quản lý Vi Phạm @endsection
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
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Danh sách vi phạm</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                {{-- <a href="{{ route('admin.blogs.create') }}" class="btn btn-primary mb-3">Tạo mới</a> --}}
                <table id="example1" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Người tố cáo</th>
                            <th>Người bị tố cáo</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Loại tố cáo</th>
                            <th>ID loại tố cao</th>
                            <th>Trạng thái báo cáo</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                     @foreach($reports as $report)
                     <tr>
                        <td style="text-align: center; vertical-align: middle;">{{$report->id}}</td>
                        <td style="text-align: center; vertical-align: middle;">{{$report->reporter->first_name}} {{$report->reporter->last_name}}</td>
                        <td style="text-align: center; vertical-align: middle;">{{$report->reported->first_name}} {{$report->reported->last_name}}</td>
                        <td style="text-align: center; vertical-align: middle;">{{$report->title}}</td>
                        <td style="text-align: center; vertical-align: middle;">{{$report->content}}</td>
                        <td style="text-align: center; vertical-align: middle;">{{$report->report_type}}</td>
                        <td style="text-align: center; vertical-align: middle;">{{$report->report_type_id}}</td>
                        <td style="text-align: center; vertical-align: middle;">{{$report->report_status}}</td>
                        <td style="text-align: center; vertical-align: middle;">{{$report->created_at}}</td>
                        <td >
                            <a href="{{ route('admin.report.show', $report->id) }}" class="btn btn-info btn-sm"><i
                                class="fa fa-eye"></i></a>
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