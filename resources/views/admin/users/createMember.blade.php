@extends('admin.layouts.app')
@section('title') Thêm thành viên quản trị @endsection
@section('content')
<div class="box box-primary">
    <div class="box-header with-border">
        <h3 class="box-title">Thêm thành viên quản trị</h3>
    </div>
    <form action="{{ route('admin.members.store') }}" method="post">
        @csrf
        @method('POST')
        <div class="box-body">
            <div class="form-group">
                <label for="exampleInputEmail1">Nhập email user</label>
                {{-- <input type="text" name="email" class="form-control" id="exampleInputEmail1" placeholder="Email"> --}}
                <select name="email" class="form-control">
                    <option value="">--Chọn email--</option>
                    @foreach ($users as $user)
                        <option value="{{ $user->email }}">{{ $user->email }}</option>
                    @endforeach
                </select>
                @error('email')
                <p style="color: red">{{ $message }}</p>
                @enderror
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="text" name="username" class="form-control" id="exampleInputEmail1" placeholder="Username" readonly>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Họ và tên</label>
            <input type="text" name="name" class="form-control" id="exampleInputEmail1" placeholder="Name" readonly>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Ngày sinh</label>
            <input type="date" name="birthday" class="form-control" id="exampleInputEmail1" placeholder="Birthday" readonly>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Chuyên ngành</label>
            <input type="text" name="major" class="form-control" id="exampleInputEmail1" placeholder="Major" readonly>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Nhóm quản trị</label>
            <select name="role" id="" class="form-control">
              @foreach ($roles as $role)
              <option value="{{ $role->id }}">{{ $role->name }}</option>
              @endforeach
            </select>
          </div>
        </div>
        <div class="box-footer">
            <button type="submit" class="btn btn-primary">Thêm mới</button>
        </div>
    </form>
</div>
<style>
    .menu-level-1 b {
        font-size: 16px;
    }
    .permistion-menu {
        margin-bottom: 10px;
    }
    .menu-level-2 {
        padding-left: 40px;
    }
    .menu-level-3 {
        padding-left: 60px;
    }
    .menu-level-3 span {
        padding-right: 15px;
    }
</style>
@php
    echo '<script>';
    echo 'var apiUrl = "' . env('APP_URL') . '";';
    echo '</script>';
@endphp
<script>
  document.addEventListener('DOMContentLoaded', function () {
      var emailInput = document.querySelector('select[name="email"]');
      var usernameInput = document.querySelector('input[name="username"]');
      var nameInput = document.querySelector('input[name="name"]');
      var birthdayInput = document.querySelector('input[name="birthday"]');
      var majorInput = document.querySelector('input[name="major"]');
      emailInput.addEventListener('input', function () {
          var emailValue = emailInput.value;

          if (emailValue.trim() === '' || !emailValue.includes('@')) {
              // Nếu email trống hoặc không hợp lệ, đặt giá trị của các trường khác thành chuỗi trống
              usernameInput.value = '';
              nameInput.value = '';
              birthdayInput.value = '';
              majorInput.value = '';
              return;
          }
          
          fetch(apiUrl + 'admin/member/' + emailValue)
              .then(response => response.json())
              .then(data => {
                  usernameInput.value = data.username;
                  nameInput.value = data.name;
                  birthdayInput.value = data.birthday;
                  majorInput.value = data.major;
              })
              .catch(error => console.error('Error:', error));
      });
  });
</script>
@endsection