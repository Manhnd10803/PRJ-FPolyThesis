<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/{any}', function () {
//     return view('app');
// })->where('any', '^(?!api).*');

Route::get('/login', function(){
    return view('login');
});
Route::post('/login', [AuthController::class, 'login']);