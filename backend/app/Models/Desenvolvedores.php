<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Desenvolvedores extends Model
{
    protected $fillable = [
        'nome',
        'sexo',
        'data_nascimento',
        'hobby',
        'nivel_id',
    ];

    public function nivel()
    {
        return $this->belongsTo(Niveis::class);
    }
}
