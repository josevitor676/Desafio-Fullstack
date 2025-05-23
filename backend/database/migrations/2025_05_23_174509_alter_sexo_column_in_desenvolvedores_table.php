<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterSexoColumnInDesenvolvedoresTable extends Migration
{
    public function up(): void
    {
        Schema::table('desenvolvedores', function (Blueprint $table) {
            $table->char('sexo', 1)->change();
        });
    }

    public function down(): void
    {
        Schema::table('desenvolvedores', function (Blueprint $table) {
            $table->char('sexo', 255)->change();
        });
    }
}
