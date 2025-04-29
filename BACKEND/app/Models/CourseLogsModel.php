<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseLogsModel extends Model
{
    protected $table = 'tbl_course_logs';

    protected $fillable = [
        'course_id',
        'user_id',
        'action',
        'content',
        'created_at',
    ];
}
