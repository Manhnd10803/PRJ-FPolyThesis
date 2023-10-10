<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LikeController;
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
Route::get('/messages',[PrivateMessagesController::class,'ShowAllMessage'])->name('message.show');
Route::post('/messages',[PrivateMessagesController::class,'SendMessages'])->name('message.create');
Route::put('/messages/{privateMessage}', [PrivateMessagesController::class,'UpdateMessage'])->name('message.update');
Route::delete('/messages/{privateMessage}', [PrivateMessagesController::class,'DeleteMessage'])->name('message.delete');

//post
Route::get('/posts/profile',[PostsController::class,'ShowPostProfile'])->name('post.show');
Route::post('/posts',[PostsController::class,'CreatePost'])->name('post.create');
Route::put('/posts/{post}',[PostsController::class,'UpdatePost'])->name('post.update');
Route::delete('/posts/{post}',[PostsController::class,'DeletePost'])->name('post.delete');
Route::get('posts/count-like/{post}', [PostController::class, 'CountLikeInPost'])->name('like.count');
Route::get('posts/count-cmt/{post}', [PostController::class, 'CountCommentInPost'])->name('comment.count');
//Like
Route::get('/like/{post}',[LikeController::class,'FetchLikeInPost'])->name('like.show');
Route::post('/like/{post}',[LikeController::class,'LikePost'])->name('like');
//Comment
Route::get('/comment/{post}',[CommentController::class,'FetchCommentInPost'])->name('comment.show');
Route::post('/comment/{post}',[CommentController::class,'AddComment'])->name('comment.add');
