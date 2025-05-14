<?php

namespace App\Services;

use App\Enums\PaginateEnum;
use App\Models\User;

class UserService
{
    public function getAllUsers($request)
    {
        $search = trim($request->search);
        $limit = trim($request->limit);
        $role = trim($request->role_id);
        return User::when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('username', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('first_name', 'like', "%{$search}%")
                    ->orWhere('email_address', 'like', "%{$search}%");
            });
        })
            ->when($role, function ($query, $role) {
                if ($role == 'all') return $query;
                $query->where('role_id', $role);
            })
            ->paginate($limit ?? PaginateEnum::TEN->value);
    }

    public function getUserById($user_id)
    {
        return User::find($user_id);
    }

    public function createUser(array $data)
    {
        return User::create($data);
    }

    public function editUser($user_id, array $data)
    {
        $user = User::find($user_id);
        // $this->authorize('update', $user);
        return $user->update($data);
    }
}