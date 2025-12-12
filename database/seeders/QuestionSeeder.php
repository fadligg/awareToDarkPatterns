<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            // 1. Comparison Prevention
            [
                'type' => 'Comparison Prevention',
                'question' => 'Situs belanja sengaja membuat Anda susah membandingkan harga per-satuan barang (misal: "3 apel Rp10rb" vs "1kg apel Rp25rb"). Ini disebut?',
                'options' => ['Comparison Prevention', 'Fake Scarcity', 'Hard to Cancel', 'Sneaking'],
                'answer' => 0
            ],
            // 2. Confirmshaming
            [
                'type' => 'Confirmshaming',
                'question' => 'Saat menolak tawaran newsletter, tombolnya bertuliskan: "Tidak, saya lebih suka menjadi orang bodoh". Taktik ini adalah:',
                'options' => ['Nagging', 'Confirmshaming', 'Forced Action', 'Visual Interference'],
                'answer' => 1
            ],
            // 3. Disguised Ads
            [
                'type' => 'Disguised Ads',
                'question' => 'Anda mengklik tombol "Download" yang besar, tapi ternyata itu adalah iklan aplikasi lain, bukan file yang Anda cari. Ini contoh dari:',
                'options' => ['Hidden Costs', 'Disguised Ads', 'Trick Wording', 'Sneaking'],
                'answer' => 1
            ],
            // 4. Fake Scarcity
            [
                'type' => 'Fake Scarcity',
                'question' => 'Website menampilkan pesan "Hanya tersisa 1 kamar lagi!" padahal sebenarnya stok masih banyak. Tujuannya agar Anda panik dan segera beli.',
                'options' => ['Fake Urgency', 'Social Proof', 'Fake Scarcity', 'Obstruction'],
                'answer' => 2
            ],
            // 5. Fake Social Proof
            [
                'type' => 'Fake Social Proof',
                'question' => 'Muncul notifikasi palsu "Budi dari Jakarta baru saja membeli produk ini" untuk meyakinkan Anda bahwa produk ini populer.',
                'options' => ['Fake Social Proof', 'Comparison Prevention', 'Preselection', 'Nagging'],
                'answer' => 0
            ],
            // 6. Fake Urgency
            [
                'type' => 'Fake Urgency',
                'question' => 'Ada hitung mundur (timer) "Diskon berakhir dalam 5 menit!" yang terus berulang setiap kali halaman di-refresh.',
                'options' => ['Forced Action', 'Fake Urgency', 'Hidden Subscription', 'Roach Motel'],
                'answer' => 1
            ],
            // 7. Forced Action
            [
                'type' => 'Forced Action',
                'question' => 'Anda ingin membaca artikel berita, tapi website memaksa Anda mendaftar akun atau berlangganan newsletter terlebih dahulu.',
                'options' => ['Sneaking', 'Obstruction', 'Forced Action', 'Hard to Cancel'],
                'answer' => 2
            ],
            // 8. Hard to Cancel (Roach Motel)
            [
                'type' => 'Hard to Cancel',
                'question' => 'Mendaftar layanan premium sangat mudah (1 klik), tapi untuk berhenti berlangganan Anda harus menelepon CS atau mengirim surat fisik.',
                'options' => ['Roach Motel / Hard to Cancel', 'Preselection', 'Disguised Ads', 'Visual Interference'],
                'answer' => 0
            ],
            // 9. Hidden Costs
            [
                'type' => 'Hidden Costs',
                'question' => 'Harga tiket pesawat terlihat murah di awal, tapi saat checkout tiba-tiba muncul biaya admin, biaya bagasi, dan pajak yang tidak disebutkan sebelumnya.',
                'options' => ['Hidden Costs', 'Nagging', 'Trick Wording', 'Confirmshaming'],
                'answer' => 0
            ],
            // 10. Hidden Subscription
            [
                'type' => 'Hidden Subscription',
                'question' => 'Anda membeli produk sekali bayar, tapi tanpa sadar kartu kredit Anda didebit setiap bulan karena ada syarat langganan tersembunyi.',
                'options' => ['Fake Scarcity', 'Hidden Subscription', 'Comparison Prevention', 'Forced Action'],
                'answer' => 1
            ],
            // 11. Nagging
            [
                'type' => 'Nagging',
                'question' => 'Aplikasi terus-menerus meminta izin notifikasi atau lokasi setiap kali dibuka, meskipun Anda sudah menolak berkali-kali.',
                'options' => ['Obstruction', 'Nagging', 'Sneaking', 'Preselection'],
                'answer' => 1
            ],
            // 12. Obstruction
            [
                'type' => 'Obstruction',
                'question' => 'Anda ingin menghapus akun, tapi menu hapus akun disembunyikan jauh di dalam pengaturan yang berlapis-lapis dan membingungkan.',
                'options' => ['Fake Social Proof', 'Obstruction', 'Trick Wording', 'Disguised Ads'],
                'answer' => 1
            ],
            // 13. Preselection
            [
                'type' => 'Preselection',
                'question' => 'Kotak centang "Daftarkan saya ke newsletter" sudah tercentang secara otomatis (default) saat Anda mengisi formulir.',
                'options' => ['Preselection', 'Visual Interference', 'Hard to Cancel', 'Fake Urgency'],
                'answer' => 0
            ],
            // 14. Sneaking
            [
                'type' => 'Sneaking',
                'question' => 'Saat belanja online, tiba-tiba ada asuransi tambahan atau donasi masuk ke keranjang belanja Anda tanpa Anda klik sebelumnya.',
                'options' => ['Sneaking', 'Comparison Prevention', 'Nagging', 'Confirmshaming'],
                'answer' => 0
            ],
            // 15. Trick Wording
            [
                'type' => 'Trick Wording',
                'question' => 'Kalimatnya membingungkan: "Jangan centang kotak ini jika Anda tidak ingin tidak berlangganan".',
                'options' => ['Visual Interference', 'Trick Wording', 'Fake Scarcity', 'Hidden Costs'],
                'answer' => 1
            ],
            // 16. Visual Interference
            [
                'type' => 'Visual Interference',
                'question' => 'Tombol "Batalkan" dibuat abu-abu kecil transparan, sedangkan tombol "Lanjut Berlangganan" dibuat hijau besar menyala agar Anda salah klik.',
                'options' => ['Disguised Ads', 'Visual Interference', 'Forced Action', 'Obstruction'],
                'answer' => 1
            ],
        ];

        foreach ($questions as $q) {
            Question::create($q);
        }
    }
}