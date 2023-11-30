<?php

namespace App\Manager;

use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class ReportManager
{
    public const LOW_STOCK_ALERT = 5;
    public int $total_product = 0;
    public int $total_stock = 0;
    public int $low_stock = 0;
    public int $buy_stock_price = 0;
    public int $sale_stock_price = 0;
    public int $potential_profit = 0;

    public int $total_sale = 0;
    public int $total_sale_today = 0;
    public int $total_purchase = 0;
    public int $total_purchase_today = 0;

    private bool $is_admin = false;
    private int $sales_admin_id;
    private Collection  $products;
    private Collection  $orders;

    function __construct($auth)
    {
        if ($auth->guard('admin')->check()) {
            $this->is_admin = true;
        }
        $this->sales_admin_id = $auth->user()->id;
        $this->getProducts();
        $this->getOrders();
        $this->setTotalProduct();
        $this->calculateStock();
        $this->findLowStock();
        $this->calculateBuyingStockPrice();
        $this->calculateSaleStockPrice();
        $this->calculatePotentialProfit();
        $this->calculateTotalSale();
        $this->calculateTotalSaleToday();
        $this->calculateTotalPurchase();
        $this->calculatePurchaseToday();
    }

    private function getProducts()
    {
        $this->products = (new Product)->getAllProduct();
    }

    private function setTotalProduct()
    {
        $this->total_product = count($this->products);
    }

    private function calculateStock()
    {
        $this->total_stock = $this->products->sum('stock');
    }

    private function findLowStock()
    {
        $this->low_stock = $this->products->where('stock', '<=', self::LOW_STOCK_ALERT)->count();
    }

    private function calculateBuyingStockPrice()
    {
        foreach ($this->products as $product) {
            $this->buy_stock_price += ($product->cost * $product->stock);
        }
    }
    private function calculateSaleStockPrice()
    {
        foreach ($this->products as $product) {
            $this->sale_stock_price += ($product->price * $product->stock);
        }
    }
    private function calculateTotalPurchase()
    {
        $this->total_purchase = $this->buy_stock_price;
    }
    private function calculatePurchaseToday()
    {
        $product_buy_today = $this->products->whereBetween(
            'created_at',
            [Carbon::today()->startOfDay(), Carbon::today()->endOfDay()]
        );
        foreach ($product_buy_today as $product) {
            $this->total_purchase_today += ($product->cost * $product->stock);
        }
    }
    private function calculatePotentialProfit()
    {
        $this->potential_profit = $this->sale_stock_price - $this->buy_stock_price;
    }

    private function getOrders()
    {
        $this->orders = (new Order())->getAllOrdersForReport($this->is_admin, $this->sales_admin_id);
    }

    private function calculateTotalSale()
    {
        $this->total_sale = $this->orders->sum('total');
    }
    private function calculateTotalSaleToday()
    {
        $this->total_sale_today = $this->orders
            ->whereBetween(
                'created_at',
                [Carbon::today()->startOfDay(), Carbon::today()->endOfDay()]
            )->sum('total');
    }
}
