<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PraktikanCategory extends Model
{
    use HasFactory;

    protected $connection = 'link_penting';

    protected $fillable = [
        'name',
        'icon',
        'color',
        'description',
        'sort_order',
    ];

    public function links()
    {
        return $this->hasMany(PraktikanLink::class, 'category_id')->orderBy('sort_order');
    }

    public function activeLinks()
    {
        return $this->hasMany(PraktikanLink::class, 'category_id')->where('is_active', true)->orderBy('sort_order');
    }
}
