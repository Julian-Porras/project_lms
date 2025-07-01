<?php

namespace App\Http\Controllers\developer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateClassRequest;
use App\Http\Requests\UpdateClassRequest;
use App\Services\ClassroomService;

class ClassroomController extends Controller
{
    public function __construct(
        protected ClassroomService $classroomService,
    ) {}

    public function fetchClasses(Request $request)
    {
        $userId = auth('sanctum')->user()->id;
        $classes = $this->classroomService->getAllClassrooms($request, $userId);
        return response()->json($classes, 200);
    }

    public function fetchClass($class_id)
    {
        $class = $this->classroomService->getClassroomById($class_id);
        return response()->json($class, 200);
    }

    public function fetchClassInfo($class_id)
    {
        $class = $this->classroomService->getClassroomInfo($class_id);
        return response()->json($class, 200);
    }

    public function createClass(CreateClassRequest $request)
    {
        $user = auth('sanctum')->user();
        $class = $this->classroomService->createClassroom(array_merge($request->validated(), ['user_id' => $user->id]));
        return response()->json(['message' => 'Classroom created successfully', 'class' => $class], 201);
    }

    public function editClass($class_id, UpdateClassRequest $request)
    {
        $this->classroomService->updateClassroom($class_id, $request->validated());
        return response()->json(['message' => 'Classroom updated successfully'], 200);
    }

}
