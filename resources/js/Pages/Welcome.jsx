// 1. Tambahkan 'useRef' di import
import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    // --- STATE & REF ---
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    // Variable 'bendera' untuk menandai apakah sedang auto-scroll gara-gara klik menu
    const isAutoScrolling = useRef(false);

    const controlNavbar = () => {
        // Kalau sedang auto-scroll (isAutoScrolling = true), JANGAN jalankan logika sembunyi
        if (isAutoScrolling.current) {
            setLastScrollY(window.scrollY); // Tetap update posisi terakhir
            return;
        }

        if (window.scrollY > lastScrollY && window.scrollY > 100) { 
            // Scroll ke BAWAH -> Sembunyi
            setShowNavbar(false);
        } else {
            // Scroll ke ATAS -> Muncul
            setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    // --- FUNGSI BARU: Dipanggil saat menu diklik ---
    const handleNavClick = () => {
        // 1. Pasang bendera: "Woy, ini lagi scroll otomatis, jangan ngumpet!"
        isAutoScrolling.current = true;
        
        // 2. Paksa navbar tetap muncul
        setShowNavbar(true);

        // 3. Cabut bendera setelah 1 detik (asumsi scroll selesai dalam 1 detik)
        setTimeout(() => {
            isAutoScrolling.current = false;
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            <Head title="Welcome to Dark Pattern" />

            {/* --- NAVBAR --- */}
            <nav 
                className={`fixed top-0 w-full z-50 transition-transform duration-300 px-10 py-4 border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm 
                ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <div className="text-xl font-bold tracking-tight text-gray-900">
                            Dark Pattern
                        </div>
                    </Link>
                    
                    {/* Menu Kanan */}
                    <div className="hidden md:flex space-x-8 text-sm font-medium">
                        {/* ⚠️ TAMBAHKAN 'onClick={handleNavClick}' DI SETIAP LINK MENU */}
                        <Link href="/"><a onClick={handleNavClick} className="hover:text-yellow-500 transition">Home</a></Link>
                        <a href="#developer" onClick={handleNavClick} className="hover:text-yellow-500 transition">Developer Mode</a>
                        <a href="#user" onClick={handleNavClick} className="hover:text-yellow-500 transition">User Mode</a>
                        <a href="#game" onClick={handleNavClick} className="hover:text-yellow-500 transition">Game</a>
                        <a href="#about" onClick={handleNavClick} className="hover:text-yellow-500 transition">About</a>
                    </div>
                </div>
            </nav>

            {/* Padding Top agar konten tidak ketutupan navbar fixed */}
            <div className="pt-16">

                {/* --- SECTION 1: DEVELOPER MODE --- */}
                <section id="developer" className="py-20 px-10 max-w-7xl mx-auto scroll-mt-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">Developer <br/> Mode</h1>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Panduan membangun teknologi yang etis, transparan, dan nyaman bagi pengguna.
                            </p>
                            <Link href="/developer-mode">
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
                                    MULAI
                                </button>
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            <img src="/img/devMode.png" alt="Developer Mode" className="w-full max-w-md" onError={(e) => e.target.src='https://placehold.co/400'} />
                        </div>
                    </div>
                </section>

                {/* --- SECTION 2: USER MODE --- */}
                <section id="user" className="py-20 px-10 max-w-7xl mx-auto scroll-mt-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="flex justify-center order-last md:order-first">
                            <img src="/img/userMode.png" alt="User Mode" className="w-full max-w-md" onError={(e) => e.target.src='https://placehold.co/400'} />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold mb-4">User <br/> Mode</h1>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Panduan bagi pengguna untuk mengenali dan mewaspadai adanya dark pattern.
                            </p>
                            <Link href="/user-mode">
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 uppercase">
                                Mulai
                            </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: GAME --- */}
                <section id="game" className="py-20 px-10 max-w-7xl mx-auto scroll-mt-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">Game</h1>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Kuis singkat untuk meningkatkan literasi digital.
                            </p>
                            <Link href="/game">
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 uppercase">
                                    Mulai
                                </button>
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            <img src="/img/gameMode.png" alt="Game Mode" className="w-full max-w-md" onError={(e) => e.target.src='https://placehold.co/400'} />
                        </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer id="about" className="bg-yellow-400 py-16 mt-20 scroll-mt-28">
                    <div className="max-w-7xl mx-auto px-10 text-center">
                        <h2 className="font-bold text-lg mb-8">Dark Pattern</h2>
                        <div className="flex justify-center space-x-8 mb-8 font-medium">
                            <a href="#developer" onClick={handleNavClick} className="hover:underline">developer mode</a>
                            <a href="#user" onClick={handleNavClick} className="hover:underline">user mode</a>
                            <Link href="/game" className="hover:underline">game</Link>
                            <a href="#about" onClick={handleNavClick} className="hover:underline">about</a>
                        </div>
                        <div className="flex justify-center space-x-6 mb-8 text-xl">
                            <span>📷</span>
                            <span>💬</span>
                            <span>📧</span>
                        </div>
                        <p className="text-sm">© 2025 Dark Pattern Lab. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}