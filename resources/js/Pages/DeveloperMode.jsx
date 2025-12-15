// resources/js/Pages/DeveloperMode.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function DeveloperMode() {
    // 1. Ambil data Auth
    const { auth } = usePage().props;

    // --- STATE NAVBAR ---
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const isAutoScrolling = useRef(false);

    // --- LOGIKA SCROLL & MENU ---
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

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Head title="Dev Guidelines" />

            {/* --- NAVBAR --- */}
            <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 px-6 md:px-10 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <div className="text-xl font-bold tracking-tight text-gray-900">Dark Pattern</div>
                    </Link>
                    
                    {/* MENU DESKTOP */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                        <Link href="/#developer" onClick={handleNavClick} className="text-yellow-600 font-bold transition">Developer Mode</Link>
                        <Link href="/user-mode" onClick={handleNavClick} className="hover:text-yellow-600 transition">User Mode</Link>
                        <Link href="/game" onClick={handleNavClick} className="hover:text-yellow-600 transition">Game</Link>
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
                                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-down overflow-hidden">
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

                    {/* HAMBURGER BUTTON */}
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

                {/* MOBILE MENU */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fade-in-down">
                        <Link href="/#developer" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2 border-b border-gray-50">Developer Mode</Link>
                        <Link href="/user-mode" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2 border-b border-gray-50">User Mode</Link>
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

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-7xl mx-auto px-8 pb-20 pt-28">
                
                {/* HEADER */}
                <div id="guideline" className="mb-24 scroll-mt-32">
                    <p className="text-yellow-500 text-sm mb-4 font-medium">
                        <Link href="/" className="hover:underline">Home</Link> &gt; <span class="ml-1 text-gray-400">Developer Mode</span>
                    </p>
                    <h1 className="text-6xl font-bold mb-4 tracking-tight">Developer Mode</h1>
                    <p className="text-lg text-gray-700 max-w-2xl">
                        Standar etika dan panduan teknis untuk membangun antarmuka yang jujur, transparan, dan menghormati pengguna.
                    </p>
                </div>

                {/* SECTION 1: APA ITU DARK PATTERN (Technical Definition) */}
                <section id="definition" className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 border-t border-gray-100 pt-8 md:pt-0 md:border-none scroll-mt-32">
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-bold leading-tight">Definisi Teknis</h2>
                    </div>
                    <div className="md:col-span-7 space-y-6">
                        <p className="leading-relaxed text-gray-800 text-lg">
                            Dalam konteks UI/UX Engineering, <strong>Dark Pattern</strong> adalah implementasi elemen antarmuka yang dirancang dengan sengaja untuk memanipulasi metrik konversi (CRO) dengan mengorbankan otonomi pengguna.
                        </p>
                        <p className="leading-relaxed text-gray-800">
                            Praktik ini sering melanggar prinsip <em>Heuristik Usability</em> dan hukum perlindungan konsumen (seperti GDPR atau UU ITE), yang dapat menyebabkan hilangnya kepercayaan pengguna jangka panjang dan risiko hukum bagi perusahaan.
                        </p>
                        
                        {/* BUTTON KE TYPES */}
                        <Link 
                            href="/types" 
                            className="group inline-flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-6"
                        >
                            <span>Lihat Dokumentasi Teknis</span>
                            <span className="bg-white/30 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </Link>
                    </div>
                </section>

                {/* SECTION 2: ETHICAL GUIDELINES (Grid Cards) */}
                <section className="mb-24">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold leading-tight mb-4">Prinsip Ethical Design</h2>
                        <p className="text-gray-600 max-w-2xl">
                            Sebagai developer, kita bertanggung jawab atas kode yang kita tulis. Berikut adalah panduan implementasi untuk menghindari Dark Pattern:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Guideline 1 */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-yellow-400 transition hover:shadow-md">
                            <div className="text-3xl mb-3">⚖️</div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Transparansi Harga</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Tampilkan total biaya (termasuk pajak & admin) di awal checkout. Jangan sembunyikan biaya di langkah terakhir (Hidden Costs).
                            </p>
                        </div>

                        {/* Guideline 2 */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-yellow-400 transition hover:shadow-md">
                            <div className="text-3xl mb-3">🛑</div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Easy Cancellation</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Pastikan proses <em>Unsubscribe</em> semudah proses <em>Subscribe</em>. Jangan paksa user menelepon CS (Roach Motel).
                            </p>
                        </div>

                        {/* Guideline 3 */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-yellow-400 transition hover:shadow-md">
                            <div className="text-3xl mb-3">✅</div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Opt-In vs Opt-Out</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Jangan gunakan <em>pre-ticked checkboxes</em> untuk asuransi atau donasi. Biarkan user memilih secara aktif (Opt-In).
                            </p>
                        </div>

                        {/* Guideline 4 */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-yellow-400 transition hover:shadow-md">
                            <div className="text-3xl mb-3">🎨</div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Jujur secara Visual</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Jangan menyamarkan iklan sebagai tombol navigasi. Bedakan style tombol utama dan sekunder dengan kontras yang wajar.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: CALL TO ACTION */}
                <section className="bg-black text-white rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap membangun UI yang lebih baik?</h2>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            Pelajari detail teknis, analisis hukum, dan contoh kode untuk setiap jenis Dark Pattern di dokumentasi lengkap kami.
                        </p>
                        <Link href="/types" className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-500 transition transform hover:scale-105 shadow-lg inline-block">
                            Buka Dokumentasi Developer 🛠️
                        </Link>
                    </div>
                    {/* Background Abstract */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-gray-800 opacity-30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-600 opacity-20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </section>
                
                <div className="mb-8 mt-16">
                    <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-black transition group">
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-yellow-400 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </span>
                        Kembali ke Home
                    </Link>
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="w-full h-48 bg-yellow-400 mt-20 flex items-center justify-center">
                <div className="text-center text-black">
                    <p className="font-bold text-lg mb-2">Dark Pattern Awareness</p>
                    <p className="text-sm opacity-80">&copy; 2025 User Protection Initiative.</p>
                </div>
            </footer>
        </div>
    );
}