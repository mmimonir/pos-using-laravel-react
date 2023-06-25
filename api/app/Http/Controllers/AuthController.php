<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(AuthRequest $request){
        return $request;
    }
}
