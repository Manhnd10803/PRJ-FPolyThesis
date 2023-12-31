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
                <form action="{{ route('admin.users.search') }}" method="get">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-xs-3">
                                <label for="full_name">Họ và tên</label>
                                <input type="text" class="form-control" name="full_name" value="{{ old('full_name', request('full_name')) }}">
                            </div>
                            <div class="col-xs-3">
                                <label for="username">Username</label>
                                <input type="text" class="form-control" name="username" value="{{ old('username', request('username')) }}">
                            </div>
                            <div class="col-xs-3">
                                <label for="email">Email</label>
                                <input type="text" class="form-control" name="email" value="{{ old('email', request('email')) }}">
                            </div>
                            <div class="col-xs-3">
                                <label for="major">Chuyên ngành</label>
                                <select name="major" class="form-control">
                                    <option value="">--Chọn chuyên ngành--</option>
                                    @foreach($majors as $major)
                                        <option value="{{ $major->id }}" {{ old('major') == $major->id ? 'selected' : '' }}>{{ $major->majors_name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-xs-3">
                                <label for="joined_from">Thời gian gia nhập từ</label>
                                <input type="date" class="form-control" name="joined_from" value="{{ old('joined_from', request('joined_from')) }}" placeholder="">
                            </div>
                            <div class="col-xs-3">
                                <label for="joined_to">Đến</label>
                                <input type="date" class="form-control" name="joined_to" value="{{ old('joined_to', request('joined_to')) }}" placeholder="">
                            </div>
                            <div class="col-xs-2">
                                <label for="gender">Giới tính</label>
                                <select name="gender" class="form-control">
                                    <option value="">--Chọn giới tính--</option>
                                    <option value="Nam" {{ old('gender') == 'Nam' ? 'selected' : '' }}>Nam</option>
                                    <option value="Nữ" {{ old('gender') == 'Nữ' ? 'selected' : '' }}>Nữ</option>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <label for="user_group">Nhóm người dùng</label>
                                <select name="user_group" class="form-control">
                                    <option value="">--Chọn nhóm--</option>
                                    <option value="{{ config('default.user.groupID.student') }}" {{ old('user_group') == config('default.user.groupID.student') ? 'selected' : '' }}>Sinh viên</option>
                                    <option value="{{ config('default.user.groupID.guest') }}" {{ old('user_group') == config('default.user.groupID.guest') ? 'selected' : '' }}>Khách</option>
                                </select>
                            </div>
                            <div class="col-xs-2">
                                <label for="status">Trạng thái</label>
                                <select name="status" class="form-control">
                                    <option value="{{ config('default.user.status.active') }}" {{ old('status') == config('default.user.status.active') ? 'selected' : '' }}>Hoạt động</option>
                                    <option value="{{ config('default.user.status.suspend') }}" {{ old('status') == config('default.user.status.suspend') ? 'selected' : '' }}>Đã khóa</option>
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
                                <td>{{ $user->first_name . ' '. $user->last_name }}</td>
                                <td>{{ $user->username }}</td>
                                <td>
                                    {{ $user->gender }}
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
                                            <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default{{ $user->id }}"><i class="fa fa-fw fa-lock"></i></button>
                                            <div class="modal fade in" id="modal-default{{ $user->id }}">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                            <h4 class="modal-title">FpolyZone</h4>
                                                        </div>
                                                        <div class="modal-body">
                                                            <p>Bạn có chắc muốn khóa tài khoản {{ $user->username }}, hãy nhập lý do? </p>
                                                            <form action="{{ route('admin.users.lock', $user->id) }}" method="POST" id="lockForm{{ $user->id }}" style="display:inline">
                                                                <input type="text" name="reason" id="reasonInput{{ $user->id }}" class="form-control" style="width:100%" required>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Hủy</button>
                                                            @csrf
                                                            @method('PUT')
                                                            <button type="submit" class="btn btn-primary" id="confirmButton{{ $user->id }}" disabled>Đồng ý</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                    
                                            <!-- Thêm đoạn script kiểm tra giá trị trường input -->
                                            <script>
                                                document.getElementById('reasonInput{{ $user->id }}').addEventListener('input', function() {
                                                    var reasonValue = this.value.trim();
                                                    var confirmButton = document.getElementById('confirmButton{{ $user->id }}');
                                                    confirmButton.disabled = reasonValue === '';
                                                });
                                            </script>
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