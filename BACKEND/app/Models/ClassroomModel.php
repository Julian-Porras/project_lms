<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassroomModel extends Model
{
    protected $table = 'tbl_classroom';
    protected $fillable = [
        'users_id',
        'course_id',
        'classroom_name',
        'classroom_code',
        'status',
        'created_at',
        'updated_at',
    ];

    public function course()
    {
        return $this->belongsTo(CourseModel::class, 'course_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
    public function students()
    {
        return $this->hasMany(StudentModel::class, 'classroom_id');
    }
}
