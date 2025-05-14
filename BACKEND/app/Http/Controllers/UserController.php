<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Requests\CreateUserRequest;
use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService,
    ) {}

    public function fetchUsers(Request $request)
    {
        $role = RoleEnum::STUDENT->value;
        $request->merge(['role_id' => $role]);
        $users = $this->userService->getAllUsers($request);
        return response()->json($users, 200);
    }

    public function createUser(CreateUserRequest $request)
    {
        $this->userService->createUser($request->all());
        return response()->json(['message' => 'User created successfully'], 201);
    }
    
    public function fetchUser($user_id)
    {
        $user = $this->userService->getUserById($user_id);
        return response()->json($user, 200);
    }

    public function editUser($user_id, Request $request)
    {
        $this->userService->editUser($user_id, $request->all());
        return response()->json(['message' => 'User updated successfully'], 200);
    }
}
