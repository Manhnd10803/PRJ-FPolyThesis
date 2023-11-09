@extends('admin.layouts.app')
@section('title') Dashboard @endsection
@section('content')
    <div class="container">
        <h2>User List</h2>
        <a href="{{ route('admin.users.create') }}" class="btn btn-primary mb-3">Create User</a>
        <table class="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Group ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                <tr>
                    <td>{{ $user->username }}</td>
                    <td>
                        @if($user->group_id == 1)
                            Superadmin
                        @elseif($user->group_id == 2)
                            Admin
                        @elseif($user->group_id == 3)
                            Student
                        @elseif($user->group_id == 4)
                            Guest
                        @endif
                    </td>
                    <td>{{ $user->first_name }}</td>
                    <td>{{ $user->last_name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>
                        <a href="{{ route('admin.users.edit', $user->id) }}" class="btn btn-primary">Edit</a>
                        <form action="{{ route('admin.users.destroy', $user->id) }}" method="post" style="display: inline-block;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure?')">Delete</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection