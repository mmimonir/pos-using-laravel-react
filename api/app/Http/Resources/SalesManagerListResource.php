<?php

namespace App\Http\Resources;

use App\Models\SalesManager;
use Illuminate\Http\Request;
use App\Manager\ImageUploadManager;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesManagerListResource extends JsonResource
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
            'bio' => $this->bio,
            'created_by' => $this->user?->name,
            'status' => $this->status == SalesManager::STATUS_ACTIVE ? SalesManager::STATUS_ACTIVE_TEXT : SalesManager::STATUS_INACTIVE_TEXT,
            'photo' => ImageUploadManager::prepareImageURL(SalesManager::THUMB_PHOTO_UPLOAD_PATH, $this->photo),
            'photo_full' => ImageUploadManager::prepareImageURL(SalesManager::PHOTO_UPLOAD_PATH, $this->photo),
            'nid_photo' => ImageUploadManager::prepareImageURL(SalesManager::THUMB_PHOTO_UPLOAD_PATH, $this->nid_hoto),
            'nid_photo_full' => ImageUploadManager::prepareImageURL(SalesManager::PHOTO_UPLOAD_PATH, $this->nid_photo),
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
            // 'user_id' => $this->user_id,
            'address' => new AddressListResource($this->address),
            'shop' => $this->shop?->name,
        ];
    }
}
