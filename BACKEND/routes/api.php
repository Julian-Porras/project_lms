<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\developer\CourseController as DevCourseController;
use App\Http\Controllers\developer\ClassroomController as DevClassroomController;
use App\Http\Controllers\developer\ModuleController as DevModuleController;
use App\Http\Controllers\instructor\CourseController;
use App\Http\Controllers\instructor\ModuleController;
use App\Http\Controllers\instructor\ClassroomController;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
});

// Logged in user routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Auth routes
    Route::controller(AuthController::class)->group(function () {
        Route::post('/logout', 'logout');
    });

    // User routes
    Route::controller(UserController::class)->group(function () {
        Route::get('/user', 'fetchUsers');
        Route::get('/user-info', 'fetchUserInfo');
        Route::post('/user-create', 'createUser');
        Route::get('/user/{user_id}', 'fetchUser');
        Route::post('/user-edit/{user_id}', 'editUser');
    });

    // Admin routes
    Route::middleware(['is_Admin'])->group(function () {});

    // Developer routes
    Route::middleware(['is_Developer'])->group(function () {
        Route::controller(DevCourseController::class)->group(function () {
            Route::get('/d/course', 'fetchCourses');
            Route::get('/d/course/status', 'fetchCoursesByStatus');
            Route::get('/d/course/{course_id}', 'fetchCourse');
            Route::post('/d/create-course', 'createCourse');
            Route::post('/d/edit-course/{course_id}', 'editCourse');
        });
        Route::controller(DevClassroomController::class)->group(function () {
            Route::get('/d/class', 'fetchClasses');
            Route::get('/d/class/{class_id}', 'fetchClass');
            Route::post('/d/create-class', 'createClass');
            Route::post('/d/edit-class/{class_id}', 'editClass');
        });
        Route::controller(DevModuleController::class)->group(function () {
            Route::post('/d/create-module', 'createModule');
            Route::post('/d/edit-module/{module_id}', 'editModule');
            Route::post('/d/delete-module/{module_id}', 'deleteModule');
            Route::get('/d/module/{module_id}', 'fetchModuleItem');
            Route::post('/d/module/create-item', 'createModuleItem');
            Route::post('/d/module/edit-item/{item_id}', 'editModuleItem');
            Route::post('/d/module/delete-item/{item_id}', 'deleteModuleItem');
        });
    });

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
        Route::controller(ModuleController::class)->group(function () {
            Route::get('/i/module/{module_id}', 'fetchClassModuleItem');
            Route::post('/i/create-module', 'createModule');
            Route::post('/i/edit-module/{module_id}', 'editModule');
            Route::post('/i/delete-module/{module_id}', 'deleteModule');
            Route::post('/i/create-module-item', 'createModuleItem');
            Route::post('/i/edit-module-item/{item_id}', 'editModuleItem');
            Route::post('/i/delete-module-item/{item_id}', 'deleteModuleItem');
        });
        
    });

    // Student routes
    Route::middleware(['is_Student'])->group(function () {});
});
