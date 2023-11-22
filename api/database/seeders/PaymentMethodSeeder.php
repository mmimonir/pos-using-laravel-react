<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payment_methods = [
            [
                'name' => 'Cash',
                'status' => 1,
                'account_number' => ''
            ],
            [
                'name' => 'Bank',
                'status' => 1,
                'account_number' => '123456789'
            ],
            [
                'name' => 'Bkash',
                'status' => 1,
                'account_number' => '123456789'
            ],
            [
                'name' => 'Rocket',
                'status' => 1,
                'account_number' => '123456789'
            ],
            [
                'name' => 'Nagad',
                'status' => 1,
                'account_number' => '123456789'
            ],
            [
                'name' => 'Card',
                'status' => 1,
                'account_number' => '123456789'
            ],
        ];
        PaymentMethod::insert($payment_methods);
    }
}
