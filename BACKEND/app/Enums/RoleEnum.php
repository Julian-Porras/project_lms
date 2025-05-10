<?php

namespace App\Enums;

enum RoleEnum : int
{
    case ADMIN = 1;
    case DEVELOPER = 2;
    case INSTRUCTOR = 3;
    case STUDENT = 4;
}
