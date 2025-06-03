<?php

namespace App\Services;

use App\Enums\PaginateEnum;
use App\Models\ClassroomModel;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

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
                $query->select('id', 'item_name', 'item_type', 'module_id', 'is_visible');
            }
        ])
            ->where('id', $class_id)
            ->first();
    }

    public function createClassroom(array $data)
    {
        return ClassroomModel::create($data);
    }

    public function updateClassroom($class_id, array $data)
    {
        $classroom = ClassroomModel::find($class_id);
        // $this->authorize('update', $classroom);
        return $classroom->update($data);
    }

    public function deleteClassroom($id)
    {
        // Logic to delete a classroom
    }
}
