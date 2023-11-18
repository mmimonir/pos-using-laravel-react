<?php

namespace App\Manager;

use Carbon\Carbon;

class PriceManager
{
    public const CURRENCY_SYMBOL = '৳';
    public const CURRENCY_NAME = 'BDT';

    public static function calculate_sell_price(
        $price,
        $discount_percent,
        $discount_fixed,
        $discount_start = '',
        $discount_end = ''
    ) {
        $discount = 0;

        if (!empty($discount_start) && !empty($discount_end)) {
            if (Carbon::now()->isBetween(Carbon::create($discount_start), Carbon::create($discount_end))) {
                return self::calculate_price(
                    $price,
                    $discount_percent,
                    $discount_fixed
                );
            }
        }
        return [
            'price' => $price,
            'discount' => $discount,
            'symbol' => self::CURRENCY_SYMBOL
        ];
    }

    private static function calculate_price(
        $price,
        $discount_percent,
        $discount_fixed,
    ) {
        $discount = 0;
        if (!empty($discount_percent)) {
            $discount = ($price * $discount_percent) / 100;
        }
        if (!empty($discount_fixed)) {
            $discount += $discount_fixed;
        }
        return [
            'price' => $price - $discount,
            'discount' => $discount,
            'symbol' => self::CURRENCY_SYMBOL
        ];
    }
}
