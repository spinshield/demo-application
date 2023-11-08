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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('usd')->default(0);
            $table->integer('fs_available')->default(1);
            $table->integer('fs_spins')->default(10);
            $table->integer('eur')->default(0);
            $table->integer('try')->default(0);
            $table->integer('cad')->default(0);
            $table->integer('gbp')->default(0);
            $table->string('selected_balance')->default('usd');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
