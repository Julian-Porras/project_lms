<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleModel extends Model
{
    protected $table = 'tbl_roles';
    protected $fillable = [
        'id',
        'role_name',
    ];
}
