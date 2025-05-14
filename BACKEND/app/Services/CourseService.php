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
        $status = strtolower($request->status);
        return CourseModel::when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('course_name', 'like', "%{$search}%");
            });
        })
            ->when($status, function ($query, $status) {
                if ($status == 'all') return $query;
                $query->where('status', $status ?? StatusEnum::ACTIVE->value);
            })
            ->when($userId, function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->paginate($request->limit ?? PaginateEnum::TEN->value);
    }

    public function getAllCoursesByStatus($request)
    {
        $search = trim($request->search);
        $status = strtolower($request->status);
        return CourseModel::when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('course_name', 'like', "%{$search}%");
            });
        })
            ->when($status, function ($query, $status) {
                $query->where('status', $status ?? StatusEnum::ACTIVE->value);
            })
            ->get();
    }

    public function getCourseById($course_id)
    {
        return CourseModel::with([
            'modules.module_items' => function ($query) {
                $query->select('id', 'item_name', 'item_type', 'module_id');
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
