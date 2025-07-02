<?php

namespace App\Http\Controllers\student;

use App\Http\Controllers\Controller;
use App\Services\ClassroomService;
use App\Services\ModuleItemService;
use App\Services\StudentService;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    public function __construct(
        protected ClassroomService $classroomService,
        protected StudentService $studentService,
        protected ModuleItemService $moduleItemService,
    ) {}

    public function fetchClassrooms()
    {
        $userId = auth('sanctum')->id();
        $classes = $this->studentService->getStudentAllClassrooms($userId);
        return response()->json($classes, 200);
    }

    public function fetchClassroom($class_id)
    {
        $class = $this->classroomService->getClassroomById($class_id);
        return response()->json($class, 200);
    }

    public function fetchClassModuleItem($item_id)
    {
        $item = $this->moduleItemService->getModuleItemById($item_id);
        return response()->json($item, 200);
    }

}
