// resources/js/Pages/DeveloperMode.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function DeveloperMode() {
    // --- 1. SETUP STATE & LOGIC SCROLL (Sama seperti referensi kamu) ---
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const isAutoScrolling = useRef(false);

    const controlNavbar = () => {
        if (isAutoScrolling.current) {
            setLastScrollY(window.scrollY);
            return;
        }

        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            setShowNavbar(false); // Scroll ke bawah -> Hilang
        } else {
            setShowNavbar(true);  // Scroll ke atas -> Muncul
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
        setTimeout(() => {
            isAutoScrolling.current = false;
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Head title="Developer Mode" />

            {/* --- NAVBAR (Fixed & Animated) --- */}
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

            {/* --- MAIN CONTENT --- */}
            {/* Tambahkan pt-24 agar konten paling atas tidak ketutupan navbar fixed */}
            <main className="max-w-7xl mx-auto px-8 pb-20 pt-28">
                
                {/* HERO SECTION */}
                <div id="guideline" className="mb-24 scroll-mt-32">
                    <p className="text-yellow-500 text-sm mb-4 font-medium">
                        <Link href="/" className="hover:underline">Home</Link> &gt; Developer Mode
                    </p>
                    <h1 className="text-6xl font-bold mb-4 tracking-tight">Developer Mode</h1>
                    <p className="text-lg text-gray-700 max-w-2xl">
                        Panduan membangun teknologi yang etis, transparan, dan nyaman bagi pengguna.
                    </p>
                </div>

                {/* SECTION 1: DEFINISI */}
                <section id="definition" className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 border-t border-gray-100 pt-8 md:pt-0 md:border-none scroll-mt-32">
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-bold leading-tight">Apa itu Dark Pattern?</h2>
                    </div>
                    <div className="md:col-span-7 space-y-6">
                        <p className="leading-relaxed text-gray-800">
                            Dark patterns adalah teknik desain pada website atau aplikasi yang secara sengaja dibuat untuk mempengaruhi pengguna agar melakukan sesuatu yang sebenarnya tidak mereka inginkan. Teknik ini biasanya memanfaatkan kebingungan, tekanan emosional, atau penyembunyian informasi penting.
                        </p>
                        <div>
                            <p className="mb-2">Contoh kategori dark pattern:</p>
                            <ul className="space-y-1">
                                {['Comparison prevention', 'Confirmshaming', 'Disguised ads'].map((item, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <span className="text-yellow-500 mr-2">⚡</span> 
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <a href="#type" onClick={handleNavClick} className="inline-block text-yellow-500 hover:text-yellow-600 font-medium mt-2">
                            Lihat jenis Dark Pattern lainnya
                        </a>
                    </div>
                </section>

                {/* SECTION 2: SOLUSI */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 scroll-mt-32">
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-bold leading-tight">
                            Bagaimana cara Developer menghindari Dark Pattern?
                        </h2>
                    </div>
                    <div className="md:col-span-7 space-y-6">
                        <p className="leading-relaxed text-gray-800">
                            Menghindari dark pattern bukan hanya soal hukum — ini adalah komitmen untuk membangun pengalaman yang etis dan berorientasi pada pengguna.
                        </p>
                        <div>
                            <p className="mb-2">Developer dapat memastikan UI tetap etis dengan:</p>
                            <ul className="space-y-1">
                                {[
                                    'menampilkan informasi secara transparan,',
                                    'memberi kontrol penuh kepada pengguna,',
                                    'menghindari teks manipulatif,',
                                    'menjaga kejujuran visual dan bahasa,',
                                    'memastikan opsi penting tidak disembunyikan.'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="text-yellow-500 mr-2 mt-1">⚡</span> 
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <a href="#" className="inline-block text-yellow-500 hover:text-yellow-600 font-medium mt-2">
                            Pelajari panduan Developer lainnya
                        </a>
                    </div>
                </section>

                 {/* SECTION 3: TYPES (Placeholder) */}
                 <section id="type" className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 scroll-mt-32">
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-bold leading-tight">Jenis Dark Pattern</h2>
                    </div>
                    <div className="md:col-span-7">
                        {/* Konten Placeholder */}
                        <a href="/types" className="inline-block text-yellow-500 hover:text-yellow-600 font-medium mt-2">
                            Pelajari Jenis-Jenis Dark Pattern
                        </a>
                    </div>
                </section>
            </main>

            {/* --- FOOTER (Kuning Full) --- */}
            <footer id="footer" className="bg-yellow-400 py-16 w-full scroll-mt-28">
                <div className="max-w-7xl mx-auto px-10 text-center">
                    <h2 className="font-bold text-lg mb-8 text-black">Dark Pattern</h2>
                    
                    {/* Link Footer */}
                    <div className="flex justify-center space-x-8 mb-8 font-medium text-black">
                        <a href="#guideline" onClick={handleNavClick} className="hover:underline">guideline</a>
                        <a href="#definition" onClick={handleNavClick} className="hover:underline">dark pattern</a>
                        <a href="#type" onClick={handleNavClick} className="hover:underline">type</a>
                        {/* Link kembali ke Home */}
                        <Link href="/" className="hover:underline">home</Link>
                    </div>

                    {/* Social Icons Placeholder */}
                    <div className="flex justify-center space-x-6 mb-8 text-xl text-black">
                        <span>📷</span>
                        <span>💬</span>
                        <span>📧</span>
                    </div>

                    <p className="text-sm text-black">© 2025 Dark Pattern Lab. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}