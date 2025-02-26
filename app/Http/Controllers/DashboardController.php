<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyDashboardResource;
use App\Models\Survey;
use App\Models\Survey_Answer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // 0 references | 0 override
    public function index(Request $request)
    {
        $user = $request->user();

        $total_surveys = Survey::query()->where('user_id', $user->id)->count();
        $latest_surveys = Survey::query()->where('user_id', $user->id)->latest('created_at')
            ->first();

        $total_answers = Survey_Answer::query()
            ->join('surveys', 'survey__answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)->count();
        $latest_answers = Survey_Answer::query()
            ->join('surveys', 'survey__answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('survey__answers.*');

        return [
            'totalSurveys' => $total_surveys,
            'latestSurveys' => $latest_surveys ? new SurveyDashboardResource($latest_surveys) : null,
            'totalAnswers' => $total_answers,
            'latestAnswers' => SurveyAnswerResource::collection($latest_answers)
        ];
    }
}
