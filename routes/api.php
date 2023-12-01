<?php

use App\Http\Controllers\ReportController;
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
use App\Http\Controllers\SearchController;
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
Route::get('/die-token', function () {
    return response(['message' => 'token has expired'], 401);
})->name('token.die');
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('user.register');
    Route::post('/login', [AuthController::class, 'login'])->name('user.login');
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/google-auth', [AuthController::class, 'googleAuth'])->name('user.googleAuth');
    Route::get('/google-callback', [AuthController::class, 'googleCallback'])->name('user.googleCallback');
    Route::post('/verify', [AuthController::class, 'verify'])->name('user.verify');
    Route::post('/post-forgot-password', [AuthController::class, 'forgotPassword'])->name('user.forgotPassword');
    Route::post('/post-reset-password', [AuthController::class, 'resetPassword'])->name('user.resetPassword');
});
Route::get('list-majors', [MajorController::class, 'list_majors']);
Route::middleware('auth:api')->group(function () {
    Route::get('/get-user/{id?}', [AuthController::class, 'getUser'])->name('user.getinfo');
    //route has been authenticated
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('user.logout');
    Route::post('/auth/confirm-password', [AuthController::class, 'confirmPassword'])->name('user.confirmPassword');
    Route::post('/auth/reset-new-password', [AuthController::class, 'resetPassword'])->name('user.resetPassword');
    //chat
    Route::prefix('messages')->group(function () {
        // danh sach cac private channel chat
        Route::get('/list-private-channel/{quantity?}', [PrivateMessagesController::class, 'ShowListUserChat']);
        // list message cua 1 channel chat
        Route::get('/private-channel/{user}/{quantity?}', [PrivateMessagesController::class, 'ShowAllMessage'])->where('user', '[0-9]+');
        // gui tin nhan ( private channel chat)
        Route::post('/private-channel/{user}', [PrivateMessagesController::class, 'SendMessages'])->where('user', '[0-9]+');
        //XÓa đoạn chat ( private channel chat) id user thêm chat tránh trường hợp messages/{id} bị trùng với bên trên
        Route::delete('/private-channel/{user}', [PrivateMessagesController::class, 'DeleteMessagesBetweenUsers']);

        Route::put('/{privateMessage}', [PrivateMessagesController::class, 'UpdateMessage']);
        //Xóa  tin nhắn (Xóa 1 tin nhắn) id tin nhắn
        Route::delete('/{privateMessage}', [PrivateMessagesController::class, 'DeleteMessage']);
    });

    //post
    Route::prefix('posts')->group(function () {
        Route::get('/newfeed/{quantity?}', [PostsController::class, 'ShowAllPosts'])->name('post.show');
        Route::post('/', [PostsController::class, 'CreatePost'])->name('post.create');
        Route::put('/{post}', [PostsController::class, 'UpdatePost'])->name('post.update');
        Route::delete('/{post}', [PostsController::class, 'DeletePost'])->name('post.delete');
    });
    //Profile
    Route::prefix('profile')->group(function () {
        Route::get('/{user}/{type}/{status?}', [ProfileController::class, 'Profile'])->name('profile.show.user')->where('status', 'pending|approved|reject');
        Route::get('/{user}', [ProfileController::class, 'DetailProfileUser'])->name('profile.show.detail_user');
        Route::post('/update-avatar', [ProfileController::class, 'UpdateAvatarForUser'])->name('profile.update.avatar');
        Route::put('/update-cover-photo', [ProfileController::class, 'UpdateCoverPhotoForUser'])->name('profile.update.cover_photo');
        Route::put('/update', [ProfileController::class, 'updateProfile'])
            ->name('profile.update');
    });
    //blog
    Route::prefix('blogs')->group(function () {
        Route::get('/{quantity?}', [BlogController::class, 'ShowAllBlogs'])->name('blog.show');
        Route::post('/', [BlogController::class, 'CreateBlog'])->name('blog.create');
        Route::put('/{blog}', [BlogController::class, 'UpdateBlog'])->name('blog.update');
        Route::delete('/{blog}', [BlogController::class, 'DeleteBlog'])->name('blog.delete');
        Route::get('/detail/{blog}', [BlogController::class, 'detailBlog']);
        Route::post('/rate/{blog}', [BlogController::class, 'rateBlog']);
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
    //qa
    Route::prefix('quests')->group(function () {
        Route::get('all/{quantity?}', [QaController::class, 'ShowAllQa'])->name('qa.showAll');
        Route::get('/major/{major_id}/{quantity?}', [QaController::class, 'ShowQaByMajor'])->name('qa.showAllByMajor');
        Route::get('/my-quests/{quantity?}', [QaController::class, 'showMyQa'])->name('qa.showMyQa');
        Route::get('/most-commented/{quantity?}', [QaController::class, 'showMostCommentedQa'])->name('qa.showMostCommentedQa');
        Route::get('/unanswer/{quantity?}', [QaController::class, 'showUnAnswerdQa'])->name('qa.showUnAnswerdQa');
        Route::post('/', [QaController::class, 'CreateQa'])->name('qa.create');
        Route::get('/detail/{qa}', [QaController::class, 'detailQandA'])->name('qa.detail');
        Route::put('/{qa}', [QaController::class, 'UpdateQa'])->name('qa.update');
        Route::delete('/{qa}', [QaController::class, 'DeleteQa'])->name('qa.delete');
        //Route::get('/list', [QaController::class, 'ListQa'])->name('qa.list');
    });
    //friend --relationship
    Route::post('/send-request/{recipient}', [FriendController::class, 'SendFriendRequest'])->name('friend.send');
    Route::post('/confirm-request/{sender}', [FriendController::class, 'ConfirmFriendRequest'])->name('friend.confirm');
    Route::delete('/delete-request/{sender}', [FriendController::class, 'DeleteFriendRequest'])->name('friend.delete');
    Route::get('/friend-list/{user}/{quantity?}', [FriendController::class, 'FetchAllFriend'])->name('friend.list');
    Route::get('/friend-list-request/{quantity?}', [FriendController::class, 'listFriendRequest']);
    Route::get('/status-friend/{friend}', [FriendController::class, 'getFriendshipStatus']);
    Route::delete('/unfriend/{friend}', [FriendController::class, 'unfriend']);
    Route::get('/friend-suggest/{quantity?}', [FriendController::class, 'getFriendSuggestions']);
    Route::get('/friend/count-friend-request', [FriendController::class, 'countFriendRequest']);
    //notification
    Route::get('/notifications/{quantity?}', [NotificationController::class, 'listNotification']);
    Route::get('/see-notification/{notification}', [NotificationController::class, 'seeNotification']);
    Route::delete('/notification/{notification}', [NotificationController::class, 'deleteNotification']);
    Route::get('/notification/count-not-seen', [NotificationController::class, 'countNotificationNotSeen']);
    //activity 
    Route::post('/activity', [AuthController::class, 'CheckActivityUser']);
    //user
    Route::get('/user-info', [ProfileController::class, 'getInfoUser']);
    //major
    Route::get('majors', [MajorController::class, 'list_majors']);
    Route::prefix('search')->group(function () {
        //Searches for everything
        Route::get('/{model}', [SearchController::class, 'SearchEverything']);
        //recents searches
        Route::get('/recent-searches', [SearchController::class, 'getRecentSearches']);
        //delete others search results
        Route::delete('/delete-others-recent-searches/{search}', [SearchController::class, 'deleteOtherRecentSearches']);
        //delete all search results
        Route::delete('/delete-all-recent-searches/{search}', [SearchController::class, 'deleteAllRecentSearches']);
    });

    //Report
    Route::post('/report/{user}/{model}/{item}', [ReportController::class, 'CreateReport']);
    Route::put('/changestatus/{user}', [PrivateMessagesController::class, 'changestatus']);
});
