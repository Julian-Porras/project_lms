<?php

namespace App\Http\Controllers\instructor;

use App\Enums\StatusEnum;
use App\Models\CourseModel;
use App\Models\ModuleModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ModuleItemModel;

class CourseController extends Controller
{
    public function fetchCourses(Request $request)
    {
        $search = trim($request->search);
        $courses = CourseModel::where('status', StatusEnum::ACTIVE->value)
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('course_name', 'like', "%{$search}%");
                });
            })
            ->get();
        return response()->json($courses, 200);
    }

    public function fetchCourse($course_id)
    {
        $course = CourseModel::with([
            'modules.module_items' => function ($query) {
                $query->select('id', 'item_name', 'item_type', 'module_id');
            }
        ])
            ->where('id', $course_id)
            ->first();
        return response()->json($course, 200);
    }

    public function fetchCourseModuleItem($item_id)
    {
        $item = ModuleItemModel::where('id', $item_id)
            ->first()->load('module:module_name');
        return response()->json($item, 200);
    }
}
