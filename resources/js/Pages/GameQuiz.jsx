// resources/js/Pages/GameQuiz.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';

// Update Props: Terima 'dailyLeaderboard' dan 'monthlyLeaderboard'
export default function GameQuiz({ dailyLeaderboard, monthlyLeaderboard, questions }) { 
    const { auth } = usePage().props;

    // --- STATE NAVBAR ---
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const isAutoScrolling = useRef(false);

    // --- LOGIKA SCROLL NAVBAR ---
    const controlNavbar = () => {
        if (isAutoScrolling.current) {
            setLastScrollY(window.scrollY);
            return;
        }
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            setShowNavbar(false);
            setIsMobileMenuOpen(false);
            setIsUserDropdownOpen(false);
        } else {
            setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    const handleNavClick = () => {
        isAutoScrolling.current = true;
        setShowNavbar(true);
        setIsMobileMenuOpen(false);
        setTimeout(() => isAutoScrolling.current = false, 1000);
    };

    // --- PENGAMAN 1: CEK LOGIN (Mencegah White Screen Error) ---
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

    const playerName = auth.user.name;

    // --- PENGAMAN 2: CEK DATA SOAL ---
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

    // --- STATE LEADERBOARD (BARU) ---
    const [filterType, setFilterType] = useState('daily'); // Default: Harian

    // Pilih data mana yang ditampilkan berdasarkan Tab
    const activeLeaderboard = filterType === 'daily' ? dailyLeaderboard : monthlyLeaderboard;

    // --- LOGIKA GAME ---
    const handleStartGame = () => {
        setGameState('playing');
        setScore(0);
        setCurrentQuestion(0);
    };

    const handleAnswer = (selectedOptionText) => {
        const currentQ = questions[currentQuestion];
        let newScore = score;

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
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Head title="Quiz Challenge" />

            {/* --- NAVBAR BARU (Sama dengan halaman lain) --- */}
            <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 px-6 md:px-10 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <div className="text-xl font-bold tracking-tight text-gray-900">Dark Pattern</div>
                    </Link>
                    
                    {/* MENU DESKTOP */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                        <Link href="/#developer" onClick={handleNavClick} className="hover:text-yellow-600 transition">Developer Mode</Link>
                        <Link href="/#user" onClick={handleNavClick} className="hover:text-yellow-600 transition">User Mode</Link>
                        <Link href="/game" onClick={handleNavClick} className="text-yellow-600 font-bold transition">Game</Link>
                        <Link href="/#about" onClick={handleNavClick} className="hover:text-yellow-600 transition">About</Link>

                        <div className="border-l border-gray-300 pl-8 relative">
                            {auth.user ? (
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center gap-2 group focus:outline-none"
                                    >
                                        <span className="text-gray-900 group-hover:text-yellow-600 font-bold transition">Hi, {auth.user.name}</span>
                                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xs border border-yellow-500 shadow-sm group-hover:scale-105 transition">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>

                                    {isUserDropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-down overflow-hidden z-50">
                                            <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">Manage Account</div>
                                            <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition">Profile Settings</Link>
                                            <Link href={route('logout')} method="post" as="button" className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">Log Out</Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex gap-4 items-center">
                                    <Link href={route('login')} className="text-gray-900 hover:text-yellow-600 font-medium transition">Log in</Link>
                                    <Link href={route('register')} className="bg-black text-white hover:bg-gray-800 px-5 py-2 rounded-full font-bold transition shadow-md hover:shadow-lg">Register</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* TOMBOL HAMBURGER (Mobile) */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 focus:outline-none p-2">
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* --- MENU MOBILE DROPDOWN --- */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fade-in-down">
                        <Link href="/#developer" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2 border-b border-gray-50">Developer Mode</Link>
                        <Link href="/#user" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2 border-b border-gray-50">User Mode</Link>
                        <Link href="/game" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2 border-b border-gray-50">Game</Link>
                        <Link href="/#about" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2">About</Link>
                        
                        <div className="pt-4 mt-2 border-t border-gray-100">
                            {auth.user ? (
                                <>
                                    <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg mb-3">
                                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-sm border border-yellow-500">{auth.user.name.charAt(0).toUpperCase()}</div>
                                        <div><span className="block font-bold text-gray-900">{auth.user.name}</span><span className="text-xs text-gray-500">{auth.user.email}</span></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href={route('profile.edit')} className="text-center py-2 rounded-lg border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50">Settings</Link>
                                        <Link href={route('logout')} method="post" as="button" className="text-center py-2 rounded-lg bg-red-50 border border-red-100 text-sm font-bold text-red-600 hover:bg-red-100">Log Out</Link>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-3">
                                    <Link href={route('login')} className="block text-center text-gray-900 font-medium border border-gray-300 rounded-full py-2 hover:bg-gray-50">Log in</Link>
                                    <Link href={route('register')} className="block text-center bg-black text-white hover:bg-gray-800 font-bold rounded-full py-2">Register</Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* --- MAIN CONTENT (DENGAN PADDING TOP) --- */}
            <div className="flex flex-col items-center justify-center w-full min-h-screen pt-28 px-6 pb-12">

                {/* --- LAYAR AWAL (START + LEADERBOARD) --- */}
                {gameState === 'start' && (
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
                            
                            <div className="mb-8 mt-6">
                                <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-black transition group">
                                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-yellow-400 transition">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                    </span>
                                    Kembali ke Home
                                </Link>
                            </div>
                        </div>

                        {/* Kolom Kanan: LEADERBOARD DENGAN TAB */}
                        <div className="order-2 lg:order-2 w-full max-w-lg mx-auto lg:mx-0 bg-white border-2 border-gray-100 rounded-2xl shadow-xl overflow-hidden h-fit">
                            
                            <div className="bg-black text-white p-4 text-center">
                                <h2 className="text-xl font-bold uppercase tracking-widest">🏆 Top Players</h2>
                            </div>

                            {/* --- TAB SWITCHER (HARIAN / BULANAN) --- */}
                            <div className="flex border-b border-gray-100">
                                <button 
                                    onClick={() => setFilterType('daily')}
                                    className={`flex-1 py-3 text-sm font-bold transition ${
                                        filterType === 'daily' 
                                        ? 'bg-yellow-400 text-black' 
                                        : 'bg-white text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    Harian
                                </button>
                                <button 
                                    onClick={() => setFilterType('monthly')}
                                    className={`flex-1 py-3 text-sm font-bold transition ${
                                        filterType === 'monthly' 
                                        ? 'bg-yellow-400 text-black' 
                                        : 'bg-white text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    Bulanan
                                </button>
                            </div>

                            {/* TABLE CONTENT */}
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
                                        {activeLeaderboard && activeLeaderboard.length > 0 ? (
                                            activeLeaderboard.map((item, index) => (
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
                                                    Belum ada skor {filterType === 'daily' ? 'hari ini' : 'bulan ini'}.
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
                            {/* <span className="font-bold text-lg bg-white px-4 py-1 rounded-full">Score: {score}</span> */}
                        </div>

                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-8 text-center leading-relaxed">
                                {questions[currentQuestion].question}
                            </h2>
                            
                            <div className="grid grid-cols-1 gap-4">
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
        </div>
    );
}