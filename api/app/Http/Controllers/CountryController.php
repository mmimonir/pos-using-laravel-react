<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Http\Requests\StoreCountryRequest;
use App\Http\Requests\UpdateCountryRequest;

class CountryController extends Controller
{
    public function get_country_list()
    {
        $countries = (new Country())->getCountryNameAndId();
        return response()->json($countries);
    }
}
