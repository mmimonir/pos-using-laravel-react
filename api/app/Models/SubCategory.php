<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;
    public const IMAGE_UPLOAD_PATH = 'images/uploads/sub_category/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/sub_category_thumb/';

    protected $fillable =
    [
        'name',
        'category_id',
        'slug',
        'description',
        'serial',
        'status',
        'photo',
        'user_id'
    ];

    final public function storeSubCategory(array $input)
    {
        return self::query()->create($input);
    }
    final public function getAllSubCategories($input)
    {
        $per_page = $input['per_page'] ?? 2;
        $query = self::query();
        if (!empty($input['search'])) {
            $query->where('name', 'LIKE', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->with(['user:id,name', 'category:id,name'])->paginate($per_page);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function getCategoryIdAndName($category_id)
    {
        return self::query()->select('id', 'name')->where('category_id', $category_id)->get();
    }
    public function getSubCategoryIdAndName()
    {
        return self::query()->select('id', 'name', 'category_id')->get();
    }
}
