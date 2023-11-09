@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Chỉnh Sửa Question and Answer</h1>

        <form action="{{ route('admin.qa.update', $qa) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="title">Tiêu đề:</label>
                <input type="text" class="form-control" id="title" name="title" value="{{ old('title', $qa->title) }}" required>
            </div>
            <div class="form-group">
                <label for="content">Nội dung:</label>
                <textarea class="form-control" id="content" name="content" required>{{ old('content', $qa->content) }}</textarea>
            </div>
            <div class="form-group">
                <label for="user_id">User ID:</label>
                <input type="number" class="form-control" id="user_id" name="user_id" value="{{ old('user_id', $qa->user_id) }}" required>
            </div>
            <div class="form-group">
                <label for="majors_id">Majors ID:</label>
                <input type="number" class="form-control" id="majors_id" name="majors_id" value="{{ old('majors_id', $qa->majors_id) }}" required>
            </div>
            <div class="form-group">
                <label for="hashtag">Hashtag:</label>
                <input type="text" class="form-control" id="hashtag" name="hashtag" value="{{ old('hashtag', $qa->hashtag) }}">
            </div>
            <div class="form-group">
                <label for="views">Lượt xem:</label>
                <input type="number" class="form-control" id="views" name="views" value="{{ old('views', $qa->views) }}" required>
            </div>
            <button type="submit" class="btn btn-primary">Cập Nhật Question and Answer</button>
        </form>
    </div>
@endsection