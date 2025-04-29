<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseModel extends Model
{
    protected $table = 'tbl_course';
    protected $fillable = [
        'course_name',
        'status',
        'created_by',
        'created_at',
        'updated_at',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function classrooms()
    {
        return $this->hasMany(ClassroomModel::class, 'course_id');
    }
}
