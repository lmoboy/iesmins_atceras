<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('typing_leaderboards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('mode', ['easy', 'medium', 'hard', 'extreme']);
            $table->float('score');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('typing_leaderboards');
    }
};
