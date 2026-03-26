<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PraktikanLink extends Model
{
    use HasFactory;

    protected $connection = 'link_penting';

    protected $fillable = [
        'category_id',
        'title',
        'url',
        'description',
        'icon',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(PraktikanCategory::class, 'category_id');
    }
}
