@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <h2>Chỉnh Sửa Blog</h2>
        <form action="{{ route('admin.blogs.update', $blog->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="title">Tiêu đề:</label>
                <input type="text" class="form-control" id="title" name="title" value="{{ $blog->title }}" required>
            </div>
            <div class="form-group">
                <label for="content">Nội dung:</label>
                <textarea class="form-control" id="content" name="content" rows="6" required>{{ $blog->content }}</textarea>
            </div>
            <div class="form-group">
                <label for="thumbnail">Thumbnail:</label>
                <input type="file" class="form-control" id="thumbnail" name="thumbnail" accept="image/*">
            </div>
            <div class="form-group">
                <label for="user_id">Người tạo:</label>
                <select class="form-control" id="user_id" name="user_id" required>
                    @foreach($users as $user)
                        <option value="{{ $user->id }}" {{ $user->id === $blog->user_id ? 'selected' : '' }}>{{ $user->username }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="majors_id">Chuyên ngành:</label>
                <select class="form-control" id="majors_id" name="majors_id" required>
                    @foreach($majors as $major)
                        <option value="{{ $major->id }}" {{ $major->id === $blog->majors_id ? 'selected' : '' }}>{{ $major->majors_name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="hashtag">Hashtag:</label>
                <input type="text" class="form-control" id="hashtag" name="hashtag" value="{{ $blog->hashtag }}">
            </div>
            <button type="submit" class="btn btn-primary">Cập Nhật Blog</button>
        </form>
    </div>
@endsection