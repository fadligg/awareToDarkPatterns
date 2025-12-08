import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function UserMode() {
    // --- LOGIKA NAVBAR (Copy-paste dari sebelumnya) ---
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const isAutoScrolling = useRef(false);

    const controlNavbar = () => {
        if (isAutoScrolling.current) {
            setLastScrollY(window.scrollY);
            return;
        }
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            setShowNavbar(false);
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
        setTimeout(() => isAutoScrolling.current = false, 1000);
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Head title="User Mode" />

            {/* --- NAVBAR --- */}
            <nav 
                className={`fixed top-0 w-full z-50 transition-transform duration-300 px-8 py-4 border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm
                ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold tracking-tight text-gray-900">Dark Pattern</div>
                    <div className="hidden md:flex space-x-12 text-sm font-medium">
                        <Link href="/developer-mode" className="hover:text-yellow-600 transition">guideline</Link>
                        <Link href="/developer-mode" className="hover:text-yellow-600 transition">dark Pattern</Link>
                        <Link href="/types" className="hover:text-yellow-600 transition">type</Link>
                        <Link href="#" className="hover:text-yellow-600 transition">about</Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 pb-20 pt-28">
                {/* --- HEADER (User Mode) --- */}
                <div className="mt-12 mb-24">
                    <p className="text-yellow-500 text-sm mb-4 font-medium">
                        <Link href="/" className="hover:underline">Home</Link> &gt; User Mode
                    </p>
                    <h1 className="text-6xl font-bold mb-4 tracking-tight">User Mode</h1>
                    <p className="text-lg text-gray-700 max-w-2xl">
                        Panduan membangun teknologi yang etis, transparan, dan nyaman bagi pengguna.
                    </p>
                </div>

                {/* --- SECTION 1: Apa itu Dark Pattern? --- */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 border-t border-gray-100 pt-8 md:pt-0 md:border-none">
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
                                {/* LIST BERBEDA SESUAI GAMBAR USER MODE */}
                                {['Misleading Interface', 'Forced Action', 'Hidden Priorities'].map((item, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <span className="text-yellow-500 mr-2">⚡</span> 
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/types" className="inline-block text-yellow-500 hover:text-yellow-600 font-medium mt-2">
                            Lihat jenis Dark Pattern lainnya
                        </Link>
                    </div>
                </section>

                {/* --- SECTION 2: Bagaimana cara Developer... (Sesuai Gambar) --- */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
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

                        <Link href="/developer-mode" className="inline-block text-yellow-500 hover:text-yellow-600 font-medium mt-2">
                            Pelajari panduan Developer lainnya
                        </Link>
                    </div>
                </section>

                {/* --- PLACEHOLDERS (Sesuai Gambar) --- */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-bold leading-tight">Apa itu Dark Pattern</h2>
                    </div>
                    <div className="md:col-span-7"></div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-bold leading-tight">Jenis Dark Pattern</h2>
                    </div>
                    <div className="md:col-span-7"></div>
                </section>

            </main>

            {/* --- FOOTER --- */}
            <footer className="w-full h-48 bg-yellow-400 mt-20"></footer>
        </div>
    );
}