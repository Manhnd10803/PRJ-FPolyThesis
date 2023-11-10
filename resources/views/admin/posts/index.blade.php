@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Quản lý Posts</h1>

        <a href="{{ route('admin.posts.create') }}" class="btn btn-primary mb-3">Thêm Post</a>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Nội dung</th>
                    <th>Feeling</th>
                    <th>Hashtag</th>
                    <th>Trạng thái</th>
                    <th>Lượt xem</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($posts as $post)
                    <tr>
                        <td>{{ $post->id }}</td>
                        <td>{{ $post->user_id }}</td>
                        <td>{{ $post->content }}</td>
                        <td>{{ $post->feeling }}</td>
                        <td>{{ $post->hashtag }}</td>
                        <td>{{ $post->status }}</td>
                        <td>{{ $post->views }}</td>
                        <td>
                            <a href="{{ route('admin.posts.edit', $post) }}" class="btn btn-sm btn-warning">Sửa</a>
                            <form action="{{ route('admin.posts.destroy', $post) }}" method="POST" style="display: inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Bạn có chắc chắn muốn xóa post này không?')">Xóa</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection