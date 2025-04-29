<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassroomModel extends Model
{
    protected $table = 'tbl_classroom';
    protected $fillable = [
        'course_id',
        'classroom_name',
        'classroom_code',
        'status',
        'created_by',
        'created_at',
        'updated_at',
    ];

    public function course()
    {
        return $this->belongsTo(CourseModel::class, 'course_id');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function students()
    {
        return $this->hasMany(StudentModel::class, 'classroom_id');
    }
}
