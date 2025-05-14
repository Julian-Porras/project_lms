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
        Schema::create('tbl_module_item', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')->constrained('tbl_module')->onDelete('cascade');
            $table->unsignedBigInteger('classroom_id')->nullable();
            $table->unsignedBigInteger('course_id')->nullable();
            $table->foreign('classroom_id')->references('id')->on('tbl_classroom')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('tbl_course')->onDelete('cascade');
            $table->string('item_name');
            $table->string('item_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_module_item');
    }
};
