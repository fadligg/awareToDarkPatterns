// resources/js/Pages/UserMode.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function UserMode() {
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
            <Head title="User Guide" />

            {/* --- NAVBAR --- */}
            <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 px-6 md:px-10 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <div className="text-xl font-bold tracking-tight text-gray-900">Dark Pattern</div>
                    </Link>
                    
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                        <Link href="/#developer" onClick={handleNavClick} className="hover:text-yellow-600 transition">Developer Mode</Link>
                        <Link href="/#user" onClick={handleNavClick} className="text-yellow-600 font-bold transition">User Mode</Link>
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

                {/* --- MOBILE MENU --- */}
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

            <main className="max-w-7xl mx-auto px-8 pb-20 pt-28">
                {/* --- HEADER (User Mode) --- */}
                <div className="mt-12 mb-24">
                    <p className="text-yellow-500 text-sm mb-4 font-medium">
                        <Link href="/" className="hover:underline">Home</Link> &gt; <span class="ml-1 text-gray-400">User Mode</span>
                    </p>
                    <h1 className="text-6xl font-bold mb-4 tracking-tight">User Mode</h1>
                    <p className="text-lg text-gray-700 max-w-2xl">
                        Lindungi diri Anda dari manipulasi desain digital. Kenali triknya, hindari jebakannya, dan berselancar dengan aman.
                    </p>
                </div>

                {/* --- SECTION 1: Apa itu Dark Pattern? (Definitif & Jelas) --- */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 border-t border-gray-100 pt-8 md:pt-0 md:border-none">
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-bold leading-tight">Apa itu Dark Pattern?</h2>
                    </div>
                    
                    <div className="md:col-span-7 space-y-6">
                        <p className="leading-relaxed text-gray-800 text-lg">
                            Dark Patterns (atau Deceptive Patterns) adalah strategi desain antarmuka yang <strong>sengaja dibuat untuk menipu atau memanipulasi Anda</strong> agar melakukan tindakan yang tidak Anda niatkan atau inginkan.
                        </p>
                        <p className="leading-relaxed text-gray-800">
                            Ini <strong>bukanlah kecelakaan desain</strong>. Sebaliknya, ini adalah strategi yang secara sadar diterapkan oleh perusahaan untuk mengoptimalkan keuntungan finansial mereka dengan mengorbankan pengalaman dan dompet Anda.
                        </p>
                        
                        {/* BUTTON YANG DIPERBARUI */}
                        <Link 
                            href="/types-user" 
                            className="group inline-flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mt-16"
                        >
                            <span>Eksplorasi Dark Pattern</span>
                            <span className="bg-white/30 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </Link>
                    </div>
                </section>

                {/* --- SECTION BARU: Mengapa Anda Sering Tidak Sadar? --- */}
                <section className="bg-gray-50 rounded-3xl p-10 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl font-bold leading-tight mb-4">Mengapa Anda sering tidak sadar terjebak?</h2>
                            <p className="text-gray-600">
                                Anda mungkin merasa diri Anda teliti, namun dark pattern dirancang khusus untuk menyerang kelemahan psikologis manusia.
                            </p>
                        </div>
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <span className="text-3xl mb-2 block">🧠</span>
                                <h3 className="font-bold text-gray-900 mb-2">Bias Kognitif</h3>
                                <p className="text-sm text-gray-600">
                                    Desain ini mengeksploitasi cara otak Anda bekerja, seperti rasa takut ketinggalan (FOMO) atau kecenderungan ikut-ikutan orang lain.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <span className="text-3xl mb-2 block">👀</span>
                                <h3 className="font-bold text-gray-900 mb-2">Pengalihan Perhatian</h3>
                                <p className="text-sm text-gray-600">
                                    Menggunakan warna mencolok untuk mengarahkan Anda ke tombol yang "salah", sementara tombol "benar" dibuat samar atau tersembunyi.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <span className="text-3xl mb-2 block">📖</span>
                                <h3 className="font-bold text-gray-900 mb-2">Malas Membaca</h3>
                                <p className="text-sm text-gray-600">
                                    Memanfaatkan kebiasaan pengguna yang jarang membaca teks panjang. Bahasa yang digunakan pun sengaja dibuat berbelit-belit.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <span className="text-3xl mb-2 block">💔</span>
                                <h3 className="font-bold text-gray-900 mb-2">Manipulasi Emosi</h3>
                                <p className="text-sm text-gray-600">
                                    Menggunakan kata-kata yang membuat Anda merasa bersalah, malu, atau bodoh jika menolak tawaran mereka.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: DAMPAK NEGATIF --- */}
                <section className="mb-24">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold leading-tight mb-4">Apa Dampak Buruknya bagi Anda?</h2>
                        <p className="text-gray-600 max-w-2xl">
                            Dark pattern bukan sekadar desain yang jelek, tapi bisa menyebabkan kerugian nyata dalam jangka pendek maupun panjang.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1: Finansial */}
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 hover:shadow-md transition">
                            <div className="text-3xl mb-3">💸</div>
                            <h3 className="font-bold text-lg text-red-900 mb-2">Kerugian Finansial</h3>
                            <p className="text-sm text-red-700 leading-relaxed">
                                Anda mungkin tanpa sadar membayar biaya tersembunyi, membeli barang yang tidak diinginkan, atau terjebak langganan yang sulit dibatalkan.
                            </p>
                        </div>

                        {/* Card 2: Privasi */}
                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 hover:shadow-md transition">
                            <div className="text-3xl mb-3">🕵️‍♂️</div>
                            <h3 className="font-bold text-lg text-orange-900 mb-2">Kehilangan Privasi</h3>
                            <p className="text-sm text-orange-700 leading-relaxed">
                                Data pribadi Anda bisa dibagikan tanpa sadar (Privacy Zuckering), seringkali melalui opsi default yang menjebak.
                            </p>
                        </div>

                        {/* Card 3: Psikologis */}
                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 hover:shadow-md transition">
                            <div className="text-3xl mb-3">🤯</div>
                            <h3 className="font-bold text-lg text-purple-900 mb-2">Beban Mental</h3>
                            <p className="text-sm text-purple-700 leading-relaxed">
                                Menimbulkan frustrasi, stres, rasa bersalah, hingga kepanikan akibat urgensi palsu saat berbelanja online.
                            </p>
                        </div>

                        {/* Card 4: Keputusan Buruk */}
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition">
                            <div className="text-3xl mb-3">📉</div>
                            <h3 className="font-bold text-lg text-blue-900 mb-2">Keputusan Tidak Optimal</h3>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                Anda didorong mengambil keputusan impulsif atau salah memilih produk karena informasi perbandingannya sengaja dikaburkan.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 4: TIPS MENGHINDARI --- */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-bold leading-tight">
                            Strategi Menghindari Dark Pattern
                        </h2>
                        <p className="mt-4 text-gray-500">
                            Sebagai pengguna cerdas, Anda bisa melindungi diri dengan langkah-langkah berikut:
                        </p>
                    </div>
                    
                    <div className="md:col-span-7 space-y-6">
                        <div>
                            <ul className="space-y-4">
                                {[
                                    {
                                        title: 'Periksa Total Biaya di Akhir',
                                        desc: 'Selalu cek ulang total harga sebelum bayar. Biaya tambahan tersembunyi (seperti admin atau asuransi) sering muncul tiba-tiba pada tahap akhir.'
                                    },
                                    {
                                        title: 'Waspada Bahasa Ambigu & Diskon',
                                        desc: 'Hati-hati dengan tawaran diskon besar atau kalimat yang membingungkan yang mungkin berubah saat proses berlanjut.'
                                    },
                                    {
                                        title: 'Periksa Opsi Tambahan (Add-on)',
                                        desc: 'Pastikan asuransi atau layanan tambahan memerlukan tindakan klik dari Anda (bukan otomatis masuk). Hapus jika tidak perlu.'
                                    },
                                    {
                                        title: 'Pasang Pengingat Trial',
                                        desc: 'Jika mendaftar uji coba gratis, segera pasang alarm untuk membatalkan sebelum periode habis agar saldo tidak terpotong otomatis.'
                                    },
                                    {
                                        title: 'Cari Sumber Terpercaya',
                                        desc: 'Jangan mudah percaya klaim sepihak ("Stok Menipis!"). Cari informasi mengenai dark pattern dari sumber independen untuk meningkatkan kesadaran.'
                                    }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-yellow-50 hover:border-yellow-200 transition">
                                        <span className="text-2xl mr-4">🛡️</span>
                                        <div>
                                            <span className="block font-bold text-gray-900">{item.title}</span>
                                            <span className="text-sm text-gray-600">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 5: CALL TO ACTION (Game Quiz) --- */}
                <section className="bg-black text-white rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Sudah merasa jago mengenali jebakan?</h2>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            Uji kemampuan Anda dengan bermain Game Kuis Dark Pattern. Buktikan kalau Anda tidak mudah tertipu!
                        </p>
                        <Link href="/game" className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-500 transition transform hover:scale-105 shadow-lg inline-block">
                            Mainkan Game Sekarang 🎮
                        </Link>
                    </div>
                    {/* Hiasan Background Abstrak */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
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