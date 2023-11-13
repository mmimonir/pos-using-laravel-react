<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Models\ProductPhoto;
use App\Manager\ImageUploadManager;
use App\Http\Requests\StoreProductPhotoRequest;
use App\Http\Requests\UpdateProductPhotoRequest;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreProductPhotoRequest $request, $id)
    {
        // return $request->photos;
        try {
            if ($request->has('photos')) {
                $product = (new Product())->getProductById($id);
                if ($product) {
                    foreach ($request->photos as $photo) {
                        $name = Str::slug(
                            $product->slug . '-' . Carbon::now()->toDayDateTimeString() . '-' . random_int(10000, 99999)
                        );
                        $photo_data['product_id'] = $id;
                        $photo_data['is_primary'] = $photo['is_primary'];
                        $photo_data['photo'] = ImageUploadManager::processImageUpload(
                            $photo['photo'],
                            $name,
                            ProductPhoto::PHOTO_UPLOAD_PATH,
                            ProductPhoto::PHOTO_WIDTH,
                            ProductPhoto::PHOTO_HEIGHT,
                            ProductPhoto::THUMB_PHOTO_UPLOAD_PATH,
                            ProductPhoto::PHOTO_THUMB_WIDTH,
                            ProductPhoto::PHOTO_THUMB_HEIGHT,
                        );
                        (new ProductPhoto())->storeProductPhoto($photo_data);
                    }
                    return response()->json([
                        'msg' => 'Product photos uploaded successfully.',
                        'cls' => 'success'
                    ]);
                }
            }
        } catch (\Throwable $e) {
            info('PRODUCT_PHOTO_SAVE_FAILED', ['data' => $request->all(), 'error' => $e->getMessage()]);
            return response()->json([
                'msg' => $e->getMessage(),
                'cls' => 'warning'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductPhotoRequest $request, ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductPhoto $productPhoto)
    {
        //
    }
}
