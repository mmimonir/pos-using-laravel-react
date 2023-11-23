<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_id',
        'category_id',
        'cost',
        'country_id',
        'sub_category_id',
        'supplier_id',
        'name',
        'description',
        'price',
        'discount_end',
        'discount_fixed',
        'discount_percent',
        'discount_start',
        'sku',
        'slug',
        'status',
        'stock',
        'created_by_id',
        'updated_by_id'
    ];

    public const STATUS_ACTIVE = 1;
    public const STATUS_INACTIVE = 0;

    public function storeProduct($input, $auth_id)
    {
        return self::create($this->prepareData($input, $auth_id));
    }

    private function prepareData($input, $auth_id)
    {
        return [
            'brand_id' => $input['brand_id'] ?? 0,
            'category_id' => $input['category_id'] ?? 0,
            'cost' => $input['cost'] ?? 0,
            'country_id' => $input['country_id'] ?? 0,
            'sub_category_id' => $input['sub_category_id'] ?? 0,
            'supplier_id' => $input['supplier_id'] ?? 0,
            'name' => $input['name'] ?? '',
            'description' => $input['description'] ?? '',
            'price' => $input['price'] ?? 0,
            'discount_end' => $input['discount_end'] ?? null,
            'discount_fixed' => $input['discount_fixed'] ?? 0,
            'discount_percent' => $input['discount_percent'] ?? 0,
            'discount_start' => $input['discount_start'] ?? 0,
            'sku' => $input['sku'] ?? '',
            'slug' => $input['slug'] ? Str::slug($input['slug']) : '',
            'status' => $input['status'] ?? 0,
            'stock' => $input['stock'] ?? 0,
            'created_by_id' => $auth_id,
            'updated_by_id' => $auth_id
        ];
    }

    public function getProductById($id)
    {
        return self::query()->with('primary_photo')->findOrFail($id);
    }

    public function getProductList($input)
    {
        $per_page = $input['per_page'] ?? 2;
        $query = self::query()
            ->with([
                'brand:id,name',
                'category:id,name',
                'country:id,name',
                'sub_category:id,name',
                'supplier:id,name,phone',
                'created_by:id,name',
                'updated_by:id,name',
                'primary_photo',
                'product_attributes',
                'product_attributes.attributes',
                'product_attributes.attribute_value',
            ]);
        if (!empty($input['search'])) {
            $query->where('name', 'LIKE', '%' . $input['search'] . '%')
                ->orWhere('sku', 'LIKE', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->paginate($per_page);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    public function sub_category()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by_id');
    }

    public function primary_photo()
    {
        return $this->hasOne(ProductPhoto::class)->where('is_primary', 1);
    }

    public function product_attributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }
}
