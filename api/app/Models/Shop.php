<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'details',
        'email',
        'logo',
        'name',
        'phone',
        'status',
        'user_id',
    ];

    public const STATUS_ACTIVE = 1;
    public const STATUS_ACTIVE_TEXT = 'Active';
    public const STATUS_INACTIVE = 0;
    public const STATUS_INACTIVE_TEXT = 'Inactive';
    public const LOGO_WIDTH = 800;
    public const LOGO_HEIGHT = 800;
    public const LOGO_THUMB_WIDTH = 200;
    public const LOGO_THUMB_HEIGHT = 200;

    public const IMAGE_UPLOAD_PATH = 'images/uploads/shop/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/shop_thumb/';

    public function prepareData($input, $auth_id)
    {
        $shop['details'] = $input['details'] ?? '';
        $shop['email'] = $input['email'] ?? '';
        $shop['name'] = $input['name'] ?? '';
        $shop['phone'] = $input['phone'] ?? '';
        $shop['status'] = self::STATUS_ACTIVE;
        $shop['user_id'] = $auth_id;
        return $shop;
    }

    public function getShopList($input)
    {
        $per_page = $input['per_page'] ?? 2;
        $query = self::query()
            ->with(
                'address',
                'address.division:id,name',
                'address.district:id,name',
                'address.area:id,name',
                'user:id,name'
            );
        if (!empty($input['search'])) {
            $query->where('name', 'LIKE', '%' . $input['search'] . '%')
                ->orWhere('phone', 'LIKE', '%' . $input['search'] . '%')
                ->orWhere('email', 'LIKE', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->paginate($per_page);
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getSupplierSelectList()
    {
        return self::query()
            ->select('id', 'name', 'phone')
            ->where('status', self::STATUS_ACTIVE)
            ->get();
    }

    public function getShopListIdName()
    {
        return self::query()
            ->select(['id', 'name'])
            ->where('status', self::STATUS_ACTIVE)
            ->get();
    }

    public function getShopBySalesManagerId($id)
    {
        return self::query()
            ->with(
                'address',
                'address.division:id,name',
                'address.district:id,name',
                'address.area:id,name',
                'user:id,name'
            )
            ->findOrFail($id);
    }

    public function getShopIdAndName()
    {
        return self::query()->select('id as value', 'name as label')->get();
    }
}
