<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\QuestionController; 

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- WEBSERVICE PUBLIC ENDPOINT ---
// Bisa diakses via GET: http://127.0.0.1:8000/api/questions
Route::get('/questions', [QuestionController::class, 'index']);