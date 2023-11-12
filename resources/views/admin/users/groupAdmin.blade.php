@extends('admin.layouts.app')
@section('title') Nhóm quản trị @endsection
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
        @if (session('success'))
        <div class="alert alert-success alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <i class="icon fa fa-check"></i>{{ session('success') }}.
        </div>
        @elseif(session('error'))
        <div class="alert alert-danger alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <i class="icon fa fa-ban"></i>{{ session('error') }}
        </div>
        @endif
        <div class="box">
            <div class="box-header">
                <h3 class="box-title ">Danh sách nhóm admin</h3>
                @if ($isSPAdmin || in_array('admin.groups.create', $userPermission))
                <a href="{{ route('admin.groups.create') }}" class="btn btn-success btn-sm pull-right"><i class="fa fa-fw fa-arrows"></i></a>
                @endif
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <table id="example1" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên nhóm</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                            $stt = 1;
                        @endphp
                        @foreach($roles as $role)
                            <tr>
                                <td>{{ $stt }}</td>
                                <td>{{ $role->name }}</td>
                                <td>
                                    @if ($isSPAdmin || in_array('admin.groups.edit', $userPermission))
                                    <a href="{{ route('admin.groups.edit', $role->id) }}" class="btn btn-info btn-sm"><i class="fa fa-fw fa-edit"></i></a>
                                    @endif
                                    @if ($isSPAdmin || in_array('admin.groups.destroy', $userPermission))
                                        <button type="submit" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-danger{{ $role->id }}"><i class="fa fa-fw fa-remove"></i></button>
                                        <div class="modal modal-danger fade" id="modal-danger{{ $role->id }}">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span></button>
                                                    <h4 class="modal-title">FpolyZone</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Khi xóa nhóm quản trị {{ $role->name }}, toàn bộ thành viên của nhóm cũng sẽ bị xóa?</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Hủy</button>
                                                    <form action="{{ route('admin.groups.destroy', $role->id) }}" method="POST" style="display:inline">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-outline">Đồng ý</button>
                                                </form>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                </td>
                            </tr>
                            @php
                                $stt++
                            @endphp
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