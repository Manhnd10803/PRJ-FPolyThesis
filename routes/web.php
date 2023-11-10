<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminBlogController;
use App\Http\Controllers\Admin\AdminMajorController;
use App\Http\Controllers\Admin\AdminPostController;
use App\Http\Controllers\Admin\AdminQaController;
use App\Http\Controllers\Admin\AdminEmotionController;

// Route dành cho trang quản trị
Route::get('/login', function () {
    return 'login';
})->name('login');
Route::group(['prefix' => 'admin'], function () {
    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    })->name('dashboard');
//Admin user
    Route::get('users', [AdminUserController::class, 'index'])->name('admin.users.index');
    Route::get('users/create', [AdminUserController::class, 'create'])->name('admin.users.create');
    Route::post('users', [AdminUserController::class, 'store'])->name('admin.users.store');
    Route::get('users/{user}/edit', [AdminUserController::class, 'edit'])->name('admin.users.edit');
    Route::put('users/{user}', [AdminUserController::class, 'update'])->name('admin.users.update');
    Route::delete('users/{user}', [AdminUserController::class, 'destroy'])->name('admin.users.destroy');

//Admin blog
    Route::get('blogs', [AdminBlogController::class, 'index'])->name('admin.blogs.index');
    Route::get('blogs/create', [AdminBlogController::class, 'create'])->name('admin.blogs.create');
    Route::post('blogs', [AdminBlogController::class, 'store'])->name('admin.blogs.store');
    Route::get('blogs/{blog}', [AdminBlogController::class, 'show'])->name('admin.blogs.show');
    Route::get('blogs/{blog}/edit', [AdminBlogController::class, 'edit'])->name('admin.blogs.edit');
    Route::put('blogs/{blog}', [AdminBlogController::class, 'update'])->name('admin.blogs.update');
    Route::delete('blogs/{blog}', [AdminBlogController::class, 'destroy'])->name('admin.blogs.destroy');

//Admin major
    Route::resource('majors', AdminMajorController::class)->names([
        'index' => 'admin.majors.index',
        'create' => 'admin.majors.create',
        'store' => 'admin.majors.store',
        'edit' => 'admin.majors.edit',
        'update' => 'admin.majors.update',
        'destroy' => 'admin.majors.destroy',
    ]);

//Admin post
    Route::resource('posts', AdminPostController::class)->names([
        'index' => 'admin.posts.index',
        'create' => 'admin.posts.create',
        'store' => 'admin.posts.store',
        'edit' => 'admin.posts.edit',
        'update' => 'admin.posts.update',
        'destroy' => 'admin.posts.destroy',
    ]);

//Admin qa
    Route::resource('qa', AdminQaController::class)->names([
        'index' => 'admin.qa.index',
        'create' => 'admin.qa.create',
        'store' => 'admin.qa.store',
        'edit' => 'admin.qa.edit',
        'update' => 'admin.qa.update',
        'destroy' => 'admin.qa.destroy',
    ]);

//Admin emotion
    Route::get('emotions', [AdminEmotionController::class, 'index'])->name('admin.emotions.index');
    Route::get('emotions/create', [AdminEmotionController::class, 'create'])->name('admin.emotions.create');
    Route::post('emotions', [AdminEmotionController::class, 'store'])->name('admin.emotions.store');
    Route::get('emotions/{emotion}/edit', [AdminEmotionController::class, 'edit'])->name('admin.emotions.edit');
    Route::put('emotions/{emotion}', [AdminEmotionController::class, 'update'])->name('admin.emotions.update');
    Route::delete('emotions/{emotion}', [AdminEmotionController::class, 'destroy'])->name('admin.emotions.destroy');
    
});
Route::get('test', function () {
    return $users = User::all();
});

// Route chung cho ứng dụng ReactJS
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');