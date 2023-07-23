<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Http\Requests\StoreDistrictRequest;
use App\Http\Requests\UpdateDistrictRequest;

class DistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $districts = (new District())->getDistrictByDivisionId($id);
        return response()->json($districts);
    }
}
