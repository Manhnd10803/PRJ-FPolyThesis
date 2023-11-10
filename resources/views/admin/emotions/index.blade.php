@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Danh sách Cảm xúc</h1>

        <a href="{{ route('admin.emotions.create') }}" class="btn btn-primary mb-3">Thêm Cảm xúc</a>

        <ul>
            @forelse ($emotions as $emotion)
                <li>
                    {{ $emotion }}
                    <a href="{{ route('admin.emotions.edit', $emotion) }}">Chỉnh sửa</a>
                    <form action="{{ route('admin.emotions.destroy', $emotion) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Bạn có chắc chắn muốn xóa cảm xúc này không?')">Xóa</button>
                    </form>
                </li>
            @empty
                <li>Không có cảm xúc nào.</li>
            @endforelse
        </ul>
    </div>
@endsection