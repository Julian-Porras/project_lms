<?php

namespace App\Services;

use App\Enums\PaginateEnum;
use Illuminate\Http\Request;
use App\Models\ClassroomModel;
use Illuminate\Support\Facades\Validator;

class ClassroomService
{
    public function getAllClassrooms($request, $user_id)
    {
        $search = trim($request->search);
        $limit = trim($request->limit);
        $status = strtolower($request->status);
        return ClassroomModel::when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('classroom_name', 'like', "%{$search}%");
            });
        })
            ->when($status, function ($query, $status) {
                if ($status == 'all') return $query;
                $query->where('status', $status);
            })
            ->where('user_id', $user_id)
            ->paginate($limit ?? PaginateEnum::FIVE->value);
    }

    public function getClassroomById($class_id)
    {
        return ClassroomModel::with([
            'modules.module_items' => function ($query) {
                $query->select('id', 'item_name', 'item_type', 'module_id');
            }
        ])
            ->where('id', $class_id)
            ->first();
    }

    public function createClassroom($request, $user_id)
    {
        return ClassroomModel::create([
            'user_id'           => $user_id,
            'course_id'         => $request->course_id,
            'classroom_name'    => $request->classroom_name,
            'classroom_code'    => $request->classroom_code,
        ]);
    }

    public function updateClassroom($class_id, $request)
    {
        return ClassroomModel::where('id', $class_id)->update($request);
    }

    public function deleteClassroom($id)
    {
        // Logic to delete a classroom
    }
}
