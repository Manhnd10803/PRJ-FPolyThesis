@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h2>Chi Tiết Blog</h2>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Tiêu đề: {{ $blog->title }}</h5>
                <p class="card-text">Nội dung: {{ $blog->content }}</p>
                <p class="card-text">Người tạo: {{ $blog->user->username }}</p>
                <p class="card-text">Chuyên ngành: {{ $blog->major->majors_name }}</p>
                <p class="card-text">Hashtag: {{ $blog->hashtag }}</p>
                <p class="card-text">Số lượt xem: {{ $blog->views }}</p>
                <p class="card-text">Ngày tạo: {{ $blog->created_at }}</p>
                <p class="card-text">Cập nhật lần cuối: {{ $blog->updated_at }}</p>

                @if($blog->thumbnail)
                <img src="{{ asset('storage/' . $blog->thumbnail) }}" class="img-fluid" alt="Thumbnail">
                @endif
            </div>
        </div>
        <a href="{{ route('admin.blogs.index') }}" class="btn btn-secondary mt-3">Quay lại</a>
    </div>
@endsection