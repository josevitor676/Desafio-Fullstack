<?php

namespace App\Service;

use App\Constants\DesenvolvedorMessages;
use App\Exceptions\NotFoundException;
use App\Http\Requests\DesenvolvedorRequest\DesenvolvedorPatchRequest;
use App\Http\Requests\DesenvolvedorRequest\DesenvolvedorPostRequest;
use App\Http\Resources\DesenvolvedorResource;
use App\Models\Desenvolvedores;
use Illuminate\Http\Response;

class DesenvolvedorService
{
  public function listAll()
  {
    $perPage = request()->query('per_page', 10);
    $pesquisa = request()->query('pesquisa', '');

    $desenvolvedores = Desenvolvedores::orderBy('updated_at', 'desc')
                          ->when($pesquisa, function ($query) use ($pesquisa) {
                              $query->whereRaw('LOWER(nome) LIKE ?', ['%' . strtolower($pesquisa) . '%']);
                          })
                          ->paginate($perPage);


    if ($desenvolvedores->isEmpty()) {
        return response(null, 404);
    }

    return response()->json([
        'data' => DesenvolvedorResource::collection($desenvolvedores),
        'meta' => [
            'total' => $desenvolvedores->total(),
            'per_page' => $desenvolvedores->perPage(),
            'current_page' => $desenvolvedores->currentPage(),
            'last_page' => $desenvolvedores->lastPage(),
        ]
    ]);
  }

  public function createDesenvolvedor(DesenvolvedorPostRequest $request)
  {
      $desenvolvedor = Desenvolvedores::create($request->validated());
      return new DesenvolvedorResource($desenvolvedor);
  }

  public function updateDesenvolvedor(DesenvolvedorPatchRequest $dto , $id)
  {
    $desenvolvedor = $this->getDesenvolvedorById($id);
    $desenvolvedor->update($dto->validated());
    return new DesenvolvedorResource($desenvolvedor);
  }

  public function deleteDesenvolvedor($id)
  {
    $desenvolvedor = $this->getDesenvolvedorById($id);
    $desenvolvedor->delete();
    return response(null, 204);
  }

  public function getById($id)
  {
    $desenvolvedor = $this->getDesenvolvedorById($id);
    return new DesenvolvedorResource($desenvolvedor);
  }

  private function getDesenvolvedorById($id) {
    $desenvolvedor = Desenvolvedores::find($id);
    if(!$desenvolvedor) {
        throw new NotFoundException(DesenvolvedorMessages::DESENVOLVEDOR_NAO_ENCONTRADO);
    }
    return $desenvolvedor;
  }
}