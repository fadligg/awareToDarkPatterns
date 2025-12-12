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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // Menyimpan jenis dark pattern (buat info aja)
            $table->text('question'); // Teks soal
            $table->json('options'); // Pilihan A, B, C, D (disimpan sebagai JSON Array)
            $table->integer('answer'); // Index jawaban benar (0, 1, 2, atau 3)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
