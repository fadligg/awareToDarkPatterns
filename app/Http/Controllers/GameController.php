<?php

namespace App\Http\Controllers;


use App\Models\Score; // <-- Pastikan ini ada
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    // Halaman Game + Leaderboard
    public function index()
    {
        // 1. Ambil Leaderboard
        $leaderboard = Score::with('user')
                        ->orderBy('score', 'desc')
                        ->take(10)
                        ->get();

        // 2. AMBIL 10 SOAL ACAK & ACAK OPSINYA
        $rawQuestions = Question::inRandomOrder()->take(10)->get();

        // Kita modifikasi struktur datanya sebelum dikirim ke React
        $formattedQuestions = $rawQuestions->map(function ($q) {
            // Ambil teks jawaban benar DULU sebelum diacak (berdasarkan index di DB)
            // $q->options adalah array, $q->answer adalah index (0,1,2,3)
            $correctAnswerText = $q->options[$q->answer];

            // Acak urutan opsi menggunakan Collection Laravel
            $shuffledOptions = collect($q->options)->shuffle()->values()->all();

            return [
                'id' => $q->id,
                'question' => $q->question,
                'options' => $shuffledOptions, // Opsi yang sudah acak
                'correct_answer' => $correctAnswerText, // KUNCI JAWABAN (String)
            ];
        });

        return Inertia::render('GameQuiz', [
            'leaderboard' => $leaderboard,
            'questions'   => $formattedQuestions 
        ]);
    }

    // Simpan Skor Baru
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'score' => 'required|integer',
        ]);

        // Simpan ke database
        Score::create([
            'user_id' => auth()->id(), // Ambil ID user yg login otomatis
            'score' => $request->score,
        ]);

        // Redirect balik ke game (skor otomatis ke-refresh)
        return redirect()->back();
    }
}