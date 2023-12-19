@extends('admin.layouts.app')
@section('title') Danh sách câu hỏi @endsection
@section('content')
@section('content')
    @push('css')
        <link rel="stylesheet" href="{{ asset('bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css') }}">
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
        if (!$isSPAdmin) {
            $role_id = App\Models\UserRole::where('user_id', Auth::user()->id)->first()->role_id;
            if (!is_null($role_id)) {
                $userPermission = App\Models\RolePermission::getUserPermistion($role_id);
            }
        }
    @endphp
    <div class="row">
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
        <div class="col-xs-12 mx-5">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Tìm kiếm</h3>
                </div>
                <div class="box-body">
                    <form action="{{ route('admin.qa.search') }}" method="get">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-xs-3">
                                    <label for="full_name">Tiêu đề</label>
                                    <input type="text" class="form-control" name="title" value="{{ old('title', request('title')) }}">
                                </div>
                                <div class="col-xs-3">
                                    <label for="email">Người tạo</label>
                                    <input type="text" class="form-control" name="creator" value="{{ old('creator', request('creator')) }}">
                                </div>
                                <div class="col-xs-3">
                                    <label for="major">Chuyên ngành</label>
                                    <select name="major" class="form-control">
                                        <option value="">--Chọn chuyên ngành--</option>
                                        @foreach($majors as $major)
                                            <option value="{{ $major->id }}" {{ old('major') == $major->id ? 'selected' : '' }}>{{ $major->majors_code }}</option>
                                        @endforeach
                                    </select>
                                </div>
    
                                <div class="col-xs-3">
                                    <label for="gender">Hashtag</label>
                                    <input type="text" class="form-control" name="hashtag" value="{{ old('hashtag', request('hashtag')) }}">
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
                    <h3 class="box-title">Danh sách câu hỏi</h3>
                </div>
                <div class="box-body">

                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tiêu đề</th>
                                <th>Người tạo</th>
                                <th>Chuyên ngành</th>
                                <th>Hashtag</th>
                                <th>Lượt xem</th>
                                <th>Số bình luận</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($qas as $qa)
                                <tr>
                                    <td>{{ $qa->id }}</td>
                                    <td>{{ $qa->title }}</td>
                                    <td>
                                        @if ($qa->user && $qa->user->username)
                                            {{ $qa->user->username }}
                                        @else
                                            Chưa có
                                        @endif
                                    </td>
                                    <td>
                                        @if ($qa->major && $qa->major->majors_code)
                                            {{ $qa->major->majors_code }}
                                        @else
                                            Chưa có
                                        @endif
                                    </td>
                                    <td>{{ $qa->hashtag }}</td>
                                    <td>{{ $qa->views }}</td>
                                    <td>{{ $qa->comments->count() }}<i class="fa fa-fw fa-comments-o"></i></td>
                                    <td>
                                        <a href="{{ route('admin.qa.show', $qa->id) }}" class="btn btn-info btn-sm"><i
                                                class="fa fa-eye"></i></a>
                                        @if ($isSPAdmin || in_array('admin.qa.destroy', $userPermission))
                                            <button type="submit" class="btn btn-danger btn-sm" data-toggle="modal"
                                                data-target="#modal-danger-{{ $qa->id }}"><i
                                                    class="fa fa-trash-o"></i></button>
                                            <div class="modal fade in" id="modal-danger-{{ $qa->id }}">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal"
                                                                aria-label="Close">
                                                                <span aria-hidden="true">&times;</span></button>
                                                            <h4 class="modal-title">FpolyZone</h4>
                                                        </div>
                                                        <div class="modal-body">
                                                            <p>Bạn có chắc muốn xóa câu hỏi "{{ $qa->title }}" ? </p>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-default  pull-left"
                                                                data-dismiss="modal">Hủy</button>
                                                            <form action="{{ route('admin.qa.destroy', $qa) }}"
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
            $(function() {
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
