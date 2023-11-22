<?php

namespace App\Manager;

use App\Models\Product;
use Carbon\Carbon;

class OrderManager
{
    private const ORDER_PREFIX = 'FBD';

    public static function generateOrderNumber($shop_id)
    {
        return self::ORDER_PREFIX . $shop_id . Carbon::now()->format('dmy') . random_int(100, 999);
    }

    public static function calculate_order_prices($input)
    {
        $sub_total = 0;
        $discount = 0;
        $total = 0;
        $quantity = 0;

        if (isset($input['carts'])) {
            foreach ($input['carts'] as $key => $cart) {
                $product =  (new Product())->getProductById($key);
                if ($product) {
                    $price = PriceManager::calculate_sell_price(
                        $product->price,
                        $product->discount_percent,
                        $product->discount_fixed,
                        $product->discount_start,
                        $product->discount_end
                    );
                    $discount += $price['discount'] * $cart['quantity'];
                    $quantity += $cart['quantity'];
                    $sub_total += $product->price * $cart['quantity'];
                    $total += $price['price'] * $cart['quantity'];
                }
            }
        }

        return [
            'sub_total' => $sub_total,
            'discount' => $discount,
            'total' => $total,
            'quantity' => $quantity,
        ];
    }

    public static function decidePaymentStatus($amount, $paid_amount)
    {
        $payment_status = 3;
        if ($amount <= $paid_amount) {
            $payment_status = 1;
        } elseif ($amount <= 0) {
            $payment_status = 3;
        } else {
            $payment_status = 2;
        }
        return $payment_status;
    }
}
