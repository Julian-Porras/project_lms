<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\ClassroomModel;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ClassroomPolicy
{
    public function view(User $user, ClassroomModel $classroomModel): bool
    {
        return $user->role_id === RoleEnum::ADMIN->value || $user->id === $classroomModel->user_id;
    }
    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, ClassroomModel $classroomModel): bool
    {
        return $user->role_id === RoleEnum::ADMIN->value || $user->id === $classroomModel->user_id;
    }

    public function delete(User $user, ClassroomModel $classroomModel): bool
    {
        return $user->role_id === RoleEnum::ADMIN->value || $user->id === $classroomModel->user_id;
    }

    public function restore(User $user, ClassroomModel $classroomModel): bool
    {
        return false;
    }
    
    public function forceDelete(User $user, ClassroomModel $classroomModel): bool
    {
        return false;
    }
}
