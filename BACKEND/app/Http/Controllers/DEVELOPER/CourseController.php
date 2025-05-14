<?php

namespace App\Http\Controllers\developer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Services\CourseService;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function __construct(
        protected CourseService $courseService,
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

    public function createCourse(CreateCourseRequest $request)
    {
        $user = auth('sanctum')->user();
        $this->courseService->createCourse(array_merge($request->validated(), ['user_id' => $user->id]));
        return response()->json(['message' => 'Course created successfully'], 201);
    }
    
    public function editCourse($course_id, UpdateCourseRequest $request)
    {
        $this->courseService->updateCourse($course_id, $request->validated());
        return response()->json(['message' => 'Course updated successfully'], 200);
    }

}
