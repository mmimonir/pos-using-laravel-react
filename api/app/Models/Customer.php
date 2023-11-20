<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'email'];

    public function store($input)
    {
        $customer = $this->prepareData($input);
        return self::query()->create($customer);
    }

    private function prepareData($input)
    {
        return $customer_data = [
            'name' => $input['name'] ?? '',
            'phone' => $input['phone'] ?? '',
            'email' => $input['email'] ?? '',
        ];
    }

    public function getCustomersBySearch($search)
    {
        return self::query()->select('id', 'name', 'phone')
            ->where('name', 'like', '%' . $search['search'] . '%')
            ->orWhere('phone', 'like', '%' . $search['search'] . '%')
            ->take(15)
            ->get();
    }
}
