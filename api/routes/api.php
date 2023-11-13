<?php

use App\Http\Controllers\{
    AreaController,
    AttributeController,
    AttributeValueController,
    AuthController,
    BrandController,
    CategoryController,
    CountryController,
    DistrictController,
    DivisionController,
    ProductController,
    ProductPhotoController,
    SubCategoryController,
    SupplierController
};
use App\Manager\ScriptManager;
use App\Models\AttributeValue;
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
// Route::get("test", [ScriptManager::class, 'getCountry']);
Route::post("login", [AuthController::class, 'login']);

Route::get('divisions', [DivisionController::class, 'index']);
Route::get('districts/{id}', [DistrictController::class, 'index']);
Route::get('areas/{id}', [AreaController::class, 'index']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post("logout", [AuthController::class, 'logout']);
    Route::get("get-category-list", [CategoryController::class, 'get_category_list']);
    Route::get("get-sub-category-list/{category_id}", [SubCategoryController::class, 'get_sub_category_list']);
    Route::get("get-brand-list", [BrandController::class, 'get_brand_list']);
    Route::get("get-country-list", [CountryController::class, 'get_country_list']);
    Route::get("get-supplier-list", [SupplierController::class, 'get_supplier_list']);
    Route::get("get-attribute-list", [AttributeController::class, 'get_attribute_list']);
    Route::post("product-photo-upload/{id}", [ProductPhotoController::class, 'store']);
    Route::apiResource("category", CategoryController::class);
    Route::apiResource("sub-category", SubCategoryController::class);
    Route::apiResource("brand", BrandController::class);
    Route::apiResource("supplier", SupplierController::class);
    Route::apiResource("attribute", AttributeController::class);
    Route::apiResource("value", AttributeValueController::class);
    Route::apiResource("product", ProductController::class);
});
