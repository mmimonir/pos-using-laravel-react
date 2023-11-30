<?php

namespace App\Utility;

use Carbon\Carbon;

class Date
{
    public static function calculate_discount_remaining_days(string|null $discount_end): int
    {
        $discount_remaining_days = 0;
        if ($discount_end != null) {
            $discount_remaining_days = Carbon::now()->diffInDays(Carbon::create($discount_end));
        }
        return $discount_remaining_days;
    }
}
