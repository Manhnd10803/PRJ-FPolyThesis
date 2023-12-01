<?php

use App\Events\NotificationAdminEvent;
use App\Events\ReceiveNotification;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminBlogController;
use App\Http\Controllers\Admin\AdminMajorController;
use App\Http\Controllers\Admin\AdminPostController;
use App\Http\Controllers\Admin\AdminQaController;
use App\Http\Controllers\Admin\AdminEmotionController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

// Route dành cho trang quản trị
Route::get('admin/login', [AdminAuthController::class, 'viewLogin'])->name('login');
Route::post('admin/login', [AdminAuthController::class, 'login'])->name('singin');
Route::group(['prefix' => 'admin', 'middleware' => 'authAdmin'], function () {
    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    })->name('admin.dashboard');
    Route::get('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
    //Admin user
    Route::get('user', [AdminUserController::class, 'listUser'])->name('admin.users.list');
    // Route::get('user/{user}', [AdminUserController::class, 'detailUser'])->name('admin.users.detail');
    Route::put('user/lock/{user}', [AdminUserController::class, 'lockUser'])->name('admin.users.lock');
    Route::put('user/unlock/{user}', [AdminUserController::class, 'unlockUser'])->name('admin.users.unlock');

    Route::get('user/search', [AdminUserController::class, 'searchUser'])->name('admin.users.search');

    //Admin group member
    Route::get('group-member', [AdminUserController::class, 'listGroup'])->name('admin.groups.list');
    Route::get('group-member/create', [AdminUserController::class, 'createGroup'])->name('admin.groups.create');
    Route::post('group-member', [AdminUserController::class, 'storeGroup'])->name('admin.groups.store');
    Route::get('group-member/update/{role}', [AdminUserController::class, 'editGroup'])->name('admin.groups.edit');
    Route::put('group-member/{role}', [AdminUserController::class, 'updateGroup'])->name('admin.groups.update');
    Route::delete('group-member/{role}', [AdminUserController::class, 'destroyGroup'])->name('admin.groups.destroy');
    //Admin member
    Route::get('member', [AdminUserController::class, 'listMember'])->name('admin.members.list');
    Route::get('member/create', [AdminUserController::class, 'createMember'])->name('admin.members.create');
    Route::post('member', [AdminUserController::class, 'storeMember'])->name('admin.members.store');
    Route::get('member/update/{member}', [AdminUserController::class, 'editMember'])->name('admin.members.edit');
    Route::put('member/{member}', [AdminUserController::class, 'updateMember'])->name('admin.members.update');
    Route::delete('member/{member}', [AdminUserController::class, 'destroyMember'])->name('admin.members.destroy');
    Route::get('member/{email}', [AdminUserController::class, 'getInforMember']);

    //Admin blog
    Route::get('blogs', [AdminBlogController::class, 'index'])->name('admin.blogs.index');
    Route::get('blogs/approve', [AdminBlogController::class, 'index'])->name('admin.blogs.approve');
    Route::put('blogs/approve/{blog}', [AdminBlogController::class, 'approveBlog'])->name('admin.blogs.statusApprove');
    Route::put('blogs/reject/{blog}', [AdminBlogController::class, 'rejectBlog'])->name('admin.blogs.statusReject');
    Route::get('blogs/count-pending', [AdminBlogController::class, 'countPendingBlogs'])->name('admin.blogs.countPendingBlogs');
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
        'show' => 'admin.posts.show',
        'destroy' => 'admin.posts.destroy',
    ]);

    //Admin qa
    Route::resource('qa', AdminQaController::class)->names([
        'index' => 'admin.qa.index',
        'show' => 'admin.qa.show',
        'destroy' => 'admin.qa.destroy',
    ]);

    //Admin emotion
    Route::get('emotions', [AdminEmotionController::class, 'index'])->name('admin.emotions.index');
    Route::get('emotions/create', [AdminEmotionController::class, 'create'])->name('admin.emotions.create');
    Route::post('emotions', [AdminEmotionController::class, 'store'])->name('admin.emotions.store');
    Route::get('emotions/{emotion}/edit', [AdminEmotionController::class, 'edit'])->name('admin.emotions.edit');
    Route::put('emotions/{emotion}', [AdminEmotionController::class, 'update'])->name('admin.emotions.update');
    Route::delete('emotions/{emotion}', [AdminEmotionController::class, 'destroy'])->name('admin.emotions.destroy');

    //Admin notification
    Route::get('see-notification/{notification}', [AdminNotificationController::class, 'seeNotification'])->name('admin.see-notification');
    Route::get('list-notification', [AdminNotificationController::class, 'listNotification'])->name('admin.list-notification');
});

// Route chung cho ứng dụng ReactJS
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');
