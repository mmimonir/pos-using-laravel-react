<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Category extends Model
{
    use HasFactory;
    public const IMAGE_UPLOAD_PATH = 'images/uploads/category/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/category_thumb/';

    protected $fillable =
    [
        'name',
        'slug',
        'description',
        'serial',
        'status',
        'photo',
        'user_id'
    ];

    final public function storeCategory(array $input)
    {
        return self::query()->create($input);
    }
    final public function getAllCategories($input)
    {
        $per_page = $input['per_page'] ?? 2;
        $query = self::query();
        if (!empty($input['search'])) {
            $query->where('name', 'LIKE', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->with('user:id,name')->paginate($per_page);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
