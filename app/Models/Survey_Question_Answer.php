<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey_Question_Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_question_id',
        'survey_answer_id',
        'answer',
    ];
}
