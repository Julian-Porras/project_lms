<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
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
