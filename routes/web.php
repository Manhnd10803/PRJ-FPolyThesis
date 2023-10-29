<?php

use Illuminate\Support\Facades\Route;

// Route dành cho trang quản trị
Route::group(['prefix' => 'admin'], function () {
    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    });
});

// Route chung cho ứng dụng ReactJS
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');
