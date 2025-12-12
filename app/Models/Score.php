<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    // Izinkan kolom ini diisi
    protected $fillable = ['user_id', 'score'];

    // Relasi: Satu skor milik satu User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}