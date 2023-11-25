<?php

namespace App\Http\Resources;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $payment_status = 'Unpaid';
        if ($this->payment_status == Order::PAYMENT_STATUS_PAID) {
            $payment_status = 'Paid';
        } elseif ($this->payment_status == Order::PAYMENT_STATUS_PARTIAL_PAID) {
            $payment_status = 'Partial Paid';
        }

        return [
            'id' => $this->id,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not Updated Yet',
            'customer' => new CustomerDetailsResource($this->customer),
            'customer_phone' => $this->customer?->phone,
            'order_number' => $this->order_number,
            'order_status' => $this->order_status,
            'order_status_string' => $this->order_status == Order::STATUS_COMPLETED ? 'Completed' : 'Pending',
            'payment_status' => $this->payment_status == Order::PAYMENT_STATUS_PAID ? 'Paid' : 'Unpaid',
            'payment_method' => new PaymentMethodDetailsResource($this->payment_method),
            'sales_manager' => new SalesManagerListResource($this->sales_manager),
            'shop' => new ShopListResource($this->shop),
            'discount' => $this->discount,
            'paid_amount' => $this->paid_amount,
            'due_amount' => $this->due_amount,
            'quantity' => $this->quantity,
            'sub_total' => $this->sub_total,
            'total' => $this->total,
            'order_details' => OrderDetailsListResource::collection($this->order_details),
        ];
    }
}
