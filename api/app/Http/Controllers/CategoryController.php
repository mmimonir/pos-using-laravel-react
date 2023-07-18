<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Manager\ImageUploadManager;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryEditResource;
use App\Http\Resources\CategoryListResource;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = (new Category())->getAllCategories($request->all());
        return CategoryListResource::collection($categories);
        // return response()->json(['categories' => $categories]);
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
    public function store(StoreCategoryRequest $request)
    {
        // return $request->all();
        $category = $request->except('photo');
        $category['user_id'] = auth()->user()->id;
        $category['slug'] = Str::slug($request->input('slug'));
        if ($request->has('photo')) {
            $category['photo'] = $this->processImageUpload($request->input('photo'), $category['slug']);
        }
        (new Category())->storeCategory($category);
        return response()->json(['msg' => 'Category created successfully', 'cls' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new CategoryEditResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        // return $request->all();
        $category_data = $request->except('photo');
        $category_data['slug'] = Str::slug($request->input('slug'));
        if ($request->has('photo')) {
            $category_data['photo'] = $this->processImageUpload($request->input('photo'), $category_data['slug'], $category->photo);
        }
        $category->update($category_data);
        return response()->json(['msg' => 'Category Updated successfully', 'cls' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if (!empty($category->photo)) {
            ImageUploadManager::deletePhoto(Category::IMAGE_UPLOAD_PATH, $category->photo);
            ImageUploadManager::deletePhoto(Category::THUMB_IMAGE_UPLOAD_PATH, $category->photo);
        }
        $category->delete();
        return response()->json(['msg' => 'Category Deleted successfully', 'cls' => 'warning']);
    }

    public function get_category_list()
    {
        $categories = (new Category())->getCategoryIdAndName();
        return response()->json($categories);
    }

    private function processImageUpload($file, $name, $existing_photo = null)
    {
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        $path = Category::IMAGE_UPLOAD_PATH;
        $path_thumb = Category::THUMB_IMAGE_UPLOAD_PATH;

        if (!empty($existing_photo)) {
            ImageUploadManager::deletePhoto(Category::IMAGE_UPLOAD_PATH, $existing_photo);
            ImageUploadManager::deletePhoto(Category::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
        }

        $photo_name = ImageUploadManager::uploadImage($name, $width, $height, $path, $file);
        ImageUploadManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $photo_name;
    }
}
