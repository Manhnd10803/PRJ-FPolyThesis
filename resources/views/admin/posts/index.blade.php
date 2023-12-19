@extends('admin.layouts.app')
@section('title')
    Danh sách bài post
@endsection
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
        <div class="col-xs-12 mx-5">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Tìm kiếm</h3>
                </div>
                <div class="box-body">
                    <form action="{{ route('admin.posts.search') }}" method="get">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-xs-3">
                                    <label for="creator">Người tạo</label>
                                    <input type="text" class="form-control" name="creator" value="{{ old('creator', request('creator')) }}">
                                </div>
                                <div class="col-xs-3">
                                    <label for="joined_from">Ngày tạo từ</label>
                                    <input type="date" class="form-control" name="created_from" value="{{ old('created_from', request('created_from')) }}">
                                </div>
                                <div class="col-xs-3">
                                    <label for="joined_to">Đến</label>
                                    <input type="date" class="form-control" name="created_to" value="{{ old('created_to', request('created_to')) }}">
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
                    <h3 class="box-title">Danh sách bài post</h3>
                </div>
                <div class="box-body">

                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Người tạo</th>
                                <th>Số lượt xem</th>
                                <th>Số bình luận</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($posts as $index => $post)
                                <tr>
                                    <td>{{ $index + 1 }}</td>
                                    <td>
                                        @if ($post->user && $post->user->username)
                                            {{ $post->user->username }}
                                        @else
                                            Chưa có
                                        @endif
                                    </td>
                                    <td>{{ $post->views }}</td>
                                    <td>{{ $post->comments->count() }}<i class="fa fa-fw fa-comments-o"></i></td>
                                    <td>{{ $post->created_at }}</td>
                                    <td>
                                        <a href="{{ route('admin.posts.show', $post->id) }}" class="btn btn-info btn-sm"><i
                                                class="fa fa-eye"></i></a>
                                        {{-- @if ($post->status == config('default.post.status.approved'))
                                            <button type="submit" class="btn btn-danger btn-sm" data-toggle="modal"
                                                data-target="#modal-danger-{{ $post->id }}"><i
                                                    class="fa fa-trash-o"></i></button>
                                        @endif --}}
                                        @if ($isSPAdmin || in_array('admin.posts.destroy', $userPermission))
                                        <button type="submit" class="btn btn-danger btn-sm" data-toggle="modal"
                                                data-target="#modal-danger-{{ $post->id }}"><i
                                                    class="fa fa-trash-o"></i></button>
                                        <div class="modal fade in" id="modal-danger-{{ $post->id }}">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <button type="button" class="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                            <span aria-hidden="true">&times;</span></button>
                                                        <h4 class="modal-title">FpolyZone</h4>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Bạn có chắc muốn xóa bài viết "ID: {{ $post->id }}"? </p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default  pull-left"
                                                            data-dismiss="modal">Hủy</button>
                                                        <form action="{{ route('admin.posts.destroy', $post->id) }}"
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
