<?php

namespace App\Http\Controllers;

use App\Manager\PriceManager;
use App\Manager\ReportManager;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $reportManager = new ReportManager(auth());

        $report = [
            'total_product' => $reportManager->total_product,
            'total_stock' => $reportManager->total_stock,
            'low_stock' => $reportManager->low_stock,
            'buy_value' => PriceManager::priceFormat($reportManager->buy_stock_price),
            'sale_value' => PriceManager::priceFormat($reportManager->sale_stock_price),
            'potential_profit' => PriceManager::priceFormat($reportManager->potential_profit),

            'total_sale' => PriceManager::priceFormat($reportManager->total_sale),
            'total_sale_today' => PriceManager::priceFormat($reportManager->total_sale_today),
            'total_purchase' => PriceManager::priceFormat($reportManager->total_purchase),
            'total_purchase_today' => PriceManager::priceFormat($reportManager->total_purchase_today),

        ];
        return response()->json($report);
    }
}
