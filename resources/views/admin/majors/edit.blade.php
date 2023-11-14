@extends('admin.layouts.app')
@section('title')
    Chỉnh sửa {{$major->majors_name}}
@endsection
@section('content')
    <div class="row">
        <div class="col-xs-12 mx-5">
            <div class="box">
                <div style="display: flex;justify-content: space-between;padding: 10px 10px;align-items: center">
                    <h4>Chỉnh sửa chuyên ngành</h4>

                </div>
                <div class="box-body">
                    <form action="{{ route('admin.majors.update', $major) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label for="majors_name">Tên chuyên ngành:</label>
                            <input type="text" class="form-control" id="majors_name" name="majors_name"
                                value="{{ old('majors_name', $major->majors_name) }}">
                            @error('majors_name')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="description">Mô tả:</label>
                            <textarea class="form-control" id="description" name="description">{{ old('description', $major->description) }}</textarea>
                            @error('description')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <button type="submit" class="btn btn-primary">Cập nhật chuyên ngành</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
