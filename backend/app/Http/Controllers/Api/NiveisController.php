<?php

namespace App\Http\Controllers\Api;

use App\Constants\NiveisMessages;
use App\Exceptions\NotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\NiveisPostRequest;
use App\Http\Resources\NiveisResource;
use App\Models\Niveis;

class NiveisController extends Controller
{
    public function listAll()
    {
        $niveis = Niveis::all();
        if($niveis->isEmpty()) {
            return response(null, 404);
        }
        return NiveisResource::collection($niveis);
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
