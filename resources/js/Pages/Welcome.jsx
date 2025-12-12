// resources/js/Pages/Welcome.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage().props;

    // --- STATE ---
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    // State Menu Mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State Baru: Dropdown User (Desktop)
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const isAutoScrolling = useRef(false);

    const controlNavbar = () => {
        if (isAutoScrolling.current) {
            setLastScrollY(window.scrollY);
            return;
        }

        if (window.scrollY > lastScrollY && window.scrollY > 100) { 
            setShowNavbar(false);
            setIsMobileMenuOpen(false);
            setIsUserDropdownOpen(false); // Tutup dropdown user juga
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
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            <Head title="Welcome to Dark Pattern" />

            {/* --- NAVBAR --- */}
            <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 px-6 md:px-10 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <div className="text-xl font-bold tracking-tight text-gray-900">Dark Pattern</div>
                    </Link>
                    
                    {/* --- MENU DESKTOP --- */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                        <a href="#developer" onClick={handleNavClick} className="hover:text-yellow-600 transition">Developer Mode</a>
                        <a href="#user" onClick={handleNavClick} className="hover:text-yellow-600 transition">User Mode</a>
                        <a href="#game" onClick={handleNavClick} className="hover:text-yellow-600 transition">Game</a>
                        <a href="#about" onClick={handleNavClick} className="hover:text-yellow-600 transition">About</a>

                        {/* AUTH DESKTOP (DROPDOWN) */}
                        <div className="border-l border-gray-300 pl-8 relative">
                            {auth.user ? (
                                <div className="relative">
                                    {/* Tombol Trigger Dropdown */}
                                    <button 
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center gap-2 group focus:outline-none"
                                    >
                                        <span className="text-gray-900 group-hover:text-yellow-600 font-bold transition">
                                            Hi, {auth.user.name}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xs border border-yellow-500 shadow-sm group-hover:scale-105 transition">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        {/* Icon Panah Kecil */}
                                        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>

                                    {/* Isi Dropdown */}
                                    {isUserDropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-down overflow-hidden">
                                            <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">
                                                Manage Account
                                            </div>
                                            
                                            <Link 
                                                href={route('profile.edit')} 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition"
                                            >
                                                Profile Settings
                                            </Link>
                                            
                                            {/* Tombol Logout (Method POST) */}
                                            <Link 
                                                href={route('logout')} 
                                                method="post" 
                                                as="button" 
                                                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                            >
                                                Log Out
                                            </Link>
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

                    {/* --- TOMBOL HAMBURGER (Mobile) --- */}
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
                        <a href="#developer" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2 border-b border-gray-50">Developer Mode</a>
                        <a href="#user" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2 border-b border-gray-50">User Mode</a>
                        <a href="#game" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2 border-b border-gray-50">Game</a>
                        <a href="#about" onClick={handleNavClick} className="block text-gray-800 hover:text-yellow-600 font-medium py-2">About</a>
                        
                        <div className="pt-4 mt-2 border-t border-gray-100">
                            {auth.user ? (
                                <>
                                    <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg mb-3">
                                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-sm border border-yellow-500">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-900">{auth.user.name}</span>
                                            <span className="text-xs text-gray-500">{auth.user.email}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href={route('profile.edit')} className="text-center py-2 rounded-lg border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50">
                                            Settings
                                        </Link>
                                        <Link href={route('logout')} method="post" as="button" className="text-center py-2 rounded-lg bg-red-50 border border-red-100 text-sm font-bold text-red-600 hover:bg-red-100">
                                            Log Out
                                        </Link>
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

            {/* KONTEN HALAMAN (Sama seperti sebelumnya) */}
            <div className="pt-16">
                <section id="developer" className="py-20 px-10 max-w-7xl mx-auto scroll-mt-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">Developer <br/> Mode</h1>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Panduan membangun teknologi yang etis, transparan, dan nyaman bagi pengguna.
                            </p>
                            <Link href="/developer-mode">
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">MULAI</button>
                            </Link>
                        </div>
                        <div className="flex justify-center"><img src="/img/devMode.png" alt="Developer Mode" className="w-full max-w-md" onError={(e) => e.target.src='https://placehold.co/400'} /></div>
                    </div>
                </section>

                <section id="user" className="py-20 px-10 max-w-7xl mx-auto scroll-mt-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="flex justify-center order-last md:order-first"><img src="/img/userMode.png" alt="User Mode" className="w-full max-w-md" onError={(e) => e.target.src='https://placehold.co/400'} /></div>
                        <div>
                            <h1 className="text-5xl font-bold mb-4">User <br/> Mode</h1>
                            <p className="text-gray-600 mb-8 leading-relaxed">Panduan bagi pengguna untuk mengenali dan mewaspadai adanya dark pattern.</p>
                            <Link href="/user-mode">
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 uppercase">Mulai</button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="game" className="py-20 px-10 max-w-7xl mx-auto scroll-mt-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">Game</h1>
                            <p className="text-gray-600 mb-8 leading-relaxed">Kuis singkat untuk meningkatkan literasi digital.</p>
                            <Link href="/game">
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 uppercase">Mulai</button>
                            </Link>
                        </div>
                        <div className="flex justify-center"><img src="/img/gameMode.png" alt="Game Mode" className="w-full max-w-md" onError={(e) => e.target.src='https://placehold.co/400'} /></div>
                    </div>
                </section>

                <footer id="about" className="bg-yellow-400 py-16 mt-20 scroll-mt-28">
                    <div className="max-w-7xl mx-auto px-10 text-center">
                        <h2 className="font-bold text-lg mb-8">Dark Pattern</h2>
                        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8 font-medium">
                            <a href="#developer" onClick={handleNavClick} className="hover:underline">developer mode</a>
                            <a href="#user" onClick={handleNavClick} className="hover:underline">user mode</a>
                            <Link href="/game" className="hover:underline">game</Link>
                            <a href="#about" onClick={handleNavClick} className="hover:underline">about</a>
                        </div>
                        <div className="flex justify-center space-x-6 mb-8 text-xl"><span>📷</span><span>💬</span><span>📧</span></div>
                        <p className="text-sm">© 2025 Dark Pattern Lab. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}