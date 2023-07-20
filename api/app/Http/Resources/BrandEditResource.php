<?php

namespace App\Http\Resources;

use App\Models\Brand;
use Illuminate\Http\Request;
use App\Manager\ImageUploadManager;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandEditResource extends JsonResource
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
            'slug' =>  $this->slug,
            'description' => $this->description,
            'serial' => $this->serial,
            'status' => $this->status,
            'logo_preview' => ImageUploadManager::prepareImageUrl(Brand::THUMB_IMAGE_UPLOAD_PATH, $this->logo),
        ];
    }
}
