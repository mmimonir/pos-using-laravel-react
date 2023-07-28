<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'address',
        'addressable_id',
        'addressable_type',
        'area_id',
        'district_id',
        'division_id',
        // 'landmark',
        'status',
        'type',
    ];

    const STATUS_ACTIVE = 1;
    const STATUS_INACTIVE = 0;
    const SUPPLIER_ADDRESS = 1;
    const CUSTOMER_PERMANENT_ADDRESS = 2;
    const CUSTOMER_PRESENT_ADDRESS = 3;

    public function prepareData($input)
    {
        $address['address'] = $input['address'] ?? '';
        $address['area_id'] = $input['area_id'] ?? '';
        $address['district_id'] = $input['district_id'] ?? '';
        $address['division_id'] = $input['division_id'] ?? '';
        // $address['landmark'] = $input['landmark'] ?? '';
        $address['status'] = $input['status'] ?? '';
        $address['type'] = self::SUPPLIER_ADDRESS;
        return $address;
    }

    public function addressable()
    {
        return $this->morphTo();
    }
}
