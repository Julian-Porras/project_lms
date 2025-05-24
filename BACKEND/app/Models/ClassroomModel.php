<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassroomModel extends Model
{
    protected $table = 'tbl_classroom';
    protected $fillable = [
        'id',
        'user_id',
        'course_id',
        'classroom_name',
        'classroom_code',
        'year_level',
        'status',
        'background',
        'created_at',
        'updated_at',
    ];

    public function course()
    {
        return $this->belongsTo(CourseModel::class, 'course_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function students()
    {
        return $this->hasMany(StudentModel::class, 'classroom_id');
    }
    public function modules()
    {
        return $this->hasMany(ModuleModel::class, 'classroom_id');
    }
}
