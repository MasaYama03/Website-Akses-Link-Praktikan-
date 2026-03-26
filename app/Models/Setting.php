<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $connection = 'link_penting';

    protected $fillable = [
        'key',
        'value'
    ];
}
