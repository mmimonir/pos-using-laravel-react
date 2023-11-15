<?php

namespace App\Http\Resources;

use App\Models\Shop;
use Illuminate\Http\Request;
use App\Manager\ImageUploadManager;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'details' => $this->details,
            'created_by' => $this->user?->name,
            'status' => $this->status == Shop::STATUS_ACTIVE ? Shop::STATUS_ACTIVE_TEXT : Shop::STATUS_INACTIVE_TEXT,
            'logo' => ImageUploadManager::prepareImageURL(Shop::THUMB_IMAGE_UPLOAD_PATH, $this->logo),
            'logo_full' => ImageUploadManager::prepareImageURL(Shop::IMAGE_UPLOAD_PATH, $this->logo),
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
            // 'user_id' => $this->user_id,
            'address' => new AddressListResource($this->address),
        ];
    }
}
