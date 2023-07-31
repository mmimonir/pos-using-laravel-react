<?php

namespace App\Http\Controllers;

use Str;
use App\Models\Address;
use App\Models\Supplier;
use App\Manager\ImageUploadManager;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $suppliers = (new Supplier())->getSupplierList($request->all());

        return response()->json(['suppliers' => $suppliers]);
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
        $supplier = Supplier::create($supplier);
        $supplier->address()->create($address);

        return response()->json(['msg' => 'Supplier Created successfully', 'cls' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        //
    }
}
