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
        Schema::create('survey__question__answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId("survey_question_id")->constrained("survey__questions")->onDelete("cascade");
            $table->foreignId("survey_answer_id")->constrained("survey__answers")->onDelete("cascade");
            $table->text("answer");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey__question__answers');
    }
};
