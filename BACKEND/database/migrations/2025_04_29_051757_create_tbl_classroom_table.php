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
        Schema::create('tbl_classroom', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('tbl_course')->onDelete('cascade');
            $table->string('classroom_name');
            $table->string('classroom_code')->unique();
            $table->integer('year_level');
            $table->enum('status', ['active', 'not_active'])->default('active');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_classroom');
    }
};
