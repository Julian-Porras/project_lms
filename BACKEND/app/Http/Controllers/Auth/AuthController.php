<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email_address' => 'required|email|exists:users,email_address',
            'password'      => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            $user = User::where('email_address', $request->email_address)->first();
            if ($user && password_verify($request->password, $user->password)) {
                $token = $user->createToken($user->email_address)->plainTextToken;
                return response()->json([
                    'token' => $token,
                    'user'  => $user,
                ], 200);
            } else {
                return response()->json(['errors' => ['email_address' => 'Invalid credential']], 401);
            }
        }
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'email_address' => 'required|email',
            'first_name'    => 'required',
            'last_name'     => 'required',
            'password'      => 'required|min:8',
            'password_confirmation' => 'required_with:password|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            User::create([
                'role_id'       => RoleEnum::STUDENT->value,
                'first_name'    => $request->first_name,
                'last_name'     => $request->last_name,
                'username'      => $request->email_address,
                'email_address' => $request->email_address,
                'password'      => Hash::make($request->password),
            ]);
            $this->login($request->email_address, $request->password);
        }

    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout successful'], 200);
    }

    public function getUser()
    {
        $user = User::find(auth('sanctum')->user()->id);
        return response()->json($user, 200);
    }
}
