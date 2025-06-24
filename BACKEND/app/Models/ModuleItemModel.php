<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModuleItemModel extends Model
{
    protected $table = 'tbl_module_item';
    protected $fillable = [
        'id',
        'classroom_id',
        'course_id',
        'module_id',
        'item_name',
        'item_type',
        'item_content',
        'is_visible'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function module()
    {
        return $this->belongsTo(ModuleModel::class, 'module_id', 'id');
    }

    public function classroom()
    {
        return $this->belongsTo(ClassroomModel::class, 'classroom_id', 'id');
    }

    public function course()
    {
        return $this->belongsTo(CourseModel::class, 'course_id', 'id');
    }
}
