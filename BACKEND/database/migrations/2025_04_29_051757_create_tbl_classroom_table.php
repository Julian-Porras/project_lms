<?php

use App\Enums\StatusEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_classroom', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('course_id')->constrained('tbl_course')->onDelete('cascade');
            $table->string('classroom_name');
            $table->string('classroom_code')->unique();
            $table->integer('year_level')->nullable();
            $table->enum('status', [StatusEnum::ACTIVE->value, StatusEnum::NOTACTIVE->value])->default('active');
            $table->string('background')->nullable();
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
