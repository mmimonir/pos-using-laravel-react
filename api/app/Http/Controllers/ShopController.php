<?php

namespace App\Http\Controllers;

use Str;
use App\Models\Shop;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Manager\ImageUploadManager;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreShopRequest;
use App\Http\Requests\UpdateShopRequest;
use App\Http\Resources\ShopEditResource;
use App\Http\Resources\ShopListResource;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $shops = (new Shop())->getShopList($request->all());

        return ShopListResource::collection($shops);
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
    public function store(StoreShopRequest $request)
    {
        $shop = (new Shop())->prepareData($request->all(), Auth::id());
        $address = (new Address())->prepareData($request->all());

        if ($request->has('logo')) {
            $name = Str::slug($request->input('name') . now());
            $shop['logo'] = ImageUploadManager::processImageUpload(
                $request->input('logo'),
                $name,
                Shop::IMAGE_UPLOAD_PATH,
                Shop::LOGO_WIDTH,
                Shop::LOGO_HEIGHT,
                Shop::THUMB_IMAGE_UPLOAD_PATH,
                Shop::LOGO_THUMB_WIDTH,
                Shop::LOGO_THUMB_HEIGHT
            );
        }
        try {
            DB::beginTransaction();
            $shop = Shop::create($shop);
            $shop->address()->create($address);
            DB::commit();
            return response()->json(['msg' => 'Shop Created successfully', 'cls' => 'success']);
        } catch (\Throwable $e) {
            if (isset($shop['logo'])) {
                ImageUploadManager::deletePhoto(Shop::IMAGE_UPLOAD_PATH, $shop['logo']);
                ImageUploadManager::deletePhoto(Shop::THUMB_IMAGE_UPLOAD_PATH, $shop['logo']);
            }
            info('SHOP_STORE_FAILED', [
                'shop' => $shop,
                'address' => $address,
                'Exception' => $e->getMessage()
            ]);
            DB::rollBack();
            return response()->json([
                'msg' => 'Something is going wrong',
                'cls' => 'warning',
                'error' => $e->getMessage(),
                'flag' => true
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Shop $shop)
    {
        $shop->load('address');
        return new ShopEditResource($shop);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shop $shop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShopRequest $request, Shop $shop)
    {
        $shop_data = (new Shop())->prepareData($request->all(), Auth::id());
        $address_data = (new Address())->prepareData($request->all());

        if ($request->has('logo')) {
            $name = Str::slug($request->input('name') . now());
            $shop_data['logo'] = ImageUploadManager::processImageUpload(
                $request->input('logo'),
                $name,
                Shop::IMAGE_UPLOAD_PATH,
                Shop::LOGO_WIDTH,
                Shop::LOGO_HEIGHT,
                Shop::THUMB_IMAGE_UPLOAD_PATH,
                Shop::LOGO_THUMB_WIDTH,
                Shop::LOGO_THUMB_HEIGHT,
                $shop->logo
            );
        }
        try {
            DB::beginTransaction();
            $shop_data = $shop->update($shop_data);
            $shop->address()->update($address_data);
            DB::commit();
            return response()->json(['msg' => 'Shop Updated successfully', 'cls' => 'success']);
        } catch (\Throwable $e) {
            info('SHOP_STORE_FAILED', [
                'shop' => $shop_data,
                'address' => $address_data,
                'Exception' => $e->getMessage()
            ]);
            DB::rollBack();
            return response()->json([
                'msg' => 'Something is going wrong',
                'cls' => 'warning',
                'flag' => true
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
        if (!empty($shop->logo)) {
            ImageUploadManager::deletePhoto(Shop::IMAGE_UPLOAD_PATH, $shop->logo);
            ImageUploadManager::deletePhoto(Shop::THUMB_IMAGE_UPLOAD_PATH, $shop->logo);
        }
        (new Address())->deleteAddressBySupplerId($shop);
        $shop->delete();
        return response()->json(['msg' => 'Shop Deleted successfully', 'cls' => 'warning']);
    }

    public function get_shop_list()
    {
        $shops = (new Shop())->getShopListIdName();
        return response()->json($shops);
    }
}
