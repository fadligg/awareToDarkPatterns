// resources/js/Pages/DarkPatternTypes.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function DarkPatternTypes() {
    // 1. Ambil Auth untuk Navbar
    const { auth } = usePage().props;

    // --- STATE NAVBAR ---
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const isAutoScrolling = useRef(false);

    // --- LOGIKA NAVBAR ---
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

    // --- DATA JENIS DARK PATTERN (16 JENIS) ---
    const types = [
        { title: "Comparison prevention", desc: "Pengguna kesulitan membandingkan produk karena fitur dan harga disajikan dengan cara yang rumit." },
        { title: "Confirmshaming", desc: "Pengguna dimanipulasi secara emosional atau dibuat merasa bersalah agar melakukan sesuatu yang sebenarnya tidak ingin mereka lakukan." },
        { title: "Disguised ads", desc: "Pengguna keliru mengira mereka mengklik elemen antarmuka atau konten bawaan (asli), padahal itu sebenarnya adalah iklan yang disamarkan." },
        { title: "Fake scarcity", desc: "Pengguna didesak untuk segera menyelesaikan suatu tindakan karena disajikan indikasi palsu mengenai keterbatasan persediaan atau popularitas produk/layanan." },
        { title: "Fake social proof", desc: "Pengguna disesatkan agar percaya bahwa suatu produk lebih populer atau kredibel daripada kenyataannya, karena mereka disajikan ulasan, testimoni, atau pesan aktivitas yang sebenarnya palsu." },
        { title: "Fake urgency", desc: "Pengguna didorong untuk segera menyelesaikan suatu tindakan karena mereka disajikan batasan waktu yang sebenarnya palsu atau tidak nyata." },
        { title: "Forced action", desc: "Pengguna ingin melakukan suatu hal, tetapi mereka diwajibkan untuk melakukan hal lain yang tidak diinginkan sebagai imbalannya." },
        { title: "Hard to cancel", desc: "Pengguna merasa mudah untuk mendaftar atau berlangganan, tetapi ketika mereka ingin berhenti atau membatalkan, prosesnya dibuat sangat sulit." },
        { title: "Hidden Costs", desc: "Pengguna tertarik oleh harga iklan yang rendah, namun setelah menghabiskan waktu, mereka menemukan biaya dan pungutan tak terduga saat mencapai proses pembayaran akhir (checkout)." },
        { title: "Hidden subscription", desc: "Pengguna tanpa sadar didaftarkan dalam paket langganan berulang atau rencana pembayaran tanpa adanya pengungkapan yang jelas atau persetujuan eksplisit dari mereka." },
        { title: "Nagging", desc: "Pengguna mencoba melakukan sesuatu, tetapi mereka terus-menerus diganggu oleh permintaan untuk melakukan hal lain yang mungkin bukan demi kepentingan terbaik mereka." },
        { title: "Obstruction", desc: "Pengguna dihadapkan pada rintangan atau halangan, sehingga sulit bagi mereka untuk menyelesaikan tugas atau mengakses informasi yang dibutuhkan." },
        { title: "Preselection", desc: "Pengguna disajikan opsi bawaan yang sudah dipilihkan secara default untuk mereka, dengan tujuan memengaruhi keputusan yang akan mereka ambil." },
        { title: "Sneaking", desc: "Pengguna ditarik ke dalam suatu transaksi dengan alasan yang salah, karena informasi yang relevan dan penting disembunyikan atau penampilannya ditunda." },
        { title: "Trick wording", desc: "Pengguna disesatkan untuk melakukan suatu tindakan karena penggunaan bahasa yang membingungkan atau menyesatkan dalam penyajian informasi." },
        { title: "Visual interference", desc: "Pengguna berharap melihat informasi disajikan dengan cara yang jelas dan mudah diprediksi di halaman, tetapi informasi tersebut justru disembunyikan, dikaburkan, atau disamarkan." }
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Head title="Jenis Dark Pattern" />

            {/* --- NAVBAR LENGKAP --- */}
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
            <main className="max-w-7xl mx-auto px-8 pb-20 pt-32">
                
                {/* HERO SECTION */}
                <div className="mb-16">
                    <p className="text-yellow-500 text-sm mb-4 font-medium">
                        <Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/developer-mode" className="hover:underline">Developer Mode</Link> &gt; <span class="ml-1 text-gray-400">Jenis Dark Pattern</span>
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900">
                        Jenis Dark Pattern
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Dokumentasi teknis untuk 16 jenis pola desain yang menipu. Klik detail untuk melihat analisis dan cara mitigasinya.
                    </p>
                </div>

                {/* --- GRID CARD LAYOUT (Tanpa Modal, Link Langsung) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {types.map((item, index) => (
                        <Link 
                            key={index}
                            href={`/types/${index + 1}`} // Link ke halaman detail
                            className="group relative bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg hover:border-yellow-400 transition-all duration-300 flex flex-col justify-between h-full"
                        >
                            {/* Card Content */}
                            <div>
                                {/* Header Card: ID Number & Icon */}
                                <div className="flex justify-between items-start mb-6">
                                    <span className="font-mono text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 group-hover:text-yellow-600 group-hover:border-yellow-100 transition-colors">
                                        TYPE_{String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-black leading-tight">
                                    {item.title}
                                </h3>

                                {/* Desc */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Footer Card: Fake Link Appearance */}
                            <div className="flex items-center text-sm font-bold text-gray-500 group-hover:text-black transition-colors mt-auto gap-1">
                                Lihat Detail 
                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className="mb-8 mt-16">
                    <Link href="/developer-mode" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-black transition group">
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-yellow-400 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </span>
                        Kembali ke Developer Mode
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