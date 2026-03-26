<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('praktikan_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('praktikan_categories')->onDelete('cascade');
            $table->string('title');
            $table->text('url');
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('praktikan_links');
    }
};
