<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Str;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryListResource;
use App\Manager\ImageUploadManager;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = (new Category())->getAllCategories();
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
            $file = $request->input('photo');
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::slug($request->input('slug'));
            $path = Category::IMAGE_UPLOAD_PATH;
            $path_thumb = Category::THUMB_IMAGE_UPLOAD_PATH;
            $category['photo'] = ImageUploadManager::uploadImage($name, $width, $height, $path, $file);
            ImageUploadManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        }
        (new Category())->storeCategory($category);
        return response()->json(['msg' => 'Category created successfully', 'cls' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
