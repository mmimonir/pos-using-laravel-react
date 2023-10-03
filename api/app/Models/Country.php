<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    protected $guarded = [];

    public const STATUS_ACTIVE = 1;

    public function getCountryNameAndId()
    {
        return self::query()
            ->select('id', 'name')
            ->where('status', self::STATUS_ACTIVE)
            ->orderBy('name', 'asc')
            ->get();
    }
}
