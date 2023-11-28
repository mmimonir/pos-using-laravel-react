<?php

namespace App\Models;

use App\Manager\OrderManager;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    public const STATUS_PENDING = 1;
    public const STATUS_PROCESSING = 2;
    public const STATUS_COMPLETED = 3;
    public const SHIPMENT_STATUS_COMPLETED = 1;

    public const PAYMENT_STATUS_PAID = 1;
    public const PAYMENT_STATUS_PARTIAL_PAID = 2;
    public const PAYMENT_STATUS_UNPAID = 3;

    public function getAllOrders($input, $auth)
    {
        $is_admin = $auth->guard('admin')->check();

        $query = self::query();
        $query->with([
            'customer:id,name,phone',
            'payment_method:id,name',
            'sales_manager:id,name',
            'shop:id,name'
        ]);

        if (!$is_admin) $query->where('shop_id', $auth->user()->shop_id);

        return $query->paginate(10);
    }

    public function placeOrder($input, $auth)
    {
        $order_data = $this->prepareData($input, $auth);

        if (isset($order_data['error_description'])) return $order_data;

        $order = self::query()->create($order_data['order_data']);
        (new OrderDetails())->storeOrderDetails($order_data['order_details'], $order);
        (new Transaction())->storeTransaction($input, $order, $auth);
        return $order;
    }

    private function prepareData($input, $auth)
    {
        // return $auth->shop_id;
        $price = OrderManager::handle_order_data($input);
        if (isset($price['error_description'])) return $price;

        $order_data = [
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
        return ['order_data' => $order_data, 'order_details' => $price['order_details']];
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function sales_manager()
    {
        return $this->belongsTo(SalesManager::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function order_details()
    {
        return $this->hasMany(OrderDetails::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function getAllOrdersForReport(bool $is_admin, int $sales_admin_id, array $columns = ['*'])
    {
        $query = DB::table('orders')->select($columns);
        if (!$is_admin) {
            $query->where('sales_manager_id', $sales_admin_id);
        }
        $orders = $query->get();
        return collect($orders);
    }
}
