<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use Inertia\Inertia;
use App\Models\DarkPattern;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/game', [GameController::class, 'index'])->name('game.index');
Route::post('/game/score', [GameController::class, 'store'])->name('game.store');

// --- TAMBAHAN ROUTE DISINI ---
Route::get('/developer-mode', function () {
    // Pastikan nama file di resources/js/Pages adalah DeveloperMode.jsx
    return Inertia::render('DeveloperMode'); 
})->name('developer.mode');
// -----------------------------

// --- TAMBAHAN ROUTE BARU ---
Route::get('/types', function () {
    return Inertia::render('DarkPatternTypes');
})->name('dark.types');

Route::get('/user-mode', function () {
    return Inertia::render('UserMode');
})->name('user.mode');

Route::get('/types/{id}', function ($id) {
    // Ambil data dasar (Title & Description) dari database yang sudah ada
    $pattern = DarkPattern::findOrFail($id);
    
    return Inertia::render('DarkPatternDetail', [
        'pattern' => $pattern
    ]);
})->name('types.detail');

// Route untuk List User
Route::get('/types-user', function () {
    return Inertia::render('DarkPatternTypesUser');
})->name('user.types.list');

require __DIR__.'/auth.php';