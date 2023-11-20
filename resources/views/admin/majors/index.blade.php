@extends('admin.layouts.app')
@section('title')
    Danh sách chuyên ngành
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
                <div style="display: flex;justify-content: space-between;padding: 10px 10px;align-items: center">
                    <h4>Danh sách chuyên ngành</h4>
                    @if ($isSPAdmin || in_array('admin.majors.create', $userPermission))
                        <a class="btn btn-success" href="{{ route('admin.majors.create') }}"><i class="fa fa-plus"></i> Thêm
                            chuyên
                            ngành</a>
                    @endif
                </div>
                <div class="box-body">
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên chuyên ngành</th>
                                <th>Mã chuyên ngành</th>
                                <th>Mô tả</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($majors as $index => $major)
                                <tr>
                                    <td>{{ $index + 1 }}</td>
                                    <td>{{ $major->majors_name }}</td>
                                    <td>{{ $major->majors_code }}</td>
                                    <td>
                                        @if ($major->description)
                                            {{ $major->description }}
                                        @else
                                            Chưa thêm
                                        @endif
                                    </td>
                                    <td>
                                        @if ($isSPAdmin || in_array('admin.majors.edit', $userPermission))
                                            <a href="{{ route('admin.majors.edit', $major) }}"
                                                class="btn btn-sm btn-warning"><i class="fa fa-edit "></i></a>
                                        @endif
                                        @if ($isSPAdmin || in_array('admin.majors.destroy', $userPermission))
                                        <button type="submit" class="btn btn-danger btn-sm" data-toggle="modal"
                                            data-target="#modal-danger-{{ $major->id }}"><i
                                                class="fa fa-trash-o"></i></button>
                                        <div class="modal modal-danger fade" id="modal-danger-{{ $major->id }}">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <button type="button" class="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                            <span aria-hidden="true">&times;</span></button>
                                                        <h4 class="modal-title">FpolyZone</h4>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Bạn có chắc muốn xóa {{ $major->majors_name }}? </p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-outline pull-left"
                                                            data-dismiss="modal">Hủy</button>
                                                        <form action="{{ route('admin.majors.destroy', $major) }}"
                                                            method="POST" style="display: inline-block;">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="btn btn-outline">Đồng
                                                                ý</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
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
