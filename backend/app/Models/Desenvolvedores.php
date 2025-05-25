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
        'creadet_at',
        'updated_at',
    ];

    public function nivel()
    {
        return $this->belongsTo(Niveis::class);
    }
}
