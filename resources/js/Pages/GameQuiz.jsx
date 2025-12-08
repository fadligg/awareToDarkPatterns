import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function GameQuiz({ initialLeaderboard }) {
    // --- STATE GAME ---
    const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
    const [nickname, setNickname] = useState('');
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // --- DATA SOAL ---
    const questions = [
        {
            q: "Diskon palsu yang hitung mundur terus menerus disebut?",
            opts: ["False Urgency", "Roach Motel", "Misdirection"],
            a: "False Urgency"
        },
        {
            q: "Susah banget cari tombol 'Unsubscribe', ini pola apa?",
            opts: ["Roach Motel", "Privacy Zuckering", "Confirmshaming"],
            a: "Roach Motel"
        },
        {
            q: "Tiba-tiba ada asuransi masuk keranjang belanja tanpa izin?",
            opts: ["Sneak into Basket", "Hidden Costs", "Nagging"],
            a: "Sneak into Basket"
        },
        {
            q: "Website mempermalukanmu saat menolak tawaran ('No, I hate saving money').",
            opts: ["Confirmshaming", "Disguised Ads", "Bait and Switch"],
            a: "Confirmshaming"
        },
        {
            q: "Tombol iklan didesain mirip tombol download asli.",
            opts: ["Disguised Ads", "Misdirection", "Forced Action"],
            a: "Disguised Ads"
        }
    ];

    // --- LOGIC ---
    const startGame = () => {
        if (!nickname.trim()) {
            // Ganti alert() dengan Swal.fire()
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Isi nickname dulu dong biar bisa masuk leaderboard! 🏆',
                confirmButtonText: 'Siap!',
                confirmButtonColor: '#FACC15', // Warna Yellow-400
                background: '#fff',
                color: '#333'
            });
            return;
        }
        setScore(0);
        setCurrentQuestion(0);
        setGameState('playing');
    };

    const handleAnswer = (selectedOption) => {
        if (selectedOption === questions[currentQuestion].a) {
            setScore(score + 20);
        }

        const next = currentQuestion + 1;
        if (next < questions.length) {
            setCurrentQuestion(next);
        } else {
            finishGame(score + (selectedOption === questions[currentQuestion].a ? 20 : 0));
        }
    };

    const finishGame = (finalScore) => {
        setScore(finalScore);
        setGameState('finished');
        
        // Kirim ke Database via Inertia
        router.post('/game/score', {
            nickname: nickname,
            score: finalScore
        }, {
            onSuccess: () => {
                // Balik ke menu awal setelah simpan (3 detik)
                setTimeout(() => setGameState('start'), 3000);
            }
        });
    };

    return (
        // PERBAIKAN DISINI: Menambahkan 'overflow-y-auto' dan 'pb-40' agar bisa discroll sampai bawah
        <div className="min-h-screen bg-white text-gray-800 font-sans overflow-y-auto pb-40">
            <Head title="Game Dark Pattern" />

            {/* --- NAVBAR SIMPEL (Dibuat Sticky biar tetep nempel diatas pas discroll) --- */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur flex items-center p-6 mb-4 border-b border-gray-100 shadow-sm">
                
                {/* Tombol Kembali (Lingkaran Kuning) */}
                <Link href="/">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full mr-4 flex items-center justify-center hover:bg-yellow-500 hover:scale-110 transition-all cursor-pointer shadow-sm">
                        {/* Masukkan gambar panah disini */}
                        <img 
                            src="/img/arrow-left.png" 
                            alt="Back" 
                            className="w-4 h-4 object-contain" 
                            // Fallback kalau gambar belum ada, pakai teks "<"
                            onError={(e) => {e.target.style.display='none'; e.target.parentNode.innerText='<'}}
                        />
                    </div>
                </Link>

                <h1 className="text-2xl font-bold">Game</h1>
            </div>

            <div className="max-w-6xl mx-auto px-6">
                
                {/* --- AREA UTAMA (HERO) --- */}
                
                {gameState === 'start' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 pt-8">
                        {/* KIRI: Gambar Ilustrasi */}
                        <div className="flex justify-center">
                            <img 
                                src="/img/gameQuiz.png" 
                                alt="Game Illustration" 
                                // PERBAIKAN: Dikasih max-height biar gambarnya gak kegedean menuhin layar
                                className="w-full max-w-md object-contain max-h-[400px]"
                                onError={(e) => e.target.src = 'https://placehold.co/500x500/png?text=Illustration'} 
                            />
                        </div>

                        {/* KANAN: Form Input */}
                        <div>
                            <label className="block text-4xl font-bold italic mb-4 font-serif">Nickname</label>
                            <input 
                                type="text" 
                                placeholder="Nama Anda" 
                                className="w-full border border-gray-300 rounded-lg px-6 py-4 text-xl mb-6 focus:outline-none focus:border-yellow-500 bg-gray-50 shadow-inner"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                            <button 
                                onClick={startGame}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-xl font-bold py-4 rounded-lg shadow-lg transition transform hover:scale-105 active:scale-95"
                            >
                                Play Quiz
                            </button>
                        </div>
                    </div>
                )}

                {/* --- GAMEPLAY AREA --- */}
                {gameState === 'playing' && (
                    <div className="max-w-2xl mx-auto text-center py-20 min-h-[50vh]">
                        <div className="mb-8">
                            <span className="text-yellow-500 font-bold tracking-widest text-sm uppercase">Pertanyaan {currentQuestion + 1} dari {questions.length}</span>
                            <h2 className="text-3xl font-bold mt-4 mb-8 leading-relaxed">{questions[currentQuestion].q}</h2>
                        </div>
                        <div className="grid gap-4">
                            {questions[currentQuestion].opts.map((opt, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => handleAnswer(opt)}
                                    className="p-5 rounded-xl border-2 border-gray-100 hover:border-yellow-400 hover:bg-yellow-50 text-left font-bold text-lg transition duration-200 shadow-sm"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- RESULT AREA --- */}
                {gameState === 'finished' && (
                    <div className="text-center py-20 min-h-[50vh]">
                        <h2 className="text-4xl font-bold mb-4">Game Selesai! 🎉</h2>
                        <p className="text-xl text-gray-600 mb-8">Skor kamu sedang disimpan ke database...</p>
                        <div className="inline-block bg-gray-900 rounded-2xl p-10 shadow-2xl">
                             <div className="text-8xl font-black text-yellow-500">{score}</div>
                             <div className="text-white mt-2">Poin Akhir</div>
                        </div>
                    </div>
                )}

                {/* --- LEADERBOARD HARIAN --- */}
                {gameState === 'start' && (
                    <div className="mt-12 border-t-2 border-gray-100 pt-12">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-bold flex items-center">
                                🏆 Leaderboard Harian
                            </h3>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">Top 10 Hari Ini</span>
                        </div>
                        
                        <div className="overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-200">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-5 font-extrabold text-gray-400 uppercase text-xs tracking-wider">Rank</th>
                                        <th className="px-6 py-5 font-extrabold text-gray-400 uppercase text-xs tracking-wider">Nickname</th>
                                        <th className="px-6 py-5 font-extrabold text-gray-400 uppercase text-xs tracking-wider text-right">Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {initialLeaderboard.length > 0 ? (
                                        initialLeaderboard.map((player, index) => (
                                            <tr key={player.id} className="hover:bg-yellow-50 transition duration-150">
                                                <td className="px-6 py-5 font-medium text-gray-500">
                                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                                                </td>
                                                <td className="px-6 py-5 font-bold text-gray-800 text-lg">{player.nickname}</td>
                                                <td className="px-6 py-5 font-bold text-yellow-600 text-right text-lg">{player.score}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-12 text-center text-gray-400 italic bg-gray-50">
                                                Belum ada yang main hari ini.<br/>
                                                <span className="text-sm font-normal">Ayo jadilah yang pertama mengisi leaderboard! 🚀</span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
}