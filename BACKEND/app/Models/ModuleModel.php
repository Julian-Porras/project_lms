<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModuleModel extends Model
{
    protected $table = 'tbl_module';
    protected $fillable = [
        'id',
        'user_id',
        'classroom_id',
        'course_id',
        'module_name',
        'is_visible',
    ];

    public function classroom()
    {
        return $this->belongsTo(ClassroomModel::class, 'classroom_id', 'id');
    }

    public function course()
    {
        return $this->belongsTo(CourseModel::class, 'course_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function module_items()
    {
        return $this->hasMany(ModuleItemModel::class, 'module_id', 'id');
    }
}
