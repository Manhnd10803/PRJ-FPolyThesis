@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h2>Danh sách Blog</h2>
            <a href="{{ route('admin.blogs.create') }}" class="btn btn-primary mb-3">Tạo mới</a>
            <table class="table">
                <thead>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Người tạo</th>
                        <th>Chuyên ngành</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($blogs as $blog)
                        <tr>
                            <td>{{ $blog->title }}</td>
                            <td>{{ $blog->user->username }}</td>
                            <td>{{ $blog->major->majors_name }}</td>
                            <td>
                                <a href="{{ route('admin.blogs.show', $blog->id) }}" class="btn btn-info btn-sm">Xem</a>
                                <a href="{{ route('admin.blogs.edit', $blog->id) }}" class="btn btn-primary btn-sm">Chỉnh sửa</a>
                                <form action="{{ route('admin.blogs.destroy', $blog->id) }}" method="POST" style="display:inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Bạn chắc chắn muốn xóa blog này chứ?')">Xóa</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            {{ $blogs->links() }}
    </div>
@endsection