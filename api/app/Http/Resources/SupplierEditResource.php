<?php

namespace App\Http\Resources;

use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Manager\ImageUploadManager;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierEditResource extends JsonResource
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
            'details' => $this->details,
            'email' => $this->email,
            'name' => $this->name,
            'phone' => $this->phone,
            'display_logo' => ImageUploadManager::prepareImageURL(Supplier::THUMB_IMAGE_UPLOAD_PATH, $this->logo),
            'status' => $this->status,
            'address' => $this->address?->address,
            'area_id' => $this->address?->area_id,
            'district_id' => $this->address?->district_id,
            'division_id' => $this->address?->division_id,
            'landmark' => $this->address?->landmark,

        ];
    }
}
