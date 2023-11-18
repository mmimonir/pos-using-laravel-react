<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\SalesManager;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public const USER_TYPE_ADMIN = 1;
    public const USER_TYPE_SALES_MANAGER = 2;

    final public function login(AuthRequest $request)
    {
        if ($request->input('user_type') == self::USER_TYPE_ADMIN) {
            $user = (new User())->getUserByEmailOrPhone($request->all());
            $role = self::USER_TYPE_ADMIN;
        } else {
            $user = (new SalesManager())->getUserByEmailOrPhone($request->all());
            $role = self::USER_TYPE_SALES_MANAGER;
        }

        if ($user && Hash::check($request->input('password'), $user->password)) {
            $user_data['token'] = $user->createToken($user->email)->plainTextToken;
            $user_data['name'] = $user->name;
            $user_data['phone'] = $user->phone;
            $user_data['photo'] = $user->photo;
            $user_data['email'] = $user->email;
            $user_data['role'] = $role;
            return response()->json($user_data);
        }
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    final public function logout()
    {
        auth()->user()->tokens()->delete();
        // return response()->json(status: 500);
        return response()->json(['msg' => 'Yoy have successfully logged out']);
    }
}
