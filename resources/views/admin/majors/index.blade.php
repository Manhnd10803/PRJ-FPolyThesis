@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Quản lý Majors</h1>

        <a href="{{ route('admin.majors.create') }}" class="btn btn-primary mb-3">Thêm Major</a>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên Major</th>
                    <th>Mã Major</th>
                    <th>Mô tả</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($majors as $major)
                    <tr>
                        <td>{{ $major->id }}</td>
                        <td>{{ $major->majors_name }}</td>
                        <td>{{ $major->majors_code }}</td>
                        <td>{{ $major->description }}</td>
                        <td>
                            <a href="{{ route('admin.majors.edit', $major) }}" class="btn btn-sm btn-warning">Sửa</a>
                            <form action="{{ route('admin.majors.destroy', $major) }}" method="POST" style="display: inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Bạn có chắc chắn muốn xóa major này không?')">Xóa</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection