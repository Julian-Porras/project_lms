<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->name('logout');
});

// Logged in user routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Admin routes
    Route::middleware(['is_Admin'])->group(function () {

    });
    // Instructor routes
    Route::middleware(['is_Instructor'])->group(function () {

    });
    // Student routes
    Route::middleware(['is_Student'])->group(function () {
        
    });
});