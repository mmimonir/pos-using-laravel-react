<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use App\Manager\PriceManager;
use App\Manager\ImageUploadManager;
use App\Utility\Date;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $price_manager = PriceManager::calculate_sell_price(
            $this->price,
            $this->discount_percent,
            $this->discount_fixed,
            $this->discount_start,
            $this->discount_end
        );
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'cost' => $this->cost,
            'price' => $this->price,
            'original_price' => $this->price,
            'sell_price' => $price_manager,
            'sku' => $this->sku,
            'stock' => $this->stock,
            'status' => $this->status == Product::STATUS_ACTIVE ? 'Active' : 'Inactive',
            'discount_fixed' => $this->discount_fixed,
            'discount_percent' => $this->discount_percent . '%',
            'description' => $this->description,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at == $this->updated_at ? 'Not Updated' : $this->updated_at->toDayDateTimeString(),
            'discount_start' => $this->discount_start != null ? Carbon::create($this->discount_start)->toDayDateTimeString() : null,
            'discount_end' => $this->discount_end != null ? Carbon::create($this->discount_end)->toDayDateTimeString() : null,
            'discount_remaining_days' => Date::calculate_discount_remaining_days($this->discount_end),
            'profit' => $price_manager['price'] - $this->cost,
            'profit_percentage' => number_format(((($price_manager['price'] - $this->cost) / $price_manager['price']) * 100), 2),

            'brand' => $this->brand?->name,
            'category' => $this->category?->name,
            'sub_category' => $this->subCategory?->name,
            'supplier' => $this->supplier ? $this->supplier?->name . ' ' . $this->supplier?->phone : null,
            'country' => $this->country?->name,
            'created_by' => $this->created_by?->name,
            'updated_by' => $this->updated_by?->name,

            'primary_photo' => ImageUploadManager::prepareImageUrl(ProductPhoto::THUMB_PHOTO_UPLOAD_PATH, $this->primary_photo?->photo),

            'attributes' => ProductAttributeListResource::collection($this->product_attributes),
            'photos' => ProductPhotoListResource::collection($this->photos),
        ];
    }
}
