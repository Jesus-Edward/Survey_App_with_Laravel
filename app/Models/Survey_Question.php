<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey_Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'description',
        'type',
        'question',
        'data',
        'survey_id'
    ];
}
