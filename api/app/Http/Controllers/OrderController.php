<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderDetailsResource;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderListResource;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orders = (new Order())->getAllOrders($request->all(), auth());
        return OrderListResource::collection($orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        try {
            DB::beginTransaction();
            $order = (new Order)->placeOrder($request->all(), auth()->user());
            DB::commit();
            return response()->json([
                'msg' => 'Order placed successfully',
                'cls' => 'success',
                'flag' => 1,
                'order_id' => $order->id
            ]);
        } catch (\Throwable $e) {
            info('ORDER_PLACED_FAILED', ['message' => $e->getMessage(), $e]);
            DB::rollback();
            return response()->json([
                'msg' => $e->getMessage(),
                'cls' => 'warning',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(
            [
                'customer',
                'payment_method',
                'sales_manager:id,name',
                'shop',
                'order_details',
                'transactions',
                'transactions.customer',
                'transactions.payment_method',
                'transactions.transactionable'
            ]
        );
        return new OrderDetailsResource($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
