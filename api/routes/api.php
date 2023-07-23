<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\SubCategoryController;
use App\Manager\ScriptManager;
use App\Models\District;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::get("test", [ScriptManager::class, 'getLocationData']);
Route::post("login", [AuthController::class, 'login']);

Route::get('divisions', [DivisionController::class, 'index']);
Route::get('districts/{id}', [DistrictController::class, 'index']);
Route::get('areas/{id}', [AreaController::class, 'index']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post("logout", [AuthController::class, 'logout']);
    Route::get("get-category-list", [CategoryController::class, 'get_category_list']);
    Route::apiResource("category", CategoryController::class);
    Route::apiResource("sub-category", SubCategoryController::class);
    Route::apiResource("brand", BrandController::class);
});
