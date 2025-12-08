<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class GameController extends Controller
{
    public function index()
    {
        // Ambil 10 skor tertinggi HARI INI
        $leaderboard = Leaderboard::whereDate('created_at', Carbon::today())
                        ->orderBy('score', 'desc')
                        ->orderBy('created_at', 'asc') // Kalau skor sama, yg duluan main di atas
                        ->take(10)
                        ->get();

        return Inertia::render('GameQuiz', [
            'initialLeaderboard' => $leaderboard
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'nickname' => 'required|string|max:20',
            'score' => 'required|integer'
        ]);

        // Simpan ke database
        Leaderboard::create([
            'nickname' => $request->nickname,
            'score' => $request->score
        ]);

        // Redirect balik ke halaman game (otomatis refresh leaderboard)
        return to_route('game.index');
    }
}