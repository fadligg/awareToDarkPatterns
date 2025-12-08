import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function DarkPatternTypes() {
    // --- 1. LOGIKA NAVBAR (Sama persis dengan halaman sebelumnya) ---
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

    // --- 2. DATA JENIS DARK PATTERN (Sesuai Gambar) ---
    const types = [
        {
            title: "Comparison prevention",
            desc: "Pengguna kesulitan membandingkan produk karena fitur dan harga disajikan dengan cara yang rumit."
        },
        {
            title: "Confirmshaming",
            desc: "Pengguna dimanipulasi secara emosional atau dibuat merasa bersalah agar melakukan sesuatu yang sebenarnya tidak ingin mereka lakukan."
        },
        {
            title: "Disguised ads",
            desc: "Pengguna keliru mengira mereka mengklik elemen antarmuka atau konten bawaan (asli), padahal itu sebenarnya adalah iklan yang disamarkan."
        },
        {
            title: "Fake scarcity",
            desc: "Pengguna didesak untuk segera menyelesaikan suatu tindakan karena disajikan indikasi palsu mengenai keterbatasan persediaan atau popularitas produk/layanan."
        },
        {
            title: "Fake social proof",
            desc: "Pengguna disesatkan agar percaya bahwa suatu produk lebih populer atau kredibel daripada kenyataannya, karena mereka disajikan ulasan, testimoni, atau pesan aktivitas yang sebenarnya palsu."
        },
        {
            title: "Fake urgency",
            desc: "Pengguna didorong untuk segera menyelesaikan suatu tindakan karena mereka disajikan batasan waktu yang sebenarnya palsu atau tidak nyata."
        },
        {
            title: "Forced action",
            desc: "Pengguna ingin melakukan suatu hal, tetapi mereka diwajibkan untuk melakukan hal lain yang tidak diinginkan sebagai imbalannya."
        },
        {
            title: "Hard to cancel",
            desc: "Pengguna merasa mudah untuk mendaftar atau berlangganan, tetapi ketika mereka ingin berhenti atau membatalkan, prosesnya dibuat sangat sulit."
        },
        {
            title: "Hidden Costs",
            desc: "Pengguna tertarik oleh harga iklan yang rendah, namun setelah menghabiskan waktu, mereka menemukan biaya dan pungutan tak terduga saat mencapai proses pembayaran akhir (checkout)."
        },
        {
            title: "Hidden subscription",
            desc: "Pengguna tanpa sadar didaftarkan dalam paket langganan berulang atau rencana pembayaran tanpa adanya pengungkapan yang jelas atau persetujuan eksplisit dari mereka."
        },
        {
            title: "Nagging",
            desc: "Pengguna mencoba melakukan sesuatu, tetapi mereka terus-menerus diganggu oleh permintaan untuk melakukan hal lain yang mungkin bukan demi kepentingan terbaik mereka."
        },
        {
            title: "Obstruction",
            desc: "Pengguna dihadapkan pada rintangan atau halangan, sehingga sulit bagi mereka untuk menyelesaikan tugas atau mengakses informasi yang dibutuhkan."
        },
        {
            title: "Preselection",
            desc: "Pengguna disajikan opsi bawaan yang sudah dipilihkan secara default untuk mereka, dengan tujuan memengaruhi keputusan yang akan mereka ambil."
        },
        {
            title: "Sneaking",
            desc: "Pengguna ditarik ke dalam suatu transaksi dengan alasan yang salah, karena informasi yang relevan dan penting disembunyikan atau penampilannya ditunda."
        },
        {
            title: "Trick wording",
            desc: "Pengguna disesatkan untuk melakukan suatu tindakan karena penggunaan bahasa yang membingungkan atau menyesatkan dalam penyajian informasi."
        },
        {
            title: "Visual interference",
            desc: "Pengguna berharap melihat informasi disajikan dengan cara yang jelas dan mudah diprediksi di halaman, tetapi informasi tersebut justru disembunyikan, dikaburkan, atau disamarkan."
        }
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Head title="Jenis Dark Pattern" />

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

            <main className="max-w-7xl mx-auto px-8 pb-20 pt-28">
                {/* --- HEADER --- */}
                <div className="mb-16">
                    <p className="text-yellow-500 text-sm mb-4 font-medium">
                        <Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/developer-mode" className="hover:underline">Developer Mode</Link> &gt; Jenis dark pattern
                    </p>
                    <h1 className="text-6xl font-bold mb-4 tracking-tight">Jenis Dark Pattern</h1>
                    <p className="text-lg text-gray-700 max-w-2xl">
                        Trik yang digunakan di situs web dan aplikasi yang membuat Anda melakukan hal-hal yang tidak diinginkan.
                    </p>
                </div>

                {/* --- LIST CONTENT (LOOPING) --- */}
                <div className="space-y-12">
                    {types.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12 border-b border-gray-200 last:border-none">
                            {/* Judul (Kiri) */}
                            <div className="md:col-span-5">
                                <h2 className="text-3xl font-bold text-yellow-400 opacity-90">{item.title}</h2>
                            </div>
                            {/* Deskripsi (Kanan) */}
                            <div className="md:col-span-7">
                                <p className="text-gray-800 leading-relaxed text-lg">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-yellow-400 py-16 w-full mt-20">
                <div className="max-w-7xl mx-auto px-10 text-center">
                    <h2 className="font-bold text-lg mb-8 text-black">Dark Pattern</h2>
                    <div className="flex justify-center space-x-8 mb-8 font-medium text-black">
                        <Link href="/developer-mode" className="hover:underline">guideline</Link>
                        <Link href="/types" className="hover:underline">type</Link>
                        <Link href="/" className="hover:underline">home</Link>
                    </div>
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