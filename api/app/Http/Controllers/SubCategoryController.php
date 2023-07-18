<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Manager\ImageUploadManager;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Http\Resources\SubCategoryEditResource;
use App\Http\Resources\SubCategoryListResource;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = (new SubCategory())->getAllSubCategories($request->all());
        return SubCategoryListResource::collection($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubCategoryRequest $request)
    {
        // return $request->all();
        $sub_category = $request->except('photo');
        $sub_category['user_id'] = auth()->user()->id;
        $sub_category['slug'] = Str::slug($request->input('slug'));
        if ($request->has('photo')) {
            $sub_category['photo'] = $this->processImageUpload($request->input('photo'), $sub_category['slug']);
        }
        (new SubCategory())->storeSubCategory($sub_category);
        return response()->json(['msg' => 'Sub Category created successfully', 'cls' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(SubCategory $subCategory)
    {
        return new SubCategoryEditResource($subCategory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubCategory $subCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubCategoryRequest $request, SubCategory $subCategory)
    {
        // return $request->all();
        $sub_category_data = $request->except('photo');
        $sub_category_data['slug'] = Str::slug($request->input('slug'));
        if ($request->has('photo')) {
            $sub_category_data['photo'] = $this->processImageUpload($request->input('photo'), $sub_category_data['slug'], $subCategory->photo);
        }
        $subCategory->update($sub_category_data);
        return response()->json(['msg' => 'Sub Category Updated successfully', 'cls' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCategory $subCategory)
    {
        if (!empty($subCategory->photo)) {
            ImageUploadManager::deletePhoto(SubCategory::IMAGE_UPLOAD_PATH, $subCategory->photo);
            ImageUploadManager::deletePhoto(SubCategory::THUMB_IMAGE_UPLOAD_PATH, $subCategory->photo);
        }
        $subCategory->delete();
        return response()->json(['msg' => 'Sub Category Deleted successfully', 'cls' => 'warning']);
    }

    private function processImageUpload($file, $name, $existing_photo = null)
    {
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        $path = SubCategory::IMAGE_UPLOAD_PATH;
        $path_thumb = SubCategory::THUMB_IMAGE_UPLOAD_PATH;

        if (!empty($existing_photo)) {
            ImageUploadManager::deletePhoto(SubCategory::IMAGE_UPLOAD_PATH, $existing_photo);
            ImageUploadManager::deletePhoto(SubCategory::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
        }

        $photo_name = ImageUploadManager::uploadImage($name, $width, $height, $path, $file);
        ImageUploadManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $photo_name;
    }
}
