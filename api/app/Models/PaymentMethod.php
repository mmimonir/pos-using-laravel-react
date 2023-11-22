<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    public function getPaymentMethodList()
    {
        return self::query()->select(['id', 'name', 'account_number'])->get();
    }
}
