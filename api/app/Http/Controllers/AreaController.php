<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Http\Requests\StoreAreaRequest;
use App\Http\Requests\UpdateAreaRequest;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $areas = (new Area())->getAreaListByDistrictId($id);
        return response()->json($areas);
    }
}
