@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Chỉnh Sửa Major</h1>

        <form action="{{ route('admin.majors.update', $major) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="majors_name">Tên Major:</label>
                <input type="text" class="form-control" id="majors_name" name="majors_name" value="{{ old('majors_name', $major->majors_name) }}" required>
            </div>
            <div class="form-group">
                <label for="majors_code">Mã Major:</label>
                <input type="text" class="form-control" id="majors_code" name="majors_code" value="{{ old('majors_code', $major->majors_code) }}">
            </div>
            <div class="form-group">
                <label for="description">Mô tả:</label>
                <textarea class="form-control" id="description" name="description">{{ old('description', $major->description) }}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Cập Nhật Major</button>
        </form>
    </div>
@endsection