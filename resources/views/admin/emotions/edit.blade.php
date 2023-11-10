@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Chỉnh sửa Cảm xúc</h1>

        <form action="{{ route('admin.emotions.update', $selectedEmotion) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="new_emotion">Tên Cảm xúc mới:</label>
                <input type="text" id="new_emotion" name="new_emotion" class="form-control" value="{{ $selectedEmotion }}" required>
            </div>
            <button type="submit" class="btn btn-primary">Cập nhật</button>
        </form>
    </div>
@endsection