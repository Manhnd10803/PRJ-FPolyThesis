@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h2>Edit User</h2>
        <form method="post" action="{{ route('admin.users.update', $user->id) }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" name="username" value="{{ $user->username }}" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" name="password">
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" name="email" value="{{ $user->email }}" required>
            </div>
            <div class="form-group">
                <label for="first_name">First Name:</label>
                <input type="text" class="form-control" name="first_name" value="{{ $user->first_name }}" required>
            </div>
            <div class="form-group">
                <label for="last_name">Last Name:</label>
                <input type="text" class="form-control" name="last_name" value="{{ $user->last_name }}" required>
            </div>
            <div class="form-group">
                <label for="group_id">Group ID:</label>
                <select class="form-control" name="group_id" required>
                    <option value="1" {{ $user->group_id == 1 ? 'selected' : '' }}>Superadmin</option>
                    <option value="2" {{ $user->group_id == 2 ? 'selected' : '' }}>Admin</option>
                    <option value="3" {{ $user->group_id == 3 ? 'selected' : '' }}>Student</option>
                    <option value="4" {{ $user->group_id == 4 ? 'selected' : '' }}>Guest</option>
                </select>
            </div>
            
            <button type="submit" class="btn btn-primary">Update User</button>
        </form>
    </div>
@endsection