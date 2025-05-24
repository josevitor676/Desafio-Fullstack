<?php

namespace App\Http\Controllers\Api;

use App\Constants\NiveisMessages;
use App\Exceptions\NotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\NiveisRequest\NiveisPostRequest;
use App\Http\Resources\NiveisResource;
use App\Models\Niveis;
use App\Service\NiveisService;
/**
 * @OA\Info(
 *     title="API para teste da Gazin Tech",
 *     version="0.1",
 * )
 */


class NiveisController extends Controller
{
    protected $niveisService;

    public function __construct(NiveisService $niveisService)
    {
        $this->niveisService = $niveisService;
    }


    /**
     * @OA\Get(
     *     path="/api/niveis",
     *     summary="Lista niveis",
     *     tags={"Niveis"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de niveis"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nenhum nível encontrado"
     *     )
     * )
     */
    public function listAll()
    {
       return $this->niveisService->listAll();
    }

    /**
     * @OA\Post(
     *     path="/api/niveis",
     *     summary="Cria um novo nível",
     *     tags={"Niveis"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel"},
     *             @OA\Property(property="nivel", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Nível criado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Erro de validação"
     *     )
     * )
     */
    public function createNivel(NiveisPostRequest $request)
    {
        return $this->niveisService->createNivel($request);
    }

    /**
     * @OA\Put(
     *     path="/api/niveis/{id}",
     *     summary="Atualiza um nível existente",
     *     tags={"Niveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do nível",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel"},
     *             @OA\Property(property="nivel", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nível atualizado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function updateNivel(NiveisPostRequest $request, $id)
    {
        return $this->niveisService->updateNivel($request, $id);
    }

    /**
     * @OA\Delete(
     *     path="/api/niveis/{id}",
     *     summary="Deleta um nível existente",
     *     tags={"Niveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do nível",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Nível deletado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function deleteNivel($id)
    {
        return $this->niveisService->deleteNivel($id);
    }

    /**
     * @OA\Get(
     *     path="/api/niveis/{id}",
     *     summary="Obtém um nível específico",
     *     tags={"Niveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do nível",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nível encontrado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function getById($id)
    {
        return $this->niveisService->getById($id);
    }

}
