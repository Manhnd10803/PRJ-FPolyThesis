@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Quản lý Questions and Answers</h1>

        <a href="{{ route('admin.qa.create') }}" class="btn btn-primary mb-3">Thêm Question and Answer</a>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Nội dung</th>
                    <th>User ID</th>
                    <th>Majors ID</th>
                    <th>Hashtag</th>
                    <th>Lượt xem</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($qas as $qa)
                    <tr>
                        <td>{{ $qa->id }}</td>
                        <td>{{ $qa->title }}</td>
                        <td>{{ $qa->content }}</td>
                        <td>{{ $qa->user_id }}</td>
                        <td>{{ $qa->majors_id }}</td>
                        <td>{{ $qa->hashtag }}</td>
                        <td>{{ $qa->views }}</td>
                        <td>
                            <a href="{{ route('admin.qa.edit', $qa) }}" class="btn btn-sm btn-warning">Sửa</a>
                            <form action="{{ route('admin.qa.destroy', $qa) }}" method="POST" style="display: inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Bạn có chắc chắn muốn xóa question and answer này không?')">Xóa</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection