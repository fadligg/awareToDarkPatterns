<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DarkPattern;

class DarkPatternSeeder extends Seeder
{
    public function run(): void
    {
        $patterns = [
            ['title' => 'Comparison Prevention', 'description' => 'Pengguna kesulitan membandingkan produk karena fitur dan harga disajikan dengan cara yang rumit.'],
            ['title' => 'Confirmshaming', 'description' => 'Pengguna dimanipulasi secara emosional atau dibuat merasa bersalah agar melakukan sesuatu.'],
            ['title' => 'Disguised Ads', 'description' => 'Iklan yang disamarkan sebagai elemen antarmuka atau konten asli.'],
            ['title' => 'Fake Scarcity', 'description' => 'Menciptakan kelangkaan palsu untuk mendesak pengguna segera membeli.'],
            ['title' => 'Fake Social Proof', 'description' => 'Testimoni atau aktivitas palsu untuk menipu pengguna agar percaya produk itu populer.'],
            ['title' => 'Fake Urgency', 'description' => 'Memberikan batasan waktu palsu (timer) untuk mendorong keputusan impulsif.'],
            ['title' => 'Forced Action', 'description' => 'Memaksa pengguna melakukan tindakan yang tidak diinginkan sebagai syarat.'],
            ['title' => 'Hard to Cancel', 'description' => 'Mudah mendaftar tapi sangat sulit untuk berhenti berlangganan (Roach Motel).'],
            ['title' => 'Hidden Costs', 'description' => 'Biaya tambahan yang baru muncul di langkah terakhir pembayaran.'],
            ['title' => 'Hidden Subscription', 'description' => 'Biaya langganan berulang yang tidak disadari pengguna.'],
            ['title' => 'Nagging', 'description' => 'Gangguan terus-menerus berupa notifikasi atau pop-up.'],
            ['title' => 'Obstruction', 'description' => 'Menciptakan hambatan agar pengguna sulit menyelesaikan tugas tertentu.'],
            ['title' => 'Preselection', 'description' => 'Opsi default yang sudah terpilih otomatis untuk menguntungkan bisnis.'],
            ['title' => 'Sneaking', 'description' => 'Memasukkan item tambahan ke keranjang belanja tanpa persetujuan jelas.'],
            ['title' => 'Trick Wording', 'description' => 'Bahasa yang membingungkan atau menipu untuk menyesatkan pengguna.'],
            ['title' => 'Visual Interference', 'description' => 'Memanipulasi tampilan visual untuk menyembunyikan informasi penting.'],
        ];

        foreach ($patterns as $pattern) {
            DarkPattern::create($pattern);
        }
    }
}