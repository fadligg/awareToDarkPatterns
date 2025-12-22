<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        // 1. Ambil semua data soal dari database
        // Kita bisa menyembunyikan kolom 'created_at' dkk jika mau, tapi ini opsional
        $questions = Question::all();

        // 2. Cek apakah data kosong
        if ($questions->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data soal belum tersedia.',
                'data' => []
            ], 404);
        }

        // 3. Kembalikan response JSON (Standar Webservice)
        return response()->json([
            'status' => 'success',
            'message' => 'List data soal kuis berhasil diambil.',
            'total_soal' => $questions->count(),
            'data' => $questions
        ], 200);
    }
}