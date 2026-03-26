<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroImage extends Model
{
    protected $connection = 'link_penting';

    protected $fillable = [
        'image_path',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
