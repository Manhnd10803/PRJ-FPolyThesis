@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h1>Thêm Cảm xúc</h1>

        <form action="{{ route('admin.emotions.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="emotion">Tên Cảm xúc:</label>
                <input type="text" id="emotion" name="emotion" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Thêm</button>
        </form>
    </div>
@endsection