@extends('admin.layouts.app')
@section('title')
    {{ $title }}
@endsection
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
        if (!$isSPAdmin) {
            $role_id = App\Models\UserRole::where('user_id', Auth::user()->id)->first()->role_id;
            if (!is_null($role_id)) {
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
                    @php
                        if(request()->is('admin/blogs/approve')){
                            $route = route('admin.blogs.approve');
                        }else{
                            $route = route('admin.blogs.index');
                        }
                    @endphp
                    <form action="{{ $route }}" method="get">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-xs-5">
                                    <label for="">Tiêu đề</label>
                                    <input type="text" name="title" class="form-control" placeholder="" value="{{ !empty($params['title']) ? $params['title'] : '' }}">
                                </div>
                                <div class="col-xs-3">
                                    <label for="">Chuyên ngành</label>
                                    <select name="majors_id" id="" class="form-control">
                                        <option value="">--Chọn chuyên ngành--</option>
                                        @foreach ($majors as $major)
                                            @php
                                                if(!empty($params['majors_id'])){
                                                    $selected = ($params['majors_id'] == $major->id) ? 'selected' : '';
                                                }else{
                                                    $selected = '';
                                                }
                                            @endphp
                                            <option value="{{ $major->id }}" {{ $selected }}>{{ $major->majors_name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-xs-4">
                                    <label for="">Người tạo</label>
                                    <input type="text" name="username" class="form-control" placeholder="" value="{{ !empty($params['username']) ? $params['username'] : '' }}">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-3">
                                    <label for="">Thời gian từ</label>
                                    <input type="date" name="dateFrom" class="form-control" placeholder="" value="{{ !empty($params['dateFrom']) ? $params['dateFrom'] : '' }}">
                                </div>
                                <div class="col-xs-3">
                                    <label for="">Đến</label>
                                    <input type="date" name="dateTo" class="form-control" placeholder="" value="{{ !empty($params['dateTo']) ? $params['dateTo'] : '' }}">
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
                    <h3 class="box-title">Danh sách blog</h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    {{-- <a href="{{ route('admin.blogs.create') }}" class="btn btn-primary mb-3">Tạo mới</a> --}}
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tiêu đề</th>
                                <th>Người tạo</th>
                                <th>Chuyên ngành</th>
                                <th>Cảm xúc</th>
                                <th>Số bình luận</th>
                                <th>Rate</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $stt = 1;
                            @endphp
                            @foreach ($blogs as $blog)
                                <tr>
                                    <td>{{ $stt }}</td>
                                    <td>{{ $blog->title }}</td>
                                    <td>{{ $blog->username }}</td>
                                    <td>
                                        @if ($blog->majorCode)
                                            {{ $blog->majorCode }}
                                        @else
                                            Chưa có
                                        @endif
                                    </td>
                                    <td>{{ $blog->likes->where('emotion', 'like')->count() }}<i class="fa fa-fw fa-thumbs-o-up"></i> {{ $blog->likes->where('emotion', 'dislike')->count() }}<i class="fa fa-fw fa-thumbs-o-down"></i></td>
                                    <td>{{ $blog->comments->count() }}<i class="fa fa-fw fa-comments-o"></i></td>
                                    <td></td>
                                    <td>{{ $blog->created_at }}</td>
                                    <td>
                                        <a href="{{ route('admin.blogs.show', $blog->id) }}" class="btn btn-info btn-sm"><i
                                                class="fa fa-eye"></i></a>
                                        @if ($blog->status == config('default.blog.status.approved'))
                                            @if ($isSPAdmin || in_array('admin.blogs.statusApprove', $userPermission))
                                                <button type="submit" class="btn btn-danger btn-sm" data-toggle="modal"
                                                    data-target="#modal-default-{{ $blog->id }}"><i
                                                        class="fa fa-trash-o"></i></button>
                                            @endif
                                        @endif

                                        <div class="modal fade in" id="modal-default-{{ $blog->id }}">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <button type="button" class="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                            <span aria-hidden="true">&times;</span></button>
                                                        <h4 class="modal-title">FpolyZone</h4>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Bạn có chắc muốn xóa {{ $blog->title }}? </p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default pull-left"
                                                            data-dismiss="modal">Hủy</button>
                                                        <form action="{{ route('admin.blogs.destroy', $blog->id) }}"
                                                            method="POST" style="display:inline">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="btn btn-primary">Đồng ý</button>
                                                        </form>
                                                    </div>
                                                </div>
                                                <!-- /.modal-content -->
                                            </div>
                                            <!-- /.modal-dialog -->
                                        </div>
                                    </td>
                                </tr>
                                @php
                                    $stt ++;
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
