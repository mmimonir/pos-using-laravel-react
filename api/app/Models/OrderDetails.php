<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function storeOrderDetails($order_details, $order)
    {
        foreach ($order_details as $product) {
            $order_details_data = $this->prepareData($product, $order);
            self::query()->create($order_details_data);
        }
    }

    public function prepareData($product, $order)
    {
        return [
            'order_id' => $order->id,
            'name' => $product->name,
            'brand_id' => $product->brand_id,
            'category_id' => $product->category_id,
            'cost' => $product->cost,
            'discount_end' => $product->discount_end,
            'discount_fixed' => $product->discount_fixed,
            'discount_percent' => $product->discount_percent,
            'discount_start' => $product->discount_start,
            'price' => $product->price,
            'sku' => $product->sku,
            'sub_category_id' => $product->sub_category_id,
            'supplier_id' => $product->supplier_id,
            'quantity' => $product->quantity,
            'photo' => $product->primary_photo?->photo,
        ];
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function sub_category()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
