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
        // Get class_modules
        $classModules = DB::table('tbl_module')
            ->where('classroom_id', $class_id)
            ->get();

        // Get course_modules
        $courseModules = DB::table('tbl_module')
            ->where('course_id', $classroom->course_id)
            ->get();

        // Merge modules and sort by created_at
        $modules = $classModules
            ->merge($courseModules)
            ->sortBy('created_at')
            ->values();

        // Get module_items for all modules
        $moduleItems = DB::table('tbl_module_item')
            ->select('id', 'item_name', 'item_type', 'module_id', 'is_visible')
            ->whereIn('module_id', $modules->pluck('id')->all())
            ->get()
            ->groupBy('module_id');

        // Attach module_items to each module
        $modules = $modules->map(function ($module) use ($moduleItems) {
            $module->module_items = $moduleItems->get($module->id, collect());
            return $module;
        });

        // Attach modules to classroom
        $classroom->modules = $modules->values();
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
