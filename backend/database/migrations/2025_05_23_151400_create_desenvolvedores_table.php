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
        Schema::create('desenvolvedores', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->char('sexo');
            $table->date('data_nascimento');
            $table->string('hobby');
            $table->timestamps();

            $table->foreignId('nivel_id')
              ->constrained('niveis');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('desenvolvedores');
    }
};
