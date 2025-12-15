// resources/js/Pages/Welcome.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage().props;

    // --- STATE ---
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const isAutoScrolling = useRef(false);

    // --- DATA TIM (CREDITS) ---
    // Silakan ganti dengan data asli tim kamu
    const teamMembers = [
        {
            name: "Fadli Haidar Nugraha",
            role: "Fullstack Developer",
            instagram: "dleehh_", // Link: instagram.com/username_kamu
            avatar: "/img/people/fadli.png" // Placeholder avatar
        },
        {
            name: "Muhammad Dyo Rijki Fadillah",
            role: "UI/UX Designer",
            instagram: "dyoo.rf",
            avatar: "/img/people/dyo.jpeg"
        },
        {
            name: "Irsyad Adfiansha Hidayat",
            role: "UI/UX Designer",
            instagram: "adfsh000",
            avatar: "/img/people/irsyad.jpeg"
        },
        {
            name: "M. Dantha Arianvasya",
            role: "Researcher",
            instagram: "danthaarian",
            avatar: "/img/people/dantha.jpg"
        }
        // Tambahkan anggota lain di sini...
    ];

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
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            <Head title="Home" />

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
                                        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>

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

            {/* --- MAIN CONTENT --- */}
            <div className="pt-16">
                
                {/* SECTION: DEVELOPER MODE */}
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

                {/* SECTION: USER MODE */}
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

                {/* SECTION: GAME */}
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

                {/* --- FOOTER / ABOUT SECTION (CREDITS) --- */}
                <footer id="about" className="bg-yellow-400 py-16 mt-20 scroll-mt-28">
                    <div className="max-w-7xl mx-auto px-10 text-center">
                        <h1 className="font-bold text-5xl mb-4 text-black">About</h1>
                        <h2 className="font-bold text-3xl mb-4 text-black">Meet Our Team</h2>
                        <p className="text-black/80 mb-12 max-w-3xl mx-auto">
                            Proyek ini dikembangkan dengan semangat untuk menciptakan internet yang lebih jujur dan transparan. <br />
                            Kami adalah tim yang berdedikasi untuk meningkatkan kesadaran tentang dark pattern dan membantu pengguna serta pengembang memahami dampaknya.
                        </p>

                        {/* GRID TIM MEMBER */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="flex flex-col items-center group">
                                    <div className="w-24 h-24 rounded-full bg-black overflow-hidden mb-4 border-4 border-white shadow-lg transition transform group-hover:scale-110">
                                        <img 
                                            src={member.avatar} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="font-bold text-lg text-black">{member.name}</h3>
                                    <p className="text-sm text-black/70 mb-2">{member.role}</p>
                                    
                                    {/* Link Instagram */}
                                    <a 
                                        href={`https://instagram.com/${member.instagram}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center text-sm font-bold text-black hover:text-white transition gap-1 bg-black/10 px-3 py-1 rounded-full hover:bg-black/20"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                        @{member.instagram}
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Footer Bottom Links */}
                        <div className="flex justify-center space-x-8 mb-8 font-medium text-black border-t border-black/10 pt-8">
                            <a href="#developer" onClick={handleNavClick} className="hover:underline">Developer Mode</a>
                            <a href="#user" onClick={handleNavClick} className="hover:underline">User Mode</a>
                            <a href="#game" onClick={handleNavClick} className="hover:underline">Game</a>
                        </div>

                        <p className="text-sm text-black">© 2025 Dark Pattern Awareness. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}