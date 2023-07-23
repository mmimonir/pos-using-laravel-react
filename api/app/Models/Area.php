<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function getAreaListByDistrictId($id)
    {
        return self::query()->select('id', 'name')->where('district_id', $id)->get();
    }
}
