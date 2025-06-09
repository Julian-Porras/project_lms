<?php

namespace App\Providers;

use App\Models\ClassroomModel;
use App\Models\CourseModel;
use App\Models\ModuleModel;
use App\Policies\ClassroomPolicy;
use App\Policies\CoursePolicy;
use App\Policies\ModulePolicy;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    protected $policies = [
        ClassroomModel::class   => ClassroomPolicy::class,
        CourseModel::class      => CoursePolicy::class,
        ModuleModel::class      => ModulePolicy::class,
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
