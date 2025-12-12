// resources/js/Pages/GameQuiz.jsx

import React, { useState } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';

export default function GameQuiz({ leaderboard, questions }) { 
    const { auth } = usePage().props;

    // --- PENGAMAN 1: CEK LOGIN (Mencegah White Screen Error) ---
    // Jika user belum login, tampilkan pesan suruh login
    if (!auth.user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 font-sans p-6 text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h1 className="text-3xl font-bold mb-2">Akses Dibatasi</h1>
                <p className="text-gray-600 mb-6">
                    Kamu harus Login terlebih dahulu untuk bermain dan menyimpan skor.
                </p>
                <div className="flex gap-4">
                    <Link href="/login" className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-500 transition shadow-md">
                        Login Sekarang
                    </Link>
                    <Link href="/register" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-md">
                        Daftar Akun
                    </Link>
                </div>
                <div className="mt-8">
                    <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm font-bold">Kembali ke Home</Link>
                </div>
            </div>
        );
    }

    // Kalau sudah lolos cek di atas, aman untuk ambil nama
    const playerName = auth.user.name;

    // --- PENGAMAN 2: CEK DATA SOAL ---
    // Jika database soal masih kosong
    if (!questions || questions.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 font-sans p-6 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="text-3xl font-bold mb-2">Soal Tidak Ditemukan</h1>
                <p className="text-gray-600 mb-6">
                    Database soal belum diisi. Silakan jalankan perintah ini di terminal:
                </p>
                <code className="bg-gray-100 p-3 rounded-lg font-mono text-sm block mb-6 border border-gray-300 shadow-sm">
                    php artisan db:seed --class=QuestionSeeder
                </code>
                <Link href="/" className="text-yellow-600 font-bold hover:underline">Kembali ke Home</Link>
            </div>
        );
    }

    // --- STATE GAME ---
    const [gameState, setGameState] = useState('start'); 
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    // --- LOGIKA GAME ---
    const handleStartGame = () => {
        setGameState('playing');
        setScore(0);
        setCurrentQuestion(0);
    };

    const handleAnswer = (selectedOptionText) => {
        const currentQ = questions[currentQuestion];
        let newScore = score;

        // Cek Jawaban (Bandingkan Teks Pilihan vs Kunci Jawaban dari DB)
        if (selectedOptionText === currentQ.correct_answer) {
            newScore = score + 10; 
            setScore(newScore);    
        }

        const nextQuestion = currentQuestion + 1;
        
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            finishGame(newScore);
        }
    };

    const finishGame = (finalScore) => {
        setGameState('finished');
        
        router.post('/game/score', {
            score: finalScore, 
        }, {
            preserveScroll: true,
        });
    };

    const handleRestart = () => {
        window.location.reload(); // Refresh halaman untuk dapat soal acak baru
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col items-center justify-center p-6">
            <Head title="Game Quiz" />

            {/* --- LAYAR AWAL (START + LEADERBOARD) --- */}
            {gameState === 'start' && (
                // LAYOUT: 1 Kolom di HP/Tablet, 2 Kolom di Laptop (lg)
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-fade-in-down">
                    
                    {/* Kolom Kiri: Intro Game */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-1 lg:order-1">
                        <img 
                            src="/img/gameQuiz.png" 
                            alt="Quiz" 
                            className="w-64 mb-6 object-contain mx-auto lg:mx-0" 
                            onError={(e) => e.target.src='https://placehold.co/300'} 
                        />
                        
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">Dark Pattern Quiz</h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                            Halo, <span className="font-bold text-yellow-500">{playerName}</span>! <br/>
                            Ayo buktikan seberapa jago kamu mengenali trik licik desain.
                        </p>

                        <button 
                            onClick={handleStartGame}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-12 rounded-full shadow-lg transition transform hover:scale-105 text-lg"
                        >
                            MULAI MAIN
                        </button>
                        
                        <div className="mt-6">
                             <Link href="/" className="text-gray-400 hover:text-gray-600 font-bold text-sm">Kembali ke Home</Link>
                        </div>
                    </div>

                    {/* Kolom Kanan: LEADERBOARD */}
                    <div className="order-2 lg:order-2 w-full max-w-lg mx-auto lg:mx-0 bg-white border-2 border-gray-100 rounded-2xl shadow-xl overflow-hidden h-fit">
                        <div className="bg-black text-white p-4 text-center">
                            <h2 className="text-xl font-bold uppercase tracking-widest">🏆 Top Players</h2>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase">Rank</th>
                                        <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase">Player</th>
                                        <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase text-right">Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {leaderboard && leaderboard.length > 0 ? (
                                        leaderboard.map((item, index) => (
                                            <tr key={index} className={index < 3 ? "bg-yellow-50" : ""}>
                                                <td className="px-5 py-3 font-bold text-gray-700">
                                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                                                </td>
                                                <td className="px-5 py-3 font-medium text-gray-900 truncate max-w-[120px]">
                                                    {item.user ? item.user.name : 'Unknown'}
                                                </td>
                                                <td className="px-5 py-3 font-bold text-yellow-600 text-right">
                                                    {item.score}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-5 py-8 text-center text-gray-400 italic">
                                                Belum ada skor. Jadilah yang pertama!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* --- LAYAR MAIN (PLAYING) --- */}
            {gameState === 'playing' && questions[currentQuestion] && (
                <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="bg-yellow-400 p-6 flex justify-between items-center">
                        <span className="font-bold text-lg">Soal {currentQuestion + 1}/{questions.length}</span>
                        <span className="font-bold text-lg bg-white px-4 py-1 rounded-full">Score: {score}</span>
                    </div>

                    <div className="p-8">
                        {/* Pertanyaan */}
                        <h2 className="text-2xl font-bold mb-8 text-center leading-relaxed">
                            {questions[currentQuestion].question}
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {/* Opsi Jawaban */}
                            {questions[currentQuestion].options && questions[currentQuestion].options.map((optionText, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(optionText)}
                                    className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-yellow-400 hover:bg-yellow-50 transition font-medium text-lg"
                                >
                                    {optionText}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* --- LAYAR SELESAI (FINISHED) --- */}
            {gameState === 'finished' && (
                <div className="text-center max-w-lg animate-fade-in-down">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-4xl font-bold mb-2">Permainan Selesai!</h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Hebat, <span className="font-bold">{playerName}</span>!
                    </p>

                    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-8 mb-8">
                        <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">Skor Akhir Kamu</p>
                        <p className="text-6xl font-black text-yellow-500">{score}</p>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button 
                            onClick={handleRestart}
                            className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition"
                        >
                            Main Lagi
                        </button>
                        <a 
                            href="/game" 
                            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-bold hover:bg-gray-300 transition"
                        >
                            Lihat Leaderboard
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}