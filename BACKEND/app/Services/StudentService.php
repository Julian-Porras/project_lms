<?php

namespace App\Services;

use App\Models\ClassroomModel;
use App\Models\StudentModel;
use Illuminate\Support\Facades\DB;

class StudentService{

    public function getStudentAllClassrooms( $user_id)
    {
        return StudentModel::where('student_id', $user_id)->with('classroom')->get();
    }

    public function getClassroomAllStudents($classroom_id){
        return StudentModel::where('classroom_id', $classroom_id)->get();
    }
}
