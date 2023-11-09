@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Thêm Post Mới</h1>

        <form action="{{ route('admin.posts.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="user_id">User ID:</label>
                <input type="number" class="form-control" id="user_id" name="user_id" required>
            </div>
            <div class="form-group">
                <label for="content">Nội dung:</label>
                <textarea class="form-control" id="content" name="content" required></textarea>
            </div>
            <div class="form-group">
                <label for="feeling">Feeling:</label>
                <input type="text" class="form-control" id="feeling" name="feeling">
            </div>
            <div class="form-group">
                <label for="hashtag">Hashtag:</label>
                <input type="text" class="form-control" id="hashtag" name="hashtag">
            </div>
            <div class="form-group">
                <label for="status">Trạng thái:</label>
                <input type="number" class="form-control" name="status" required>
            </div>
            <div class="form-group">
                <label for="views">Lượt xem:</label>
                <input type="number" class="form-control" id="views" name="views" required>
            </div>
            <button type="submit" class="btn btn-primary">Thêm Post</button>
        </form>
    </div>
@endsection