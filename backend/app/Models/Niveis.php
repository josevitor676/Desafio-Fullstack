<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Desenvolvedores;


class Niveis extends Model
{
    protected $fillable = [
        'nivel',
    ];

    public function desenvolvedores(): HasMany
    {
        return $this->hasMany(Desenvolvedores::class, 'nivel_id');
    }
}