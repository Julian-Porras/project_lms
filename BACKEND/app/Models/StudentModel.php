<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentModel extends Model
{
    protected $table = 'tbl_students';
    protected $fillable = [
        'classroom_id',
        'user_id',
    ];

    public function classroom()
    {
        return $this->belongsTo(ClassroomModel::class, 'classroom_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
}
