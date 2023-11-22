<?php

namespace App\Models;

use App\Manager\OrderManager;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public const STATUS_PENDING = 1;
    public const STATUS_PROCESSING = 2;
    public const STATUS_COMPLETED = 3;
    public const SHIPMENT_STATUS_COMPLETED = 1;

    public function placeOrder($input, $auth)
    {
        return $order_data = $this->prepareData($input, $auth);
    }

    private function prepareData($input, $auth)
    {
        // return $auth->shop_id;
        $price = OrderManager::calculate_order_prices($input);

        return [
            'customer_id' => $input['order_summary']['customer_id'],
            'sales_manager_id' => $auth->id,
            'shop_id' => $auth->shop_id,
            'sub_total' => $price['sub_total'],
            'discount' => $price['discount'],
            'total' => $price['total'],
            'quantity' => $price['quantity'],
            'paid_amount' => $input['order_summary']['paid_amount'],
            'due_amount' => $input['order_summary']['due_amount'],
            'order_status' => self::STATUS_COMPLETED,
            'order_number' => OrderManager::generateOrderNumber($auth->shop_id),
            'payment_method_id' => $input['order_summary']['payment_method_id'],
            'payment_status' => OrderManager::decidePaymentStatus($price['total'], $input['order_summary']['paid_amount']),
            'shipment_status' => self::SHIPMENT_STATUS_COMPLETED,
        ];
    }
}
