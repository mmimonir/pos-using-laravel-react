<?php

namespace App\Http\Controllers;

use Str;
use App\Models\Address;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Manager\ImageUploadManager;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierEditResource;
use App\Http\Resources\SupplierListResource;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $suppliers = (new Supplier())->getSupplierList($request->all());

        return SupplierListResource::collection($suppliers);
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
    public function store(StoreSupplierRequest $request)
    {
        $supplier = (new Supplier())->prepareData($request->all(), Auth::id());
        $address = (new Address())->prepareData($request->all());

        if ($request->has('logo')) {
            $name = Str::slug($request->input('name') . now());
            $supplier['logo'] = ImageUploadManager::processImageUpload(
                $request->input('logo'),
                $name,
                Supplier::IMAGE_UPLOAD_PATH,
                Supplier::LOGO_WIDTH,
                Supplier::LOGO_HEIGHT,
                Supplier::THUMB_IMAGE_UPLOAD_PATH,
                Supplier::LOGO_THUMB_WIDTH,
                Supplier::LOGO_THUMB_HEIGHT
            );
        }
        try {
            DB::beginTransaction();
            $supplier = Supplier::create($supplier);
            $supplier->address()->create($address);
            DB::commit();
            return response()->json(['msg' => 'Supplier Created successfully', 'cls' => 'success']);
        } catch (\Throwable $e) {
            if (isset($supplier['logo'])) {
                ImageUploadManager::deletePhoto(Supplier::IMAGE_UPLOAD_PATH, $supplier['logo']);
                ImageUploadManager::deletePhoto(Supplier::THUMB_IMAGE_UPLOAD_PATH, $supplier['logo']);
            }
            info('SUPPLIER_STORE_FAILED', [
                'supplier' => $supplier,
                'address' => $address,
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
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        $supplier->load('address');
        return new SupplierEditResource($supplier);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $supplier_data = (new Supplier())->prepareData($request->all(), Auth::id());
        $address_data = (new Address())->prepareData($request->all());

        if ($request->has('logo')) {
            $name = Str::slug($request->input('name') . now());
            $supplier_data['logo'] = ImageUploadManager::processImageUpload(
                $request->input('logo'),
                $name,
                Supplier::IMAGE_UPLOAD_PATH,
                Supplier::LOGO_WIDTH,
                Supplier::LOGO_HEIGHT,
                Supplier::THUMB_IMAGE_UPLOAD_PATH,
                Supplier::LOGO_THUMB_WIDTH,
                Supplier::LOGO_THUMB_HEIGHT,
                $supplier->logo
            );
        }
        try {
            DB::beginTransaction();
            $supplier_data = $supplier->update($supplier_data);
            $supplier->address()->update($address_data);
            DB::commit();
            return response()->json(['msg' => 'Supplier Updated successfully', 'cls' => 'success']);
        } catch (\Throwable $e) {
            info('SUPPLIER_STORE_FAILED', [
                'supplier' => $supplier_data,
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
    public function destroy(Supplier $supplier)
    {
        if (!empty($supplier->logo)) {
            ImageUploadManager::deletePhoto(Supplier::IMAGE_UPLOAD_PATH, $supplier->logo);
            ImageUploadManager::deletePhoto(Supplier::THUMB_IMAGE_UPLOAD_PATH, $supplier->logo);
        }
        (new Address())->deleteAddressBySupplerId($supplier);
        $supplier->delete();
        return response()->json(['msg' => 'Supplier Deleted successfully', 'cls' => 'warning']);
    }
}
