<?php

namespace App\Services;

use App\Enums\StatusEnum;
use App\Models\CourseModel;

class CourseService {
    public function getAllCourses($request) {
        $search = trim($request->search);
        $status = strtolower($request->status);
        $courses = CourseModel::when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('course_name', 'like', "%{$search}%");
            });
        })
            ->when($status, function ($query, $status) {
                if ($status == 'all') return $query;
                $query->where('status', $status ?? StatusEnum::ACTIVE->value);
            })
            ->get();
        return $courses;
    }

    public function getCourseById($course_id) {
        return CourseModel::with([
            'modules.module_items' => function ($query) {
                $query->select('id', 'item_name', 'item_type', 'module_id');
            }
        ])
            ->where('id', $course_id)
            ->first();
    }

    public function createCourse($data) {
        // Logic to create a new course
    }

    public function updateCourse($id, $data) {
        // Logic to update a course
    }

    public function deleteCourse($id) {
        // Logic to delete a course
    }
}
