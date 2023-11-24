@extends('admin.layouts.app')
@section('title') Quản lý User @endsection
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
                <h3 class="box-title">Tìm kiếm</h3>
            </div>
            <div class="box-body">
                <form action="" method="get">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-xs-3">
                                <label for="">Họ và tên</label>
                                <input type="text" class="form-control" placeholder="">
                            </div>
                            <div class="col-xs-3">
                                <label for="">Email</label>
                                <input type="text" class="form-control" placeholder="">
                            </div>
                            <div class="col-xs-3">
                                <label for="">Chuyên ngành</label>
                                <select name="" id="" class="form-control">
                                    <option value="">--Chọn chuyên ngành--</option>
                                </select>
                            </div>
                            <div class="col-xs-3">
                                <label for="">Giới tính</label>
                                <select name="" id="" class="form-control">
                                    <option value="">--Chọn giới tính--</option>
                                </select>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-xs-3">
                                <label for="">Thời gian gia nhập từ</label>
                                <input type="date" class="form-control" placeholder="">
                            </div>
                            <div class="col-xs-3">
                                <label for="">Đến</label>
                                <input type="date" class="form-control" placeholder="">
                            </div>
                            <div class="col-xs-2">
                                <label for="">Nhóm người dùng</label>
                                <select name="" id="" class="form-control">
                                    <option value="">--Chọn nhóm--</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <label for="">Trạng thái</label>
                                <select name="" id="" class="form-control">
                                    <option value="">Hoạt động</option>
                                    <option value="">Đã khóa</option>
                                </select>
                            </div>
                        </div>
                        <br>
                        <button type="submit" class="btn btn-primary pull-right">Tìm kiếm</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Danh sách người dùng</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                {{-- <a href="{{ route('admin.blogs.create') }}" class="btn btn-primary mb-3">Tạo mới</a> --}}
                <table id="example1" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Username</th>
                            <th>Giới tính</th>
                            <th>Email</th>
                            <th>Ngành học</th>
                            <th>Phone</th>
                            <th>Ngày sinh</th>
                            <th>Nhóm người dùng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                            $stt = 1;
                        @endphp
                        @foreach($users as $user)
                            <tr>
                                <td>{{ $stt }}</td>
                                <td>{{ $user->last_name . ' '. $user->first_name }}</td>
                                <td>{{ $user->username }}</td>
                                <td>
                                    @if ($user->gender == config('default.user.gender.male'))
                                        Nam
                                    @elseif($user->gender == config('default.user.gender.female'))
                                        Nữ
                                    @endif
                                </td>
                                <td>{{ $user->email }}</td>
                                <td>
                                    @if ($user->major_id)
                                    {{ $user->major->majors_name }}
                                    @endif
                                </td>
                                <td>{{ $user->phone }}</td>
                                <td>{{ $user->birthday }}</td>
                                <td>
                                    @if ($user->group_id == config('default.user.groupID.student'))
                                        Sinh viên
                                    @elseif($user->group_id == config('default.user.groupID.guest'))
                                        Khách
                                    @endif
                                </td>
                                <td>
                                    @if ($user->status == config('default.user.status.suspend'))
                                    @if ($isSPAdmin || in_array('admin.users.unlock', $userPermission))
                                        <form action="{{ route('admin.users.unlock', $user->id) }}" method="post">
                                            @csrf
                                            @method('PUT')
                                            <button type="submit" class="btn btn-info btn-sm" data-toggle="modal"><i class="fa fa-fw fa-unlock"></i></button>
                                        </form>
                                    @endif
                                    @else
                                    @if ($isSPAdmin || in_array('admin.users.lock', $userPermission))
                                        <button type="submit" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-danger{{ $user->id }}"><i class="fa fa-fw fa-lock"></i></button>
                                        <div class="modal modal-danger fade" id="modal-danger{{ $user->id }}">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span></button>
                                                    <h4 class="modal-title">FpolyZone</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Bạn có chắc muốn khóa tài khoản {{ $user->username }}? </p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Hủy</button>
                                                    <form action="{{ route('admin.users.lock', $user->id) }}" method="POST" style="display:inline">
                                                    @csrf
                                                    @method('PUT')
                                                    <button type="submit" class="btn btn-outline">Đồng ý</button>
                                                </form>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
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