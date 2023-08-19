<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'status',
        'user_id',
    ];

    public function getAttributeList()
    {
        return self::query()->with('user')->orderBy('updated_at', 'desc')->paginate(50);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
