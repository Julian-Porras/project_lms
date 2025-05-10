<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseModel extends Model
{
    protected $table = 'tbl_course';
    protected $fillable = [
        'id',
        'user_id',
        'course_name',
        'status',
        'background',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function classrooms()
    {
        return $this->hasMany(ClassroomModel::class, 'course_id');
    }
    public function modules()
    {
        return $this->hasMany(ModuleModel::class, 'course_id');
    }

}
