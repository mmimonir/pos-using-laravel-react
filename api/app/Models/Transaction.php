<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = [];

    public const CREDIT = 1;
    public const DEBIT = 2;
    public const STATUS_SUCCESS = 1;
    public const STATUS_FAILED = 2;

    public function transactionable()
    {
        return $this->morphTo();
    }

    public function storeTransaction($input, $order, $auth)
    {
        $transaction_data = $this->prepareData($input, $order, $auth);
        return self::query()->create($transaction_data);
    }

    private function prepareData($input, $order, $auth)
    {
        return [
            'order_id' => $order->id ?? 0,
            'customer_id' => $input['order_summary']['customer_id'],
            'amount' => $input['order_summary']['paid_amount'],
            'payment_method_id' => $input['order_summary']['payment_method_id'],
            'transaction_type' => self::CREDIT,
            'status' => self::STATUS_SUCCESS,
            'trx_id' => $input['order_summary']['trx_id'],
            'transactionable_id' => $auth->id,
            'transactionable_type' => SalesManager::class,
        ];
    }
}
