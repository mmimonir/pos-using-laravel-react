<?php

namespace App\Http\Resources;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'customer_name' => $this->customer?->name,
            'customer_phone' => $this->customer?->phone,
            'payment_method_name' => $this->payment_method?->name,
            'account_number' => $this->payment_method?->account_number,
            'status' => $this->status == Transaction::STATUS_SUCCESS ? 'Success' : 'Failed',
            'transaction_type' => $this->transaction_type == Transaction::CREDIT ? 'Credit' : 'Debit',
            'trx_id' => $this->trx_id,
            'transaction_by' => $this->transactionable?->name,
        ];
    }
}
