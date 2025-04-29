<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassroomLogsModel extends Model
{
    protected $table = 'tbl_classroom_logs';

    protected $fillable = [
        'classroom_id',
        'user_id',
        'action',
        'content',
        'created_at',
    ];
}
