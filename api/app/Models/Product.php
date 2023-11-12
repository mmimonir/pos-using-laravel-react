<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_id',
        'category_id',
        'cost',
        'country_id',
        'sub_category_id',
        'supplier_id',
        'name',
        'description',
        'price',
        'discount_end',
        'discount_fixed',
        'discount_percent',
        'discount_start',
        'sku',
        'slug',
        'status',
        'stock',
        'created_by_id',
        'updated_by_id'
    ];

    public function storeProduct($input, $auth_id)
    {
        return self::create($this->prepareData($input, $auth_id));
    }

    private function prepareData($input, $auth_id)
    {
        return [
            'brand_id' => $input['brand_id'] ?? '',
            'category_id' => $input['category_id'] ?? '',
            'cost' => $input['cost'] ?? '',
            'country_id' => $input['country_id'] ?? '',
            'sub_category_id' => $input['sub_category_id'] ?? '',
            'supplier_id' => $input['supplier_id'] ?? '',
            'name' => $input['name'] ?? '',
            'description' => $input['description'] ?? '',
            'price' => $input['price'] ?? '',
            'discount_end' => $input['discount_end'] ?? '',
            'discount_fixed' => $input['discount_fixed'] ?? '',
            'discount_percent' => $input['discount_percent'] ?? '',
            'discount_start' => $input['discount_start'] ?? '',
            'sku' => $input['sku'] ?? '',
            'slug' => $input['slug'] ? Str::slug($input['slug']) : '',
            'status' => $input['status'] ?? '',
            'stock' => $input['stock'] ?? '',
            'created_by_id' => $auth_id,
            'updated_by_id' => $auth_id
        ];
    }
}
