<?php

namespace App\Service;

use App\Constants\NiveisMessages;
use App\Exceptions\NotFoundException;
use App\Exceptions\BusinessException;
use App\Http\Requests\NiveisRequest\NiveisPostRequest;
use App\Http\Resources\NiveisResource;
use App\Models\Niveis;
use Illuminate\Http\Response;
use App\Models\Desenvolvedores;


class NiveisService {
  
  public function listAll()
  {
    $perPage = request()->query('per_page', 10);

    $niveis = Niveis::orderBy('id', 'desc')->paginate($perPage);

    if($niveis->isEmpty()) {
        return response(null, 404);
    }
    return response()->json([
        'data' => NiveisResource::collection($niveis),
        'meta' => [
            'total' => $niveis->total(),
            'per_page' => $niveis->perPage(),
            'current_page' => $niveis->currentPage(),
            'last_page' => $niveis->lastPage(),
        ]
    ]);
  }

  public function createNivel(NiveisPostRequest $request)
  {
    $nivel = Niveis::create($request->validated());
    return new NiveisResource($nivel);
  }

  public function updateNivel(NiveisPostRequest $request, $id)
  {
    $nivel = $this->nivelByid($id);
    $nivel->update($request->validated());
    return new NiveisResource($nivel);
  }

  
  public function deleteNivel($id)
  {
    $nivel = $this->nivelByid($id);

    $desenvolvedoresAssociados = Desenvolvedores::where('nivel_id', $id)->exists();

    if ($desenvolvedoresAssociados) {
        throw new BusinessException(NiveisMessages::NIVEL_COM_DESENVOLVEDORES_ASSOCIADOS);
    }

    $nivel->delete();

    return response(null, 204);
  }


  public function getById($id)
  {
    $nivel = $this->nivelByid($id);

    return new NiveisResource($nivel);
  }


  private function nivelByid($id)
  {
    $nivel = Niveis::find($id);

    if (!$nivel) {
        throw new NotFoundException(NiveisMessages::NIVEL_NAO_ENCONTRADO);
    }

    return $nivel;
  }
}