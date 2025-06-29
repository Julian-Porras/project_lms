<?php

namespace App\Services;

use App\Enums\StatusEnum;
use App\Enums\PaginateEnum;
use App\Models\CourseModel;
use Illuminate\Support\Facades\DB;

class CourseService
{
    public function getAllCourses($request, $userId)
    {
        $search = trim($request->search);
        $limit = trim($request->limit);
        $status = strtolower($request->status);
        return CourseModel::when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('course_name', 'like', "%{$search}%");
            });
        })
            ->when($status, function ($query, $status) {
                if ($status == 'all' || $status == null) return $query;
                $query->where('status', $status);
            })
            ->where('user_id', $userId)
            ->paginate($limit ?? PaginateEnum::FIVE->value);
    }

    public function getAllCoursesByStatus($request)
    {
        $search = trim($request->search);
        $status = strtolower($request->status) || StatusEnum::ACTIVE->value;
        return CourseModel::when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('course_name', 'like', "%{$search}%");
            });
        })
            ->where('status', $status)
            ->get();
    }
    public function getCourseById($course_id)
    {
        // Fetch course
        $course = DB::table('tbl_course')->where('id', $course_id)->first();
        if (!$course) {
            return null;
        }

        // Fetch modules for the course
        $modules = DB::table('tbl_module')
            ->where('course_id', $course_id)
            ->orderBy('created_at')
            ->get();

        // Fetch module items for the fetched modules
        $moduleItems = DB::table('tbl_module_item')
            ->select('id', 'course_id', 'item_name', 'item_type', 'module_id', 'is_visible')
            ->whereIn('module_id', $modules->pluck('id'))
            ->where('course_id', $course_id)
            ->get()
            ->groupBy('module_id');

        // Attach module items to their respective modules
        foreach ($modules as $module) {
            $module->module_items = $moduleItems[$module->id] ?? collect();
        }

        // Attach modules to the course
        $course->modules = $modules;

        return $course;
    }


    public function createCourse(array $data)
    {
        return CourseModel::create($data);
    }

    public function updateCourse($course_id, array $data)
    {
        $course = CourseModel::find($course_id);
        // $this->authorize('update', $course);
        return $course->update($data);
    }

    public function deleteCourse($id)
    {
        // Logic to delete a course
    }
}
