<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLogsModel extends Model
{
    protected $table = 'users_logs';

    protected $fillable = [
        'user_id',
        'action',
        'content',
        'created_at',
    ];
}
