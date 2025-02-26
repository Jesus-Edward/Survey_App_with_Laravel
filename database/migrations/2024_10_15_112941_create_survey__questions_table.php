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
        Schema::create('survey__questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId("survey_id")->constrained("surveys")->onDelete("cascade");
            $table->string("type", 45);
            $table->text("question", 2000);
            $table->longText("description")->nullable();
            $table->longText("data")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey__questions');
    }
};
