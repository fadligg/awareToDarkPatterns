<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon; // Pastikan ada ini

class GameController extends Controller
{
    public function index()
    {
        // 1. Ambil Leaderboard HARIAN (Hari ini saja)
        $dailyLeaderboard = Score::with('user')
                        ->whereDate('created_at', Carbon::today())
                        ->orderBy('score', 'desc')
                        ->take(10)
                        ->get();

        // 2. Ambil Leaderboard BULANAN (Bulan & Tahun ini)
        $monthlyLeaderboard = Score::with('user')
                        ->whereMonth('created_at', Carbon::now()->month)
                        ->whereYear('created_at', Carbon::now()->year)
                        ->orderBy('score', 'desc')
                        ->take(10)
                        ->get();

        // 3. Ambil Soal (Sama seperti sebelumnya)
        $rawQuestions = Question::inRandomOrder()->take(10)->get();

        $formattedQuestions = $rawQuestions->map(function ($q) {
            $correctAnswerText = $q->options[$q->answer];
            $shuffledOptions = collect($q->options)->shuffle()->values()->all();

            return [
                'id' => $q->id,
                'question' => $q->question,
                'options' => $shuffledOptions,
                'correct_answer' => $correctAnswerText,
            ];
        });

        // 4. Kirim KEDUA leaderboard ke Frontend
        return Inertia::render('GameQuiz', [
            'dailyLeaderboard'   => $dailyLeaderboard,   // Data Harian
            'monthlyLeaderboard' => $monthlyLeaderboard, // Data Bulanan
            'questions'          => $formattedQuestions 
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'score' => 'required|integer',
        ]);

        Score::create([
            'user_id' => auth()->id(),
            'score' => $request->score,
        ]);

        return redirect()->back();
    }
}