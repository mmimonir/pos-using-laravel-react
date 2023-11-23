<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('trx_id')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->foreignId('payment_method_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->unsignedBigInteger('order_id')->nullable();
            $table->morphs('transactionable');
            $table->tinyInteger('transaction_type')->comment('1=credit, 2=debit');
            $table->tinyInteger('status')->comment('1=success, 2=failed');
            $table->integer('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
