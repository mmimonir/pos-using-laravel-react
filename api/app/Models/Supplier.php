<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
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

    public const IMAGE_UPLOAD_PATH = 'images/uploads/supplier/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/supplier_thumb/';

    public function prepareData($input, $auth_id)
    {
        $supplier['details'] = $input['details'] ?? '';
        $supplier['email'] = $input['email'] ?? '';
        $supplier['name'] = $input['name'] ?? '';
        $supplier['phone'] = $input['phone'] ?? '';
        $supplier['status'] = self::STATUS_ACTIVE;
        $supplier['user_id'] = $auth_id;
        return $supplier;
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function getSupplierList($input)
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
}
