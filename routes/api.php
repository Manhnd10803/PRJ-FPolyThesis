<?php

use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Admin\AdminBlogController;
use App\Http\Controllers\Admin\AdminMajorController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MajorController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\QaController;
use App\Http\Controllers\PrivateMessagesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
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

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('user.register');
    Route::get('/google-auth', [AuthController::class, 'googleAuth'])->name('user.googleAuth');
    Route::get('/google-callback', [AuthController::class, 'googleCallback'])->name('user.googleCallback');
    Route::post('/login', [AuthController::class, 'login'])->name('user.login');
    Route::post('/verify', [AuthController::class, 'verify'])->name('user.verify');
    Route::post('/post-forgot-password', [AuthController::class, 'forgotPassword'])->name('user.forgotPassword');
    Route::post('/post-reset-password', [AuthController::class, 'resetPassword'])->name('user.resetPassword');
});

Route::middleware('auth:api')->group(function () {
    Route::get('/get-user', [AuthController::class, 'getUser'])->name('user.getinfo');
    //route has been authenticated
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('user.logout');
    Route::post('/auth/refresh-token', [AuthController::class, 'refreshToken'])->name('token.refresh');
    Route::post('/auth/confirm-password',[AuthController::class,'confirmPassword'])->name('user.confirmPassword');
    Route::post('/auth/reset-new-password', [AuthController::class, 'resetPassword'])->name('user.resetPassword');
    Route::get('/hello', function () {
        return Auth::user();
    });
    //chat
    Route::prefix('messages')->group(function () {
        Route::get('/{user}', [PrivateMessagesController::class, 'ShowAllMessage'])->name('message.show')->where('user', '[0-9]+');
        Route::post('/{user}', [PrivateMessagesController::class, 'SendMessages'])->name('message.create')->where('user', '[0-9]+');
        Route::put('/{privateMessage}/{user}', [PrivateMessagesController::class, 'UpdateMessage'])->name('message.update');
        Route::delete('/{privateMessage}/{user}', [PrivateMessagesController::class, 'DeleteMessage'])->name('message.delete');
    });

    //major
    Route::get('majors', [MajorController::class, 'list_majors']);

    //post
    Route::prefix('posts')->group(function () {
        Route::get('/newfeed', [PostsController::class, 'ShowAllPosts'])->name('post.show');
        Route::post('/', [PostsController::class, 'CreatePost'])->name('post.create');
        Route::put('/{post}', [PostsController::class, 'UpdatePost'])->name('post.update');
        Route::delete('/{post}', [PostsController::class, 'DeletePost'])->name('post.delete');
    });
    //Profile
    Route::prefix('profile')->group(function () {
        Route::get('/{user}/{type}/{status?}', [ProfileController::class, 'Profile'])->name('profile.show.user')->where('status', 'pending|approved|reject');
        Route::get('/{user}', [ProfileController::class, 'DetailProfileUser'])->name('profile.show.detail_user');
        Route::post('/update-avatar', [ProfileController::class, 'UpdateAvatarForUser'])->name('profile.update.avatar');
        Route::post('/update-cover-photo', [ProfileController::class, 'UpdateCoverPhotoForUser'])->name('profile.update.cover_photo');
        Route::put('/update', [ProfileController::class, 'updateProfile'])
            ->name('profile.update');
    });
    //user
    Route::get('/user-info', [ProfileController::class, 'getInfoUser']);
    //blog
    Route::prefix('blogs')->group(function () {
        Route::get('/', [BlogController::class, 'ShowAllBlogs'])->name('blog.show');
        Route::post('/', [BlogController::class, 'CreateBlog'])->name('blog.create');
        Route::put('/{blog}', [BlogController::class, 'UpdateBlog'])->name('blog.update');
        Route::delete('/{blog}', [BlogController::class, 'DeleteBlog'])->name('blog.delete');
        Route::get('/{blog}', [BlogController::class, 'detailBlog']);
    });
    //Emotion
    Route::prefix('like')->group(function () {
        // Dành cho qa, post, blog
        Route::post('/{model}/{id}/{emotion}', [LikeController::class, 'LikeItem']);
        Route::get('/', [LikeController::class, 'listEmotion']);
    });
    //Comment
    Route::prefix('comment')->group(function () {
        Route::post('/{type}/{id}', [CommentController::class, 'AddComment']);
        Route::get('/{type}/{id}', [CommentController::class, 'allCommentsLevel1']);
        Route::get('/{type}/{id}/{commentParent}', [CommentController::class, 'allSubordinateComments']);
        Route::put('/{comment}', [CommentController::class, 'editComment']);
        Route::delete('/{comment}', [CommentController::class, 'deleteComment']);
    });

    Route::get('majors', [MajorController::class, 'list_majors']);

    //qa
    Route::prefix('quests')->group(function () {
        Route::get('/', [QaController::class, 'ShowAllQa'])->name('qa.showAll');
        Route::get('/major/{major_id}', [QaController::class, 'ShowQaByMajor'])->name('qa.showAllByMajor');
        Route::get('/my-quests', [QaController::class, 'showMyQa'])->name('qa.showMyQa');
        Route::get('/most-commented', [QaController::class, 'showMostCommentedQa'])->name('qa.showMostCommentedQa');
        Route::get('/unanswer', [QaController::class, 'showUnAnswerdQa'])->name('qa.showUnAnswerdQa');
        Route::post('/', [QaController::class, 'CreateQa'])->name('qa.create');
        Route::get('/{qa}', [QaController::class, 'detailQandA'])->name('qa.detail');
        Route::put('/{qa}', [QaController::class, 'UpdateQa'])->name('qa.update');
        Route::delete('/{qa}', [QaController::class, 'DeleteQa'])->name('qa.delete');
        //Route::get('/list', [QaController::class, 'ListQa'])->name('qa.list');
    });

    //friend --relationship
    Route::post('/send-request/{recipient}', [FriendController::class, 'SendFriendRequest'])->name('friend.send');
    Route::post('/confirm-request/{sender}', [FriendController::class, 'ConfirmFriendRequest'])->name('friend.confirm');
    Route::delete('/delete-request/{sender}', [FriendController::class, 'DeleteFriendRequest'])->name('friend.delete');
    Route::get('/friend-list', [FriendController::class, 'FetchAllFriend'])->name('friend.list');
    Route::get('/friend-list-request', [FriendController::class, 'listFriendRequest']);
    Route::get('/status-friend/{friend}', [FriendController::class, 'getFriendshipStatus']);
    Route::delete('/unfriend/{friend}', [FriendController::class, 'unfriend']);
    

    //notification
    Route::get('/notifications', [NotificationController::class, 'listNotification']);
    Route::get('/see-notification/{notification}', [NotificationController::class, 'seeNotification']);
    Route::delete('/notification/{notification}', [NotificationController::class, 'deleteNotification']);

    Route::group(['prefix' => 'admin', 'middleware' => 'scope:admin'], function () {
        //User Management
        Route::prefix('users')->group(function () {
            Route::get('/', [AdminUserController::class, 'listUser'])->name('admin.user.list');
            Route::get('/detail/{user}', [AdminUserController::class, 'detailUser'])->name('admin.user.detail');
            Route::put('/suspend/{user}', [AdminUserController::class, 'suspendUser'])->name('admin.user.suspend');
            Route::put('/active/{user}', [AdminUserController::class, 'activeUser'])->name('admin.user.active');
            Route::delete('/delete/{user}', [AdminUserController::class, 'deleteUser'])->name('admin.user.delete');
        });
        //Blog Management
        Route::prefix('blogs')->group(function () {
            Route::get('/list-approved', [AdminBlogController::class, 'listAllBlog'])->name('admin.blog.approved');
            Route::get('/list-pending', [AdminBlogController::class, 'listPedingBlog'])->name('admin.blog.pending');
            Route::get('/approve/{blog}', [AdminBlogController::class, 'approveBlog'])->name('admin.blog.approve');
            Route::get('/reject/{blog}', [AdminBlogController::class, 'rejectBlog'])->name('admin.blog.reject');
            Route::get('/detail/{blog}', [AdminBlogController::class, 'detailBlog'])->name('admin.blog.detailBlog');
        });
        //Major Admin
        Route::prefix('majors')->group(function () {
            Route::get('/', [AdminMajorController::class, 'listMajor'])->name('admin.majors.list');
            Route::get('/{major}', [AdminMajorController::class, 'detailMajor'])->name('admin.majors.detail');
            Route::post('/', [AdminMajorController::class, 'addMajor'])->name('admin.majors.add');
            Route::put('/{major}', [AdminMajorController::class, 'editMajor'])->name('admin.majors.edit');
            Route::delete('/{major}', [AdminMajorController::class, 'deleteMajor'])->name('admin.majors.delete');
        });
    });
});
