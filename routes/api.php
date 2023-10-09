<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\PrivateMessagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register'])->name('user.register');
Route::post('/login', [AuthController::class, 'login'])->name('user.login');
Route::post('/verify', [AuthController::class, 'verify'])->name('user.verify');
Route::middleware('auth:api')->group(function(){
    //route has been authenticated
    Route::post('/logout', [AuthController::class, 'logout'])->name('user.logout');
    Route::get('/hello', function(){
        return 'ok';
    });
});
//chat
Route::resource('/chat', PrivateMessagesController::class);
Route::delete('/private-messages/{privateMessage}', [PrivateMessagesController::class,'delete']);
Route::put('/private-messages/{privateMessage}', [PrivateMessagesController::class,'update']);
//post
Route::post('/posts',[PostsController::class,'post'])->name('post.create');
Route::put('/posts/{post}',[PostsController::class,'update'])->name('post.update');
Route::delete('/posts/{post}',[PostsController::class,'delete'])->name('post.delete');