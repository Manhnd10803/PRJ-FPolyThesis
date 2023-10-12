<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmotionController;
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
//auth
Route::post('/register', [AuthController::class, 'register'])->name('user.register');
Route::get('/google-auth', [AuthController::class, 'googleAuth'])->name('user.googleAuth');
Route::get('/google-callback', [AuthController::class, 'googleCallback'])->name('user.googleCallback');
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
Route::get('/posts/profile',[PostsController::class,'ShowPostProfile'])->name('profile.show');
Route::post('/posts',[PostsController::class,'CreatePost'])->name('post.create');
Route::put('/posts/{post}',[PostsController::class,'UpdatePost'])->name('post.update');
Route::delete('/posts/{post}',[PostsController::class,'DeletePost'])->name('post.delete');
Route::get('posts/count-like/{post}', [PostController::class, 'CountLikeInPost'])->name('like.count');
Route::get('posts/count-cmt/{post}', [PostController::class, 'CountCommentInPost'])->name('comment.count');
//blog
Route::post('/blogs',[BlogsController::class,'CreateBlog'])->name('blog.create');
Route::put('/blogs/{blog}',[BlogsController::class,'UpdateBlog'])->name('blog.update');
Route::delete('/blogs/{blog}',[BlogsController::class,'DeleteBlog'])->name('blog.delete');
//qa
Route::post('/quests',[QasController::class,'CreateQa'])->name('qa.create');
Route::put('/quests/{qa}',[QasController::class,'UpdateQa'])->name('qa.update');
Route::delete('/quests/{qa}',[QasController::class,'DeleteqQ'])->name('qa.delete');
//Like --post
Route::get('/like/{post}',[LikeController::class,'FetchLikeInPost'])->name('post.like');
Route::post('/like/{post}',[LikeController::class,'LikePost'])->name('like.post');
//Like --blog
Route::get('/like/{blog}',[LikeController::class,'FetchLikeInBlog'])->name('blog.like');
Route::post('/like/{blog}',[LikeController::class,'LikeBlog'])->name('like.blog');
//Like --Q&a
Route::get('/like/{qa}',[LikeController::class,'FetchLikeInQa'])->name('qa.like');
Route::post('/like/{qa}',[LikeController::class,'LikeQa'])->name('like.qa');
//Comment --post
Route::get('/comment/{post}',[CommentController::class,'FetchCommentInPost'])->name('post.show');
Route::post('/comment/{post}',[CommentController::class,'AddCommentToPost'])->name('post.comment');
//Comment --blog
Route::get('/comment/{blog}',[CommentController::class,'FetchCommentInBlog'])->name('blog.show'); 
Route::post('/comment/{blog}',[CommentController::class,'AddCommentToBlog'])->name('blog.comment');
//Comment --Q&a
Route::get('/comment/{qa}',[CommentController::class,'FetchCommentInQa'])->name('qa.show');
Route::post('/comment/{qa}',[CommentController::class,'AddCommentToQa'])->name('qa.comment');