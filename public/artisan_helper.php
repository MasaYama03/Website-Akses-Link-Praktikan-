<?php

/**
 * LARAVEL ARTISAN RUNNER (CPANEL HELPER)
 * Taruh file ini di dalam folder 'public' proyek Anda.
 * Akses via: namadomain.com/artisan_helper.php?cmd=migrate
 */

use Illuminate\Support\Facades\Artisan;

// Kerangka standar Laravel
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

// Ambil perintah dari URL
$command = $_GET['cmd'] ?? null;

if (!$command) {
    die("Gunakan query parameter ?cmd=... (Contoh: ?cmd=migrate)");
}

echo "<h1>Artisan Runner</h1>";
echo "<p>Menjalankan perintah: <strong>php artisan $command</strong></p>";
echo "<pre>";

try {
    // Jalankan perintah Artisan
    Artisan::call($command);
    
    // Tampilkan outputnya
    echo Artisan::output();
    echo "\n\n--- SELESAI ---";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage();
}

echo "</pre>";

/**
 * PENTING: SEGERA HAPUS FILE INI SETELAH SELESAI DIGUNAKAN!
 */
