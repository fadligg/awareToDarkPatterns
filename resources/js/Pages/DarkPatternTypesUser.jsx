import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

// --- KOMPONEN SIMULASI INTERAKTIF LENGKAP (16 JENIS) ---
const PatternSimulation = ({ typeId }) => {
    const [mode, setMode] = useState('dark'); // 'dark' | 'ethical'
    const [isChecked, setIsChecked] = useState(true); // State umum untuk checkbox
    const [cartTotal, setCartTotal] = useState(500000); // State untuk Hidden Costs/Sneaking

    // Reset state saat mode berubah
    useEffect(() => {
        if (mode === 'ethical') {
            setIsChecked(false);
            setCartTotal(500000); 
        }
        if (mode === 'dark') {
            setIsChecked(true);
            // Khusus Hidden Cost & Sneaking
            if (typeId === 9) setCartTotal(500000); 
            if (typeId === 14) setCartTotal(550000); 
        }
    }, [mode, typeId]);

    // RENDER KONTEN SIMULASI
    const renderContent = () => {
        switch (typeId) {
            case 1: // COMPARISON PREVENTION
                return (
                    <div className="bg-white p-4 rounded border shadow-sm">
                        <h4 className="font-bold mb-3 border-b pb-2">Pilih Paket Apel</h4>
                        <div className="flex gap-2">
                            <div className="border p-2 rounded flex-1 text-center bg-gray-50">
                                <div className="font-bold">Paket A</div>
                                <div className="text-sm">Rp 25.000</div>
                                <div className="text-xs text-gray-500 font-bold">per 500 gram</div>
                            </div>
                            <div className="border p-2 rounded flex-1 text-center bg-yellow-50 border-yellow-200">
                                <div className="font-bold">Paket B</div>
                                {mode === 'dark' ? (
                                    <>
                                        <div className="text-sm">Rp 45.000</div>
                                        <div className="text-xs text-red-500 font-bold">per kantong (isi ??)</div>
                                        <p className="text-[10px] mt-1 text-red-400">Sulit dibandingkan!</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-sm">Rp 45.000</div>
                                        <div className="text-xs text-green-600 font-bold">per 1 kg</div>
                                        <p className="text-[10px] mt-1 text-green-600">Mudah dihitung (A=50rb/kg)</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 2: // CONFIRMSHAMING
                return (
                    <div className="bg-white p-6 rounded border shadow-sm text-center">
                        <h4 className="font-bold text-lg mb-4">Mau eBook Gratis?</h4>
                        <button className="w-full bg-blue-600 text-white py-2 rounded font-bold mb-3">YA! Kirimkan ke saya</button>
                        {mode === 'dark' ? (
                            <button className="text-xs text-gray-400 underline hover:text-red-500">
                                Tidak, saya lebih suka tetap bodoh dan miskin
                            </button>
                        ) : (
                            <button className="text-sm text-gray-500 hover:text-gray-800">
                                Tidak, terima kasih
                            </button>
                        )}
                    </div>
                );
            case 3: // DISGUISED ADS
                return (
                    <div className="bg-white p-6 rounded border shadow-sm text-center relative">
                        <h4 className="font-bold text-gray-700 mb-4">File Siap Diunduh</h4>
                        {mode === 'dark' ? (
                            <div className="flex flex-col gap-2">
                                <button className="bg-green-500 text-white text-xl font-bold py-3 rounded shadow-md border-b-4 border-green-700 flex justify-center items-center gap-2">
                                    ⬇️ START DOWNLOAD <span className="text-[8px] bg-white/30 px-1 rounded">Ad</span>
                                </button>
                                <button className="text-xs text-blue-500 underline mt-2">Link download server 1 (Asli)</button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <button className="bg-blue-600 text-white py-2 rounded font-bold">Download File (5MB)</button>
                                <div className="bg-gray-100 border border-dashed border-gray-300 p-2 text-xs text-gray-400">Area Iklan Terpisah</div>
                            </div>
                        )}
                    </div>
                );
            case 4: // FAKE SCARCITY
                return (
                    <div className="bg-white p-4 rounded border shadow-sm">
                        <div className="flex gap-4">
                            <div className="w-20 h-20 bg-gray-200 rounded"></div>
                            <div className="flex-1">
                                <h4 className="font-bold">Hotel Mewah Bali</h4>
                                {mode === 'dark' ? (
                                    <div className="mt-2 text-red-600 font-bold text-sm bg-red-50 p-1 rounded inline-block animate-pulse">
                                        🔥 Hanya tersisa 1 kamar!
                                    </div>
                                ) : (
                                    <div className="mt-2 text-gray-600 text-sm bg-gray-50 p-1 rounded inline-block">
                                        ✅ Tersisa 5 kamar
                                    </div>
                                )}
                                <button className="block mt-2 bg-blue-600 text-white text-xs px-3 py-1 rounded">Pesan</button>
                            </div>
                        </div>
                    </div>
                );
            case 5: // FAKE SOCIAL PROOF
                return (
                    <div className="bg-white p-4 rounded border shadow-sm relative h-40 flex items-center justify-center">
                        <h4 className="text-gray-400">Halaman Produk...</h4>
                        {mode === 'dark' ? (
                            <div className="absolute bottom-4 left-4 bg-white border border-gray-200 shadow-lg p-3 rounded-lg flex gap-3 animate-bounce">
                                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">👤</div>
                                <div>
                                    <p className="text-xs font-bold">Someone from Jogja</p>
                                    <p className="text-[10px] text-gray-500">Baru saja membeli ini</p>
                                </div>
                            </div>
                        ) : (
                            <div className="absolute bottom-2 w-full text-center text-xs text-gray-400">
                                (Tidak ada notifikasi palsu yang mengganggu)
                            </div>
                        )}
                    </div>
                );
            case 6: // FAKE URGENCY
                return (
                    <div className="bg-white p-5 rounded border shadow-sm text-center">
                        <h4 className="font-bold text-gray-800">Promo Spesial</h4>
                        {mode === 'dark' ? (
                            <div className="my-3 bg-red-600 text-white py-2 rounded font-mono font-bold text-xl">
                                00 : 04 : 59
                                <div className="text-[10px] font-sans font-normal opacity-80 mt-1">Diskon hangus sebentar lagi! (Reset jika refresh)</div>
                            </div>
                        ) : (
                            <div className="my-3 bg-gray-100 text-gray-600 py-2 rounded text-sm">
                                Promo berlaku hingga 30 Des 2025
                            </div>
                        )}
                        <button className="w-full bg-black text-white py-2 rounded font-bold">Beli Sekarang</button>
                    </div>
                );
            case 7: // FORCED ACTION
                return (
                    <div className="bg-white p-4 rounded border shadow-sm relative overflow-hidden h-48">
                        <h4 className="font-bold text-lg">Artikel Menarik</h4>
                        <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        {mode === 'dark' && (
                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center">
                                <p className="text-white font-bold mb-3">Daftar Newsletter untuk lanjut baca!</p>
                                <input type="email" placeholder="Email Anda" className="p-2 rounded text-sm mb-2 w-full" />
                                <button className="bg-yellow-400 text-black px-4 py-1 rounded font-bold w-full">Daftar & Baca</button>
                                <button className="text-gray-400 text-xs mt-2 underline">Tidak ada tombol tutup</button>
                            </div>
                        )}
                        {mode === 'ethical' && (
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white/90 to-transparent pt-10 text-center pb-2">
                                <button className="bg-blue-600 text-white px-4 py-1 rounded shadow text-sm">Baca Selengkapnya (Tanpa Login)</button>
                            </div>
                        )}
                    </div>
                );
            case 8: // HARD TO CANCEL
                return (
                    <div className="bg-white p-4 rounded border shadow-sm">
                        <h4 className="font-bold border-b pb-2 mb-2">Pengaturan Akun</h4>
                        {mode === 'dark' ? (
                            <div className="text-sm">
                                <p>Ingin berhenti langganan?</p>
                                <p className="text-gray-500 text-xs mt-1">Silakan hubungi Customer Service kami di 021-XXX pada hari kerja (09.00 - 10.00) atau kirim surat tertulis ke kantor pusat.</p>
                                <button className="mt-3 text-xs text-gray-300 cursor-not-allowed">Tombol Batal Tidak Tersedia</button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Status: Premium</span>
                                <button className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-bold border border-red-200 hover:bg-red-200">
                                    Batalkan Langganan
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 9: // HIDDEN COSTS
                return (
                    <div className="bg-white p-4 rounded border shadow-sm">
                        <h4 className="font-bold mb-3">Checkout</h4>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Harga Tiket</span>
                            <span>Rp 500.000</span>
                        </div>
                        {mode === 'dark' && (
                            <>
                                <div className="flex justify-between text-sm mb-1 text-red-600">
                                    <span>Biaya Layanan (Tiba-tiba)</span>
                                    <span>+ Rp 50.000</span>
                                </div>
                                <div className="flex justify-between text-sm mb-1 text-red-600">
                                    <span>Biaya Admin</span>
                                    <span>+ Rp 10.000</span>
                                </div>
                            </>
                        )}
                        <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
                            <span>Total</span>
                            <span>Rp {mode === 'dark' ? '560.000' : '500.000'}</span>
                        </div>
                        {mode === 'ethical' && <p className="text-xs text-green-600 mt-1">✅ Sudah termasuk pajak & biaya.</p>}
                        <button className="w-full mt-3 bg-black text-white py-2 rounded font-bold">Bayar</button>
                    </div>
                );
            case 10: // HIDDEN SUBSCRIPTION
                return (
                    <div className="bg-white p-5 rounded border shadow-sm text-center">
                        <h4 className="font-bold text-xl mb-2">Coba Premium Gratis!</h4>
                        <p className="text-sm text-gray-500 mb-4">Nikmati akses penuh selama 7 hari.</p>
                        <button className="w-full bg-yellow-400 text-black py-3 rounded font-bold shadow-md mb-2">
                            Mulai Gratis Sekarang
                        </button>
                        {mode === 'dark' ? (
                            <p className="text-[10px] text-gray-300 mt-2">
                                *Otomatis diperpanjang Rp 99.000/bulan setelah 7 hari. (Teks sangat kecil & samar)
                            </p>
                        ) : (
                            <p className="text-xs text-gray-600 mt-2 font-medium bg-gray-50 p-2 rounded">
                                ✅ Kami akan mengirim email pengingat 2 hari sebelum masa trial habis. Tidak ada tagihan kejutan.
                            </p>
                        )}
                    </div>
                );
            case 11: // NAGGING
                return (
                    <div className="bg-white p-4 rounded border shadow-sm relative h-48 flex items-center justify-center">
                         <div className="absolute inset-0 bg-gray-100 flex items-center justify-center p-4">
                            <div className="bg-white p-4 rounded shadow-xl border w-full text-center">
                                <h4 className="font-bold mb-2">Nyalakan Notifikasi?</h4>
                                <p className="text-xs text-gray-500 mb-3">Agar Anda tidak ketinggalan promo!</p>
                                <div className="flex gap-2 justify-center">
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Ya</button>
                                    {mode === 'dark' ? (
                                        <button className="text-blue-600 text-sm font-medium">Nanti Saja (Tanya lagi besok)</button>
                                    ) : (
                                        <button className="text-gray-500 text-sm border px-3 py-1 rounded hover:bg-gray-50">Jangan Tanya Lagi</button>
                                    )}
                                </div>
                            </div>
                         </div>
                    </div>
                );
            case 12: // OBSTRUCTION
                return (
                    <div className="bg-white p-5 rounded border shadow-sm text-center">
                        <h4 className="font-bold mb-4">Anda yakin ingin pergi?</h4>
                        {mode === 'dark' ? (
                            <div className="space-y-3">
                                <div className="bg-yellow-50 p-3 rounded text-sm border border-yellow-200">
                                    Tunggu! Kami punya diskon 50% khusus buat Anda!
                                </div>
                                <button className="w-full bg-blue-600 text-white py-2 rounded font-bold">
                                    AMBIL DISKON (BATAL KELUAR)
                                </button>
                                <button className="text-[10px] text-gray-300 hover:text-gray-500">
                                    lanjut hapus akun
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-sm text-gray-600 mb-4">Akun Anda akan dihapus permanen.</p>
                                <button className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700">
                                    Hapus Akun Saya
                                </button>
                                <button className="mt-3 text-sm text-gray-500 underline">Batal</button>
                            </div>
                        )}
                    </div>
                );
            case 13: // PRESELECTION
                return (
                    <div className="bg-white p-4 rounded border shadow-sm">
                        <div className="font-bold border-b pb-2 mb-2">Ringkasan Pesanan</div>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Produk</span>
                            <span>Rp 100.000</span>
                        </div>
                        <div className={`p-2 rounded border ${mode === 'dark' ? 'bg-red-50 border-red-200' : 'bg-white'}`}>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isChecked} 
                                    onChange={(e) => setIsChecked(e.target.checked)} 
                                />
                                <span className="text-sm font-bold">Donasi Pohon (+Rp 10.000)</span>
                            </label>
                            {mode === 'dark' && <p className="text-[10px] text-red-500 mt-1 ml-5">*Otomatis dicentang oleh sistem</p>}
                        </div>
                        <div className="mt-4 font-bold text-right">
                            Total: Rp {(100000 + (isChecked ? 10000 : 0)).toLocaleString('id-ID')}
                        </div>
                    </div>
                );
            case 14: // SNEAKING
                return (
                    <div className="bg-white p-4 rounded border shadow-sm">
                        <h4 className="font-bold border-b pb-2 mb-3">Keranjang Belanja</h4>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Sepatu Lari</span>
                            <span>Rp 500.000</span>
                        </div>
                        {mode === 'dark' && (
                            <div className="flex justify-between text-sm mb-2 text-red-600 bg-red-50 p-1 rounded animate-pulse">
                                <span>Kaos Kaki (Disisipkan!)</span>
                                <span>Rp 50.000</span>
                            </div>
                        )}
                         {mode === 'ethical' && (
                            <div className="text-xs text-gray-500 italic mt-4 mb-2">
                                Rekomendasi: Kaos kaki tersedia di bawah (Tidak masuk otomatis).
                            </div>
                        )}
                        <div className="border-t pt-2 font-bold text-right text-lg">
                            Total: Rp {cartTotal.toLocaleString('id-ID')}
                        </div>
                         <button className="w-full mt-3 bg-black text-white py-2 rounded font-bold">Checkout</button>
                    </div>
                );
            case 15: // TRICK WORDING
                return (
                    <div className="bg-white p-5 rounded border shadow-sm">
                        <h4 className="font-bold mb-3">Preferensi Email</h4>
                        <div className="flex items-start gap-2">
                            <input type="checkbox" className="mt-1" />
                            {mode === 'dark' ? (
                                <p className="text-sm text-gray-800 leading-tight">
                                    <span className="font-bold text-red-600">Jangan</span> centang kotak ini jika Anda <span className="font-bold text-red-600">tidak</span> ingin <span className="font-bold text-red-600">tidak</span> menerima tawaran menarik kami.
                                    <br/><span className="text-[10px] text-gray-400">(Bingung kan? Maksudnya: Centang = Gak dapet email)</span>
                                </p>
                            ) : (
                                <p className="text-sm text-gray-800">
                                    Centang kotak ini jika Anda ingin menerima email promo dari kami.
                                    <br/><span className="text-[10px] text-green-600 font-bold">(Jelas & Langsung)</span>
                                </p>
                            )}
                        </div>
                    </div>
                );
            case 16: // VISUAL INTERFERENCE
                return (
                    <div className="bg-white p-5 rounded border shadow-sm text-center">
                        <h4 className="font-bold text-lg mb-4">Upgrade ke PRO?</h4>
                        {mode === 'dark' ? (
                            <div className="flex flex-col gap-3">
                                <button className="w-full bg-green-500 text-white py-4 rounded-xl text-xl font-bold shadow-xl transform scale-105">
                                    UPGRADE SEKARANG 🚀
                                </button>
                                <button className="text-[10px] text-gray-300 hover:text-gray-500">
                                    tidak, terima kasih
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded font-bold hover:bg-gray-50">
                                    Tidak, Terima Kasih
                                </button>
                                <button className="flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
                                    Ya, Upgrade
                                </button>
                            </div>
                        )}
                    </div>
                );
            default:
                return <div className="p-4 text-center">Simulasi belum tersedia.</div>;
        }
    };

    return (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Simulasi Langsung</h3>
                <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                    <button
                        onClick={() => setMode('dark')}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1 ${
                            mode === 'dark' ? 'bg-red-100 text-red-600 shadow-sm' : 'text-gray-400 hover:bg-gray-50'
                        }`}
                    >
                        ❌ Dark Pattern
                    </button>
                    <button
                        onClick={() => setMode('ethical')}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1 ${
                            mode === 'ethical' ? 'bg-green-100 text-green-600 shadow-sm' : 'text-gray-400 hover:bg-gray-50'
                        }`}
                    >
                        ✅ Ethical
                    </button>
                </div>
            </div>
            
            {/* Render Area Simulasi */}
            {renderContent()}
        </div>
    );
};


export default function DarkPatternTypesUser() {
    const { auth } = usePage().props;

    // --- STATE NAVBAR & MODAL ---
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const isAutoScrolling = useRef(false);

    // STATE UNTUK MODAL
    const [selectedPattern, setSelectedPattern] = useState(null); // null = tutup, object = buka

    const controlNavbar = () => {
        if (isAutoScrolling.current) { setLastScrollY(window.scrollY); return; }
        if (window.scrollY > lastScrollY && window.scrollY > 100) { setShowNavbar(false); setIsMobileMenuOpen(false); setIsUserDropdownOpen(false); } 
        else { setShowNavbar(true); }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        if (selectedPattern) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            window.removeEventListener('scroll', controlNavbar);
            document.body.style.overflow = 'unset';
        };
    }, [lastScrollY, selectedPattern]);

    const handleNavClick = () => {
        isAutoScrolling.current = true;
        setShowNavbar(true);
        setIsMobileMenuOpen(false);
        setTimeout(() => isAutoScrolling.current = false, 1000);
    };

    // --- DATA USER LENGKAP (16 JENIS) ---
    const userTypes = [
        { id: 1, title: "Comparison Prevention", desc: "Dibuat pusing saat membandingkan harga.", detail: "Penjual sengaja menggunakan satuan yang berbeda (misal: harga per hari vs harga per bulan) agar Anda sulit menghitung mana yang lebih murah." },
        { id: 2, title: "Confirmshaming", desc: "Dibuat merasa bersalah jika menolak tawaran.", detail: "Menggunakan bahasa manipulatif seperti 'Tidak, saya ingin tetap miskin' pada tombol penolakan untuk menekan emosi Anda." },
        { id: 3, title: "Disguised Ads", desc: "Iklan menyamar jadi tombol 'Download'.", detail: "Tombol iklan didesain persis seperti tombol fungsi aplikasi (misal tombol 'Play' atau 'Download') untuk mengecoh klik Anda." },
        { id: 4, title: "Fake Scarcity", desc: "Ditakut-takuti 'Stok tinggal 1!' padahal banyak.", detail: "Menampilkan pesan stok menipis palsu untuk menciptakan kepanikan (FOMO) agar Anda segera membeli tanpa pikir panjang." },
        { id: 5, title: "Fake Social Proof", desc: "Testimoni palsu 'Budi baru saja membeli'.", detail: "Menggunakan notifikasi aktivitas palsu atau ulasan bot untuk membuat produk terlihat sangat populer dan terpercaya." },
        { id: 6, title: "Fake Urgency", desc: "Timer hitung mundur palsu yang menekan Anda.", detail: "Menampilkan jam hitung mundur diskon yang akan me-reset ulang jika halaman di-refresh. Tujuannya hanya memburu-buru Anda." },
        { id: 7, title: "Forced Action", desc: "Dipaksa daftar newsletter sebelum belanja.", detail: "Mengharuskan Anda melakukan tindakan yang tidak relevan (seperti share ke sosmed atau daftar email) untuk mengakses fitur utama." },
        { id: 8, title: "Hard to Cancel", desc: "Daftar gampang, berhenti dipersulit (Roach Motel).", detail: "Sangat mudah berlangganan, tapi tombol 'Unsubscribe' disembunyikan atau harus menelepon CS untuk berhenti." },
        { id: 9, title: "Hidden Costs", desc: "Biaya admin mahal muncul di akhir.", detail: "Menyembunyikan pajak, biaya layanan, atau pengiriman hingga langkah terakhir pembayaran (checkout)." },
        { id: 10, title: "Hidden Subscription", desc: "Tanpa sadar ikut langganan berbayar.", detail: "Biasanya bersembunyi di balik 'Uji Coba Gratis'. Jika lupa batal, kartu kredit otomatis didebet biaya langganan penuh." },
        { id: 11, title: "Nagging", desc: "Diganggu terus oleh pop-up notifikasi.", detail: "Gangguan terus-menerus meminta izin notifikasi atau rating tanpa opsi 'Jangan Tanya Lagi' yang jelas." },
        { id: 12, title: "Obstruction", desc: "Sengaja dikasih hambatan agar batal komplain.", detail: "Membuat alur (seperti hapus akun) menjadi sangat panjang dan membingungkan agar pengguna menyerah di tengah jalan." },
        { id: 13, title: "Preselection", desc: "Asuransi sudah tercentang otomatis.", detail: "Kotak pilihan tambahan (seperti donasi atau asuransi) sudah di-checklist secara default agar Anda tidak sengaja membelinya." },
        { id: 14, title: "Sneaking", desc: "Barang tambahan 'diselundupkan' ke keranjang.", detail: "Item ekstra (majalah, kaos kaki) dimasukkan diam-diam ke keranjang belanja tanpa persetujuan eksplisit Anda." },
        { id: 15, title: "Trick Wording", desc: "Kalimat membingungkan agar salah paham.", detail: "Menggunakan kalimat berbelit seperti 'Jangan centang jika Anda tidak ingin tidak berlangganan' untuk menipu logika Anda." },
        { id: 16, title: "Visual Interference", desc: "Tombol 'Batal' dibuat samar dan kecil.", detail: "Memanipulasi warna dan ukuran font untuk menyembunyikan informasi penting atau tombol yang tidak menguntungkan bisnis." }
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Head title="Jenis Jebakan (User Mode)" />

            {/* --- NAVBAR LENGKAP (User Mode) --- */}
            <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 px-6 md:px-10 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <div className="text-xl font-bold tracking-tight text-gray-900">Dark Pattern</div>
                    </Link>
                    
                    {/* MENU DESKTOP */}
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

                    {/* MENU MOBILE (HAMBURGER) */}
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

                {/* DROPDOWN MENU MOBILE */}
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

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-7xl mx-auto px-8 pb-20 pt-28">
                <div className="mb-16">
                    <p className="text-yellow-500 text-sm mb-4 font-medium">
                        <Link href="/" className="hover:underline">Home</Link> &gt; 
                        <Link href="/user-mode" className="hover:underline ml-1">User Mode</Link> &gt; 
                        <span className="ml-1 text-gray-400">Jenis Dark Pattern</span>
                    </p>
                    <h1 className="text-5xl font-bold mb-4 tracking-tight text-gray-900">
                        Kenali "Musuh" Anda
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Klik pada kartu di bawah ini untuk melihat <strong>Simulasi Interaktif</strong> cara kerja jebakan tersebut.
                    </p>
                </div>

                {/* --- GRID LIST --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTypes.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedPattern(item)} // KLIK MEMBUKA MODAL
                            className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-yellow-400 transition duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-yellow-400"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-black">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                            
                            <div className="relative z-10 mt-auto">
                                <span className="inline-flex items-center text-sm font-bold text-yellow-600 group-hover:text-black transition">
                                    Coba Simulasi <span className="ml-2 text-lg">🎮</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* TOMBOL KEMBALI KE USER MODE */}
                <div className="mb-8 mt-16">
                    <Link href="/user-mode" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-black transition group">
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-yellow-400 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </span>
                        Kembali ke User Mode
                    </Link>
                </div>

            </main>

            {/* --- MODAL POP-UP (FULL SCREEN OVERLAY) --- */}
            {selectedPattern && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedPattern(null)} // Klik luar untuk tutup
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-scale-up"
                        onClick={(e) => e.stopPropagation()} // Cegah klik dalam menutup modal
                    >
                        {/* Header Modal */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">{selectedPattern.title}</h2>
                            <button 
                                onClick={() => setSelectedPattern(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body Modal */}
                        <div className="p-8">
                            {/* 1. SIMULASI (PALING ATAS) */}
                            <PatternSimulation typeId={selectedPattern.id} />

                            {/* 2. PENJELASAN */}
                            <div className="mt-8">
                                <h3 className="font-bold text-gray-900 mb-2 text-lg">Apa yang terjadi?</h3>
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {selectedPattern.detail}
                                </p>
                            </div>

                            {/* 3. TIPS MENGHINDARI */}
                            <div className="mt-6 bg-yellow-50 p-5 rounded-xl border border-yellow-100 flex gap-4">
                                <div className="text-3xl">🛡️</div>
                                <div>
                                    <h4 className="font-bold text-yellow-900 mb-1">Tips Menghindar</h4>
                                    <p className="text-sm text-yellow-800">
                                        Selalu cek ulang sebelum klik tombol. Jangan terburu-buru oleh timer atau desakan palsu.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Modal */}
                        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-right">
                            <button 
                                onClick={() => setSelectedPattern(null)}
                                className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition"
                            >
                                Mengerti
                            </button>
                        </div>
                    </div>
                </div>
            )}

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