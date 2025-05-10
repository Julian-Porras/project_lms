<?php

namespace App\Http\Controllers\instructor;

use App\Enums\PaginateEnum;
use App\Http\Controllers\Controller;
use App\Models\ClassroomModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClassroomController extends Controller
{
    public function fetchClasses(Request $request)
    {
        $search = trim($request->search);
        $limit = trim($request->limit);
        $status = strtolower($request->status);
        $user = auth('sanctum')->user();
        $classes = ClassroomModel::when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('classroom_name', 'like', "%{$search}%");
            });
        })
            ->when($status, function ($query, $status) {
                if ($status == 'all') return $query;
                $query->where('status', $status);
            })
            ->where('user_id', $user->id)
            ->paginate($limit ?? PaginateEnum::FIVE->value);
        return response()->json($classes, 200);
    }

    public function fetchClass($class_id)
    {
        $class = ClassroomModel::with([
            'modules.module_items' => function ($query) {
                $query->select('id', 'item_name', 'item_type', 'module_id');
            }
        ])
            ->where('id', $class_id)
            ->first();
        return response()->json($class, 200);
    }

    public function createClass(Request $request)
    {
        $user = auth('sanctum')->user();
        $validator = Validator::make($request->all(), [
            'course_id'         => 'required',
            'classroom_name'    => 'required',
            'classroom_code'    => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            ClassroomModel::create([
                'user_id'           => $user->id,
                'course_id'         => $request->course_id,
                'classroom_name'    => $request->classroom_name,
                'classroom_code'    => $request->classroom_code,
            ]);
            return response()->json(['message' => 'Classroom created successful'], 200);
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
        } else {
            ClassroomModel::where('id', $class_id)
                ->update([
                    'classroom_name'    => $request->classroom_name,
                    'classroom_code'    => $request->classroom_code,
                ]);
            return response()->json(['message' => 'Classroom updated successful'], 200);
        }
    }

    public function editStatusClass($class_id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            ClassroomModel::where('id', $class_id)
                ->update([
                    'status' => $request->status,
                ]);
            return response()->json(['message' => 'Classroom updated successful'], 200);
        }
    }
}
