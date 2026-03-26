<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\PraktikanCategory;
use App\Models\PraktikanLink;
use Illuminate\Database\Seeder;

class PraktikanDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Default Settings
        $settings = [
            'praktikan_display_mode' => 'folder', // atau 'direct'
            'social_twitter' => '#',
            'social_instagram' => 'https://instagram.com/labmanlan',
            'social_email' => 'asisten@manlan.lab',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // 2. Default Category (agar tidak kosong)
        $cat = PraktikanCategory::updateOrCreate(
            ['name' => 'Link Praktikan Lab Manajemen Lanjut'],
            [
                'description' => 'Koleksi link penting untuk praktikan Lab Manajemen Lanjut',
                'icon' => 'Link',
                'color' => 'purple',
                'sort_order' => 1,
            ]
        );

        // 3. Optional: Sample Link
        PraktikanLink::updateOrCreate(
            [
                'category_id' => $cat->id,
                'title' => 'Panduan Praktikum 2026',
            ],
            [
                'url' => '#',
                'description' => 'Panduan lengkap pelaksanaan praktikum tahun 2026',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );
    }
}
