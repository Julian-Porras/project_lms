<?php

namespace App\Services;

use App\Enums\PaginateEnum;
use App\Models\ClassroomModel;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;

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
        // Get the classroom
        $classroom = DB::table('tbl_classroom')->where('id', $class_id)->first();
        if (!$classroom) {
            return null;
        }

        // Merge modules and sort by created_at
        $modules = DB::table('tbl_module')
            ->where('classroom_id', $class_id)
            ->orWhere('course_id', $classroom->course_id)
            ->orderBy('created_at')
            ->get()
            ->unique('id')
            ->values();

        // Get module_items for all modules
        $moduleItems = DB::table('tbl_module_item')
            ->select('id', 'classroom_id', 'course_id', 'item_name', 'item_type', 'module_id', 'is_visible')
            ->whereIn('module_id', $modules->pluck('id'))
            ->where(function ($query) use ($class_id) {
                $query->where('classroom_id', $class_id)
                    ->orWhereNull('classroom_id');
            })
            ->get()
            ->groupBy('module_id');

        // Attach module_items to each module
        foreach ($modules as $module) {
            $module->module_items = $moduleItems[$module->id] ?? collect();
        }

        // Attach modules to classroom
        $classroom->modules = $modules;
        return $classroom;
    }

    public function getClassroomInfo($class_id)
    {
        // Get the classroom
        $classroom = DB::table('tbl_classroom')->where('id', $class_id)->first();
        if (!$classroom) {
            return null;
        }

        return $classroom;
    }

    public function createClassroom(array $data)
    {
        return ClassroomModel::create($data);
    }

    public function updateClassroom($class_id, array $data)
    {
        $classroom = ClassroomModel::find($class_id);
        // Gate::authorize('update', $classroom);
        // $this->authorize('update', $classroom);
        return $classroom->update($data);
    }

    public function deleteClassroom($id)
    {
        // Logic to delete a classroom
    }
}
