<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\instructor\ClassroomController;
use App\Http\Controllers\instructor\CourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
});

// Logged in user routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Auth routes
    Route::controller(AuthController::class)->group(function () {
        Route::get('/userinfo', 'getUser');
        Route::post('/logout', 'logout');
    });

    // Admin routes
    Route::middleware(['is_Admin'])->group(function () {});

    // Instructor routes
    Route::middleware(['is_Instructor'])->group(function () {
        Route::controller(CourseController::class)->group(function () {
            Route::get('/i/course', 'fetchCourses');
            Route::get('/i/course/{course_id}', 'fetchCourse');
            Route::get('/i/course/module/{item_id}', 'fetchCourseModuleItem');
        });
        Route::controller(ClassroomController::class)->group(function () {
            Route::get('/i/class', 'fetchClasses');
            Route::post('/i/create-class', 'createClass');
            Route::post('/i/edit-class/{class_id}', 'fetchClasses');
            Route::post('/i/edit-status-class/{class_id}', 'fetchClasses');
        });
        
    });

    // Student routes
    Route::middleware(['is_Student'])->group(function () {});
});
