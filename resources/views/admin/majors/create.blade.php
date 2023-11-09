@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Thêm Major Mới</h1>

        <form action="{{ route('admin.majors.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="majors_name">Tên Major:</label>
                <input type="text" class="form-control" id="majors_name" name="majors_name" required>
            </div>
            <div class="form-group">
                <label for="majors_code">Mã Major:</label>
                <input type="text" class="form-control" id="majors_code" name="majors_code">
            </div>
            <div class="form-group">
                <label for="description">Mô tả:</label>
                <textarea class="form-control" id="description" name="description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Thêm Major</button>
        </form>
    </div>
@endsection