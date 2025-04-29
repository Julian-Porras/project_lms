<?php

namespace App\Enums;

enum RoleEnum : int
{
    case ADMIN = 1;
    case INSTRUCTOR = 2;
    case STUDENT = 3;
}
