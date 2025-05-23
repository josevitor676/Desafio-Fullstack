<?php

namespace App\Http\Controllers\Api;

use App\Constants\DesenvolvedorMessages;
use App\Exceptions\NotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\DesenvolvedorRequest\DesenvolvedorPatchRequest;
use App\Http\Requests\DesenvolvedorRequest\DesenvolvedorPostRequest;
use App\Http\Resources\DesenvolvedorResource;
use App\Models\Desenvolvedores;

class DesenvolvedorController extends Controller
{
    public function listAll()
    {
        $desenvolvedores = Desenvolvedores::all();
        if($desenvolvedores->isEmpty()) {
            return response(null, 404);
        }
        return DesenvolvedorResource::collection($desenvolvedores);
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
