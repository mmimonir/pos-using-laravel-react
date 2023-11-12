<?php

namespace App\Http\Controllers;

use App\Models\ProductPhoto;
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
        return $request->all();
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
