@extends('admin.layouts.app')
@section('title')
  Thêm chuyên ngành
@endsection
@section('content')
    <div class="row">
        <div class="col-xs-12 mx-5">
            <div class="box">
                <div style="display: flex;justify-content: space-between;padding: 10px 10px;align-items: center">
                    <h4>Thêm chuyên ngành</h4>

                </div>
                <div class="box-body">
                    <form action="{{ route('admin.majors.store') }}" method="POST">
                        @csrf
                        <div class="form-group">
                            <label for="majors_name">Tên chuyên ngành:</label>
                            <input type="text" class="form-control" id="majors_name" name="majors_name"
                                value="{{ old('majors_name') }}">
                            @error('majors_name')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="description">Mô tả:</label>
                            <textarea class="form-control" id="description" name="description">{{ old('description') }}</textarea>
                            @error('description')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <button type="submit" class="btn btn-primary">Thêm chuyên ngành</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
