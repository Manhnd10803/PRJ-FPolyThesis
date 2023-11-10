@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Chỉnh Sửa Post</h1>

        <form action="{{ route('admin.posts.update', $post) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="user_id">User ID:</label>
                <input type="number" class="form-control" id="user_id" name="user_id" value="{{ old('user_id', $post->user_id) }}" required>
            </div>
            <div class="form-group">
                <label for="content">Nội dung:</label>
                <textarea class="form-control" id="content" name="content" required>{{ old('content', $post->content) }}</textarea>
            </div>
            <div class="form-group">
                <label for="feeling">Feeling:</label>
                <input type="text" class="form-control" id="feeling" name="feeling" value="{{ old('feeling', $post->feeling) }}">
            </div>
            <div class="form-group">
                <label for="hashtag">Hashtag:</label>
                <input type="text" class="form-control" id="hashtag" name="hashtag" value="{{ old('hashtag', $post->hashtag) }}">
            </div>
            <div class="form-group">
                <label for="status">Trạng thái:</label>
                <input type="number" class="form-control" id="status" name="status" value="{{ old('status', $post->status) }}" required>
            </div>
            <div class="form-group">
                <label for="views">Lượt xem:</label>
                <input type="number" class="form-control" id="views" name="views" value="{{ old('views', $post->views) }}" required>
            </div>
            <button type="submit" class="btn btn-primary">Cập Nhật Post</button>
        </form>
    </div>
@endsection