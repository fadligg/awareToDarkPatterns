// resources/js/Pages/DarkPatternDetail.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function DarkPatternDetail({ pattern }) {
    const { auth } = usePage().props;

    // --- 1. DATA HARDCODED LENGKAP (16 JENIS) ---
    const detailsMap = {
        1: { // Comparison Prevention
            definition: "Taktik desain yang secara sengaja mengaburkan informasi harga, format produk, atau detail penting lainnya sehingga pengguna kesulitan membandingkan produk atau layanan secara objektif.",
            example: "Operator seluler menampilkan paket data dengan satuan yang berbeda-beda (misal: Paket A 'per hari', Paket B 'per bulan') sehingga pengguna pusing menghitung mana yang lebih murah.",
            legal: "Melanggar prinsip transparansi dalam UU Perlindungan Konsumen. Konsumen berhak mendapatkan informasi yang jelas dan jujur mengenai kondisi dan jaminan barang dan/atau jasa.",
            guidelines: "Selalu gunakan satuan unit yang standar (misal: harga per item/per bulan) untuk semua produk sejenis. Sediakan fitur perbandingan (comparison tool) yang jujur.",
            image: "/img/type/Price-comparison.png"
        },
        2: { // Confirmshaming
            definition: "Menggunakan bahasa yang menimbulkan rasa bersalah (guilt-inducing language) atau desain emosional untuk menekan pengguna agar tidak menolak tawaran atau berhenti berlangganan.",
            example: "Pada gambar contoh, tombol penolakan menggunakan kalimat merendahkan: 'No, I don't care which is best' (Tidak, saya tidak peduli mana yang terbaik), seolah-olah pengguna bodoh jika tidak mengklik tombol oranye 'Find Out Now'.",
            legal: "Praktik ini dianggap tidak etis dan berpotensi melanggar hak konsumen untuk memilih secara bebas tanpa tekanan psikologis.",
            guidelines: "Ganti kalimat manipulatif dengan bahasa netral. Cukup gunakan 'No, thanks' atau 'Skip' tanpa tambahan kalimat yang menyerang ego pengguna.",
            image: "/img/type/confirmshaming.png"
        },
        3: { // Disguised Ads
            definition: "Iklan yang disamarkan seolah-olah menjadi elemen antarmuka atau konten asli (native content), menipu pengguna agar mengkliknya karena mengira itu adalah fitur aplikasi.",
            example: "Dalam gambar contoh, tombol hijau besar 'DOWNLOAD NOW' dan merah 'PLAY NOW' sebenarnya adalah iklan. Tombol download yang asli justru yang kecil berwarna biru di atasnya. Ini mengecoh pengguna untuk mengklik iklan.",
            legal: "Merupakan bentuk penipuan visual. Regulasi iklan digital mengharuskan adanya label 'Iklan' atau 'Sponsored' yang jelas.",
            guidelines: "Pisahkan area konten dan area iklan dengan jelas. Jangan mendesain tombol iklan (CTA) dengan warna dan bentuk yang identik dengan navigasi utama situs.",
            image: "/img/type/disguised ads.png"
        },
        4: { // Fake Scarcity
            definition: "Menanamkan persepsi kelangkaan palsu mengenai suatu produk untuk memicu FOMO (Fear Of Missing Out) dan memaksa pengguna membeli segera.",
            example: "Situs hotel menampilkan pesan merah mencolok 'In high demand! We have 1 left' dan '85% booked!' untuk membuat pengguna panik dan segera memesan karena takut kehabisan kamar, padahal stok mungkin masih tersedia.",
            legal: "Jika kelangkaan itu bohong, ini adalah klaim yang menyesatkan (misleading claim) dan dilarang dalam hukum perlindungan konsumen.",
            guidelines: "Tampilkan data stok hanya jika benar-benar akurat. Jangan gunakan pesan 'Tersisa 1' secara otomatis jika kenyataannya kamar masih banyak.",
            image: "/img/type/fake scarcity.png"
        },
        5: { // Fake Social Proof
            definition: "Memanipulasi pengguna agar percaya bahwa produk tersebut sangat populer dengan menampilkan aktivitas, testimoni, atau angka statistik palsu.",
            example: "Muncul notifikasi pop-up yang mengklaim 'Someone Awesome' dari United States baru saja mendaftar webinar. Penggunaan nama anonim dan lokasi umum seringkali menandakan ini adalah bot, bukan aktivitas manusia nyata.",
            legal: "Memalsukan testimoni atau data statistik penjualan adalah bentuk penipuan dan manipulasi informasi publik.",
            guidelines: "Gunakan bukti sosial yang asli dan transparan (misal: nama depan asli dengan izin). Jangan gunakan skrip otomatis untuk memalsukan pendaftar.",
            image: "/img/type/fake social proof.jpg"
        },
        6: { // Fake Urgency
            definition: "Menciptakan tekanan waktu buatan (artificial time pressure) untuk mendorong keputusan impulsif.",
            example: "Menampilkan hitung mundur (countdown) berwarna merah '58:11:87' untuk diskon seumur hidup. Timer ini seringkali palsu dan akan berulang (reset) jika halaman dimuat ulang, tujuannya hanya memburu-buru pembeli.",
            legal: "Memberikan informasi palsu mengenai batas waktu penawaran melanggar etika periklanan dan hak konsumen atas informasi yang benar.",
            guidelines: "Hapus timer jika penawaran berlaku jangka panjang. Timer hanya boleh digunakan untuk deadline yang benar-benar nyata (misal: flash sale 1 jam).",
            image: "/img/type/fake urgency.png"
        },
        7: { // Forced Action
            definition: "Mengharuskan pengguna melakukan tindakan yang tidak relevan dengan tujuan utama mereka sebagai syarat untuk melanjutkan proses.",
            example: "Seperti pada gambar X (Twitter), pengguna dipaksa untuk 'Log in' atau 'Sign up' melalui pop-up yang tidak bisa ditutup hanya untuk membaca balasan postingan, menghalangi akses ke konten publik.",
            legal: "Memaksa konsumen menyerahkan data pribadi yang tidak relevan dapat melanggar prinsip minimisasi data dalam perlindungan data pribadi (PDP).",
            guidelines: "Izinkan 'Guest View' untuk konten publik. Jangan memblokir layar sepenuhnya (walling) untuk memaksa pendaftaran jika tidak benar-benar diperlukan.",
            image: "/img/type/forced action.png"
        },
        8: { // Hard to Cancel (Roach Motel)
            definition: "Sangat mudah untuk mendaftar/masuk, tetapi proses untuk keluar atau membatalkan layanan dibuat sangat sulit dan berbelit-belit.",
            example: "Proses pembatalan yang berbelit-belit: Pengguna dipaksa mengisi survei alasan, ditakut-takuti dengan fitur yang akan hilang (Loss Aversion), dan harus melakukan konfirmasi berulang kali sebelum langganan benar-benar berhenti.",
            legal: "Mempersulit pembatalan secara tidak wajar melanggar hak konsumen untuk mengakhiri kontrak layanan.",
            guidelines: "Sederhanakan alur pembatalan menjadi maksimal 2 langkah. Jangan paksa pengguna mengisi survei atau menakut-nakuti mereka secara berlebihan.",
            image: "/img/type/hardToCancel.png"    
        },
        9: { // Hidden Costs
            definition: "Biaya tambahan (pajak, admin, asuransi) yang disembunyikan di awal dan baru dimunculkan di tahap paling akhir pembayaran (checkout).",
            example: "Pada ringkasan pesanan, pengguna dikejutkan dengan 'Service Fees' sebesar $0.90 yang muncul tiba-tiba di akhir, membuat total harga naik dari $4.00 menjadi $4.90.",
            legal: "Melanggar prinsip transparansi harga. Konsumen berhak mengetahui total harga yang harus dibayar sejak awal.",
            guidelines: "Tampilkan 'Total Estimasi' termasuk pajak dan biaya layanan di keranjang belanja awal. Jangan sembunyikan komponen biaya hingga langkah terakhir.",
            image: "/img/type/Hidden Cost.png"
        },
        10: { // Hidden Subscription
            definition: "Mengenakan biaya berulang (langganan) tanpa persetujuan yang jelas dari pengguna, seringkali bersembunyi di balik 'Uji Coba Gratis' atau hadiah.",
            example: "Menawarkan 'Free Gift' (Hadiah Gratis) di keranjang belanja. Pengguna sering tidak sadar bahwa dengan mengklik 'SELECT', mereka sebenarnya menyetujui langganan berbayar yang akan ditagih setelah masa trial hadiah tersebut habis.",
            legal: "Penagihan tanpa persetujuan eksplisit (informed consent) adalah ilegal. Syarat perpanjangan otomatis harus diinformasikan dengan sangat jelas.",
            guidelines: "Berikan keterangan jelas 'Berlangganan Berbayar setelah Trial' di dekat tombol ambil hadiah. Jangan gunakan kata 'Free' untuk menjebak langganan.",
            image: "/img/type/Hidden Subscription.jpg"
        },
        11: { // Nagging
            definition: "Gangguan terus-menerus berupa notifikasi, pop-up, atau permintaan yang menginterupsi fokus pengguna.",
            example: "Aplikasi TikTok terus-menerus memunculkan pop-up 'Find contacts' saat dibuka, mendesak pengguna menyalakan sinkronisasi kontak meskipun pengguna mungkin sudah menolaknya sebelumnya.",
            legal: "Meskipun mungkin tidak ilegal secara spesifik, ini adalah desain buruk yang mengganggu kenyamanan penggunaan layanan.",
            guidelines: "Hormati keputusan 'Don't allow'. Jika pengguna menolak, jangan tampilkan pop-up yang sama berulang kali dalam waktu dekat.",
            image: "/img/type/Nagging.jpg"
        },
        12: { // Obstruction
            definition: "Sengaja menciptakan hambatan atau rintangan dalam alur pengguna untuk mencegah mereka melakukan tindakan tertentu (biasanya penghapusan akun atau pembatalan).",
            example: "Seperti pada gambar contoh Zoom: Saat pengguna ingin membatalkan, mereka dihadang (obstructed) dengan pop-up tawaran diskon 50%. Tombol 'Yes, Take Offer' dibuat biru mencolok, sementara tombol 'No thanks' (untuk lanjut batal) dibuat putih dan kurang terlihat, perubahan posisi tombol 'Accept' juga membingungkan dan dapat membuat pengguna menekan tombol yang salah.",
            legal: "Menghalang-halangi hak pengguna untuk berhenti berlangganan dapat dianggap sebagai praktik perdagangan yang tidak adil.",
            guidelines: "Jangan mempersulit jalan keluar. Jika pengguna ingin batal, berikan jalan yang mulus tanpa hadangan tawaran (dark patterns) yang agresif. Tombol batal harus jelas terlihat.",
            image: "/img/type/Obstruction.png"
        },
        13: { // Preselection
            definition: "Menetapkan opsi default yang menguntungkan bisnis (biasanya opsi mahal atau setuju data) tanpa input aktif pengguna.",
            example: "Pada gambar contoh, kotak 'Clearly Shipping Protection' seharga £2.95 sudah tercentang otomatis (default). Pengguna yang terburu-buru akan membayar biaya asuransi ini tanpa menyadarinya.",
            legal: "Di banyak yurisdiksi (termasuk GDPR), persetujuan harus bersifat aktif (opt-in). Centang otomatis (pre-ticked boxes) untuk layanan berbayar tambahan seringkali dianggap ilegal.",
            guidelines: "Semua kotak pilihan tambahan (add-on) harus dalam keadaan kosong (unchecked). Biarkan pengguna yang memutuskan secara sadar untuk mencentangnya.",
            image: "/img/type/Preselection.jpg"
        },
        14: { // Sneaking
            definition: "Memasukkan item tambahan ke keranjang belanja pengguna secara diam-diam tanpa pemberitahuan jelas.",
            example: "Di halaman 'Review basket', tiba-tiba muncul biaya 'Restoration Levy' sebesar £2 atau donasi yang mungkin 'diselundupkan' ke dalam total tagihan tanpa persetujuan eksplisit pengguna di halaman sebelumnya.",
            legal: "Ini adalah bentuk penjualan paksa (inertia selling). Menambahkan barang ke keranjang tanpa aksi pengguna bisa dianggap penipuan transaksi.",
            guidelines: "Keranjang belanja harus bersih. Jangan pernah menambahkan item atau donasi secara otomatis. Gunakan fitur 'Saran' atau 'Rekomendasi' di luar keranjang jika ingin menawarkan tambahan.",
            image: "/img/type/Sneaking.png"
        },
        15: { // Trick Wording
            definition: "Menggunakan bahasa yang membingungkan, berbelit-belit, atau pola kalimat yang tidak konsisten untuk menipu pemahaman pengguna.",
            example: "Lihat gambar contoh: Kotak pertama menggunakan kalimat negatif 'I do not wish...' (Saya TIDAK ingin...), sedangkan kotak kedua menggunakan kalimat positif 'I wish to...' (Saya ingin...). Ketidakkonsistenan ini dirancang agar pengguna salah membaca dan tidak sengaja menyetujui tawaran.",
            legal: "Informasi harus disampaikan dengan bahasa yang jelas dan sederhana (Plain Language). Kalimat yang membingungkan melanggar hak atas informasi yang benar.",
            guidelines: "Gunakan kalimat positif dan langsung. Contoh: 'Saya ingin menerima email promo'. Hindari penggunaan kata negatif ganda (double negatives) yang membingungkan.",
            image: "/img/type/Trick Wording 2.png"
        },
        16: { // Visual Interference
            definition: "Memanipulasi tampilan visual (warna, ukuran, letak) untuk menyembunyikan informasi penting atau mengarahkan fokus ke opsi yang menguntungkan bisnis.",
            example: "Pada antarmuka 'Upgrades' (seperti contoh Tesla), opsi mahal 'Full Self-Driving' ($4,000) ditampilkan dengan kotak centang yang menyatu dengan desain gelap, dan tombol pembayaran dibuat sangat menonjol, mengalihkan fokus dari detail biaya atau syarat lainnya.",
            legal: "Menyembunyikan informasi material (biaya, syarat) dengan desain visual yang mengaburkan bisa dianggap penyesatan (misleading omission).",
            guidelines: "Gunakan hierarki visual yang jujur. Informasi harga dan opsi untuk membatalkan/menutup harus memiliki kontras dan visibilitas yang setara dengan tombol beli.",
            image: "/img/type/Visual Interference.png"
        }
    };

    // Ambil data sesuai ID pola yang sedang dibuka
    const content = detailsMap[pattern.id] || {
        definition: "Definisi untuk pola ini belum ditambahkan.",
        example: "Contoh belum tersedia.",
        legal: "Informasi hukum belum tersedia.",
        guidelines: "Panduan belum tersedia."
    };

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
            <Head title={pattern.title} />

            {/* --- NAVBAR KONSISTEN --- */}
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
                
                {/* 1. BREADCRUMB & HEADER */}
                <div className="mb-16">
                    <p className="text-yellow-500 text-sm mb-4 font-medium">
                        <Link href="/" className="hover:underline">Home</Link> &gt; 
                        <Link href="/developer-mode" className="hover:underline ml-1">Developer Mode</Link> &gt; 
                        <Link href="/types" className="hover:underline ml-1">Jenis Dark Pattern</Link> &gt; 
                        <span className="ml-1 text-gray-400">{pattern.title}</span>
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900">
                        {pattern.title}
                    </h1>
                    {/* Deskripsi singkat dari Database */}
                    <p className="text-lg text-gray-500 max-w-3xl">
                        {pattern.description}
                    </p>
                </div>

                {/* 2. DEFINISI SECTION */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 border-t border-gray-100 pt-10">
                    <div className="md:col-span-4">
                        <h2 className="text-3xl font-bold">Definisi</h2>
                    </div>
                    <div className="md:col-span-8">
                        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                            {content.definition}
                        </p>
                    </div>
                </section>

                {/* 3. CONTOH SECTION */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 border-t border-gray-100 pt-10">
                    <div className="md:col-span-4">
                        <h2 className="text-3xl font-bold">Contoh</h2>
                    </div>
                    <div className="md:col-span-8">
                        <p className="text-gray-700 leading-relaxed text-lg mb-6 whitespace-pre-line">
                            {content.example}
                        </p>
                        
                        {/* --- TAMPILKAN GAMBAR --- */}
                        {content.image ? (
                            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                                <img 
                                    src={content.image} 
                                    alt={`Contoh ${pattern.title}`} 
                                    className="w-full h-auto object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = 'https://placehold.co/600x400?text=Gambar+Tidak+Ditemukan'; // Fallback jika gambar rusak
                                    }}
                                />
                            </div>
                        ) : (
                            // Fallback jika properti image tidak ada di data
                            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-mono">
                                [Gambar Belum Tersedia]
                            </div>
                        )}
                    </div>
                </section>

                {/* 4. KESINAMBUNGAN HUKUM */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 border-t border-gray-100 pt-10">
                    <div className="md:col-span-4">
                        <h2 className="text-3xl font-bold leading-tight">
                            Kesinambungan dengan aturan di Indonesia
                        </h2>
                    </div>
                    <div className="md:col-span-8">
                        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                            {content.legal}
                        </p>
                    </div>
                </section>

                {/* 5. PANDUAN PENGEMBANGAN */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 border-t border-gray-100 pt-10">
                    <div className="md:col-span-4">
                        <h2 className="text-3xl font-bold leading-tight">
                            Panduan pengembangan
                        </h2>
                    </div>
                    <div className="md:col-span-8">
                        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                            {content.guidelines}
                        </p>
                    </div>
                </section>

                {/* 6. CONTOH LAGI (Footer Example) - Opsi jika ingin ada lebih banyak gambar */}
                {/* <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 border-t border-gray-100 pt-10">
                    <div className="md:col-span-4">
                        <h2 className="text-3xl font-bold">Contoh Visual Lain</h2>
                    </div>
                    <div className="md:col-span-8">
                          <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center text-gray-400">
                            Additional Image Placeholder
                        </div>
                    </div>
                </section>
                */}

                <div className="mb-8 mt-16">
                    <Link href="/types" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-black transition group">
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-yellow-400 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </span>
                        Kembali ke Jenis Dark Pattern
                    </Link>
                </div>
            </main>

            {/* --- FOOTER KUNING --- */}
            <footer className="w-full h-48 bg-yellow-400 mt-20 flex items-center justify-center">
                <div className="text-center text-black">
                    <p className="font-bold text-lg mb-2">Dark Pattern Awareness</p>
                    <p className="text-sm opacity-80">&copy; 2025 User Protection Initiative.</p>
                </div>
            </footer>
        </div>
    );
}