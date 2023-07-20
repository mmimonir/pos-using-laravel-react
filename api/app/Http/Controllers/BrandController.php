<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Manager\ImageUploadManager;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandEditResource;
use App\Http\Resources\BrandListResource;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = (new Brand())->getAllBrands($request->all());
        return BrandListResource::collection($categories);
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
    public function store(StoreBrandRequest $request)
    {
        $brand = $request->except('logo');
        $brand['user_id'] = auth()->user()->id;
        $brand['slug'] = Str::slug($request->input('slug'));
        if ($request->has('logo')) {
            $brand['logo'] = $this->processImageUpload($request->input('logo'), $brand['slug']);
        }
        (new Brand())->storeBrand($brand);
        return response()->json(['msg' => 'Brand Created successfully', 'cls' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return new BrandEditResource($brand);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $brand_data = $request->except('logo');
        $brand_data['slug'] = Str::slug($request->input('slug'));
        if ($request->has('photo')) {
            $brand_data['photo'] = $this->processImageUpload($request->input('photo'), $brand_data['slug'], $brand->photo);
        }
        $brand->update($brand_data);
        return response()->json(['msg' => 'Brand Updated successfully', 'cls' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        if (!empty($brand->logo)) {
            ImageUploadManager::deletePhoto(Brand::IMAGE_UPLOAD_PATH, $brand->logo);
            ImageUploadManager::deletePhoto(Brand::THUMB_IMAGE_UPLOAD_PATH, $brand->logo);
        }
        $brand->delete();
        return response()->json(['msg' => 'Brand Deleted successfully', 'cls' => 'warning']);
    }
    private function processImageUpload($file, $name, $existing_photo = null)
    {
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        $path = Brand::IMAGE_UPLOAD_PATH;
        $path_thumb = Brand::THUMB_IMAGE_UPLOAD_PATH;

        if (!empty($existing_photo)) {
            ImageUploadManager::deletePhoto(Brand::IMAGE_UPLOAD_PATH, $existing_photo);
            ImageUploadManager::deletePhoto(Brand::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
        }

        $photo_name = ImageUploadManager::uploadImage($name, $width, $height, $path, $file);
        ImageUploadManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $photo_name;
    }
}
