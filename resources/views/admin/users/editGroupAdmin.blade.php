@extends('admin.layouts.app')
@section('title') Sửa nhóm quản trị @endsection
@section('content')
<div class="box box-primary">
    <div class="box-header with-border">
        <h3 class="box-title">Sửa nhóm quản trị</h3>
    </div>
    <form action="{{ route('admin.groups.update', $role->id) }}" method="post">
        @csrf
        @method('PUT')
        <div class="box-body">
            <div class="form-group">
                <label for="exampleInputEmail1">Tên nhóm</label>
                <input type="text" name="name" class="form-control" id="exampleInputEmail1" placeholder="Name" value="{{ $role->name }}">
                @error('name')
                <p style="color: red">{{ $message }}</p>
                @enderror
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Thao tác</label>
                @if (isset($backend_menus) && !empty($backend_menus))
                    @foreach ($backend_menus as $menu_lv1)
                        <div class="row permistion-menu">
                            <div class="col-md-12 menu-level-1">
                                <input class="checkbox_lv1" type="checkbox" name="permission[]" value="{{ $menu_lv1['permission'] }}" 
                                @if (in_array($menu_lv1['permission'], $permission ))
                                    checked
                                @endif
                                > <b>{{ $menu_lv1['text'] }}</b>
                            </div>
                            @if (isset($menu_lv1['sub']) && !empty($menu_lv1['sub']))
                                @foreach ($menu_lv1['sub'] as $menu_lv2)
                                    <div class="col-md-12 menu-level-2">
                                        <input class="checkbox_lv2" type="checkbox" name="permission[]" value="{{ $menu_lv2['permission'] }}" 
                                        @if (in_array($menu_lv2['permission'], $permission ))
                                            checked
                                        @endif
                                        > {{ $menu_lv2['text'] }}
                                        <div class="menu-level-3">
                                            @if (isset($menu_lv2['sub_permission']) && !empty($menu_lv2['sub_permission']))
                                                @foreach ($menu_lv2['sub_permission'] as $menu_lv3)
                                                    <span><input type="checkbox" name="permission[]" value="{{ $menu_lv3['permission'] }}"
                                                    @if (in_array($menu_lv3['permission'], $permission ))
                                                        checked
                                                    @endif  
                                                    > {{ $menu_lv3['name'] }}</span>
                                                @endforeach
                                            @endif
                                        </div>
                                    </div>
                                @endforeach
                            @endif
                        </div>
                    @endforeach
                @endif
            </div>
        </div>
        <div class="box-footer">
            <button type="submit" class="btn btn-primary">Cập nhật</button>
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
<script>
    document.addEventListener('DOMContentLoaded', function () {
        var checkboxesLv1 = document.querySelectorAll('.checkbox_lv1');
        checkboxesLv1.forEach(function (checkboxLv1) {
            checkboxLv1.addEventListener('change', function () {
                var checkboxesLv2 = checkboxLv1.closest('.permistion-menu').querySelectorAll('.checkbox_lv2');
                checkboxesLv2.forEach(function (checkboxLv2) {
                    checkboxLv2.checked = checkboxLv1.checked;
                    var checkboxesLv3 = checkboxLv2.closest('.menu-level-2').querySelectorAll('.menu-level-3 input');
                    checkboxesLv3.forEach(function (checkboxLv3) {
                        checkboxLv3.checked = checkboxLv1.checked;
                    });
                });
            });
        });
    });
</script>
@endsection