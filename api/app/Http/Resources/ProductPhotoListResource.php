<?php

namespace App\Http\Resources;

use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use App\Manager\ImageUploadManager;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductPhotoListResource extends JsonResource
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
            'photo' => ImageUploadManager::prepareImageUrl(ProductPhoto::THUMB_PHOTO_UPLOAD_PATH, $this->photo),
            'photo_original' => ImageUploadManager::prepareImageUrl(ProductPhoto::PHOTO_UPLOAD_PATH, $this->photo),
        ];
    }
}
