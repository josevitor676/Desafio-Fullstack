<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DesenvolvedorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'sexo' => $this->sexo,
            'data_nascimento' => $this->data_nascimento,
            'hobby' => $this->hobby,
            'nivel' => new NiveisResource($this->nivel),
        ];
    }
}
