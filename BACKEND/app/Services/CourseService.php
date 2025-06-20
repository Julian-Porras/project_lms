<?php

namespace App\Services;

use App\Enums\PaginateEnum;
use App\Enums\StatusEnum;
use App\Models\CourseModel;

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
        return CourseModel::with([
            'modules.module_items' => function ($query) {
                $query->select('id', 'item_name', 'item_type', 'module_id', 'is_visible');
            }
        ])
            ->where('id', $course_id)
            ->first();
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
