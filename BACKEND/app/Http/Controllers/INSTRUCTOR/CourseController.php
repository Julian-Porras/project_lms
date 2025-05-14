<?php

namespace App\Http\Controllers\instructor;

use App\Enums\StatusEnum;
use App\Models\CourseModel;
use App\Models\ModuleModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ModuleItemModel;
use App\Services\CourseService;
use App\Services\ModuleService;

class CourseController extends Controller
{
    public function __construct(
        protected CourseService $courseService,
        protected ModuleService $moduleService, 
    ) {}

    public function fetchCourses(Request $request)
    {
        $userId = auth('sanctum')->user()->id;
        $courses = $this->courseService->getAllCourses($request, $userId);
        return response()->json($courses, 200);
    }

    public function fetchCourse($course_id)
    {
        $course = $this->courseService->getCourseById($course_id);
        return response()->json($course, 200);
    }

    public function fetchCourseModuleItem($item_id)
    {
        $item = $this->moduleService->getModuleItemById($item_id);
        return response()->json($item, 200);
    }
}
