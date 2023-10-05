<?php

use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class,'logout']);
    
    });
Route::resource('/user',AuthController::class);
Route::post('/login',[AuthController::class,'login']);
Route::post('/register',[AuthController::class,'store']);

Route::resource('/chat', PrivateMessagesController::class);


