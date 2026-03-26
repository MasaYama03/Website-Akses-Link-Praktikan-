<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('praktikan_links', function (Blueprint $table) {
            $table->string('sub_group')->nullable()->after('sort_order');
        });
    }

    public function down(): void
    {
        Schema::table('praktikan_links', function (Blueprint $table) {
            $table->dropColumn('sub_group');
        });
    }
};
