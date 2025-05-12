<?php

namespace App\Providers;

use App\Models\ClassroomModel;
use App\Models\CourseModel;
use App\Policies\ClassroomPolicy;
use App\Policies\CoursePolicy;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    protected $policies = [
        ClassroomModel::class   => ClassroomPolicy::class,
        CourseModel::class      => CoursePolicy::class,
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
