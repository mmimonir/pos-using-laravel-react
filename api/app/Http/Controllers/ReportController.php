<?php

namespace App\Http\Controllers;

use App\Manager\PriceManager;
use App\Manager\ReportManager;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $reportManager = new ReportManager();

        $report = [
            'total_product' => $reportManager->total_product,
            'total_stock' => $reportManager->total_stock,
            'low_stock' => $reportManager->low_stock,
            'buy_value' => PriceManager::priceFormat($reportManager->buy_stock_price),
            'sale_value' => PriceManager::priceFormat($reportManager->sale_stock_price),
            'potential_profit' => PriceManager::priceFormat($reportManager->potential_profit),
        ];
        return response()->json($report);
    }
}
