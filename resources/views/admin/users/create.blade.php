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
        <h2>Create User</h2>
        <form method="post" action="{{ route('admin.users.store') }}" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" name="password" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" name="email" required>
            </div>
            <div class="form-group">
                <label for="first_name">First Name:</label>
                <input type="text" class="form-control" name="first_name" required>
            </div>
            <div class="form-group">
                <label for="last_name">Last Name:</label>
                <input type="text" class="form-control" name="last_name" required>
            </div>
            <div class="form-group">
                <label for="group_id">Group ID:</label>
                <select class="form-control" name="group_id" required>
                    <option value="1">Superadmin</option>
                    <option value="2">Admin</option>
                    <option value="3">Student</option>
                    <option value="4">Guest</option>
                </select>
            </div>
            
            <button type="submit" class="btn btn-primary">Create User</button>
        </form>
    </div>
@endsection