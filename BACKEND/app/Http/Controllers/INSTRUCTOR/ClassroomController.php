<?php

namespace App\Http\Controllers\instructor;

use App\Enums\PaginateEnum;
use App\Http\Controllers\Controller;
use App\Models\ClassroomLogsModel;
use App\Services\ClassroomService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClassroomController extends Controller
{
    public function __construct(
        protected ClassroomService $classroomService,
        protected ClassroomLogsModel $classroomLogsModel,
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

    public function createClass(Request $request)
    {
        $user = auth('sanctum')->user();
        $validator = Validator::make($request->all(), [
            'course_id'         => 'required',
            'classroom_name'    => 'required',
            'classroom_code'    => 'required|unique',
        ], [
            'classroom_code.unique' => 'The classroom code is invalid.',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        try {
            $request->merge(['user_id' => $user->id]);
            $this->classroomService->createClassroom($request);
            return response()->json(['message' => 'Classroom created successfully'], 201);
        } catch (\Exception $e) {
            // return response()->json(['error' => $e], 500);
            return response()->json(['error' => 'Failed to create classroom'], 500);
        }
    }

    public function editClass($class_id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'classroom_name'    => 'required',
            'classroom_code'    => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        try {
            $this->classroomService->updateClassroom($class_id, $request);
            return response()->json(['message' => 'Classroom updated successfully'], 200);
        } catch (\Exception $e) {
            // return response()->json(['error' => $e], 500);
            return response()->json(['error' => 'Failed to update classroom'], 500);
        }
    }

    public function editStatusClass($class_id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        try {
            $this->classroomService->updateClassroom($class_id, $request);
            return response()->json(['message' => 'Classroom updated successfully'], 200);
        } catch (\Exception $e) {
            // return response()->json(['error' => $e], 500);
            return response()->json(['error' => 'Failed to update classroom'], 500);
        }
    }
}
