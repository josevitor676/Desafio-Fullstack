<?php

namespace App\Http\Controllers\Api;

use App\Constants\DesenvolvedorMessages;
use App\Exceptions\NotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\DesenvolvedorRequest\DesenvolvedorPatchRequest;
use App\Http\Requests\DesenvolvedorRequest\DesenvolvedorPostRequest;
use App\Http\Resources\DesenvolvedorResource;
use App\Models\Desenvolvedores;
use App\Service\DesenvolvedorService;

class DesenvolvedorController extends Controller
{
    protected $desenvolvedorService;

    public function __construct(DesenvolvedorService $desenvolvedorService)
    {
        $this->desenvolvedorService = $desenvolvedorService;
    }

    /**
     * @OA\Get(
     *     path="/api/desenvolvedores",
     *     summary="Lista desenvolvedores",
     *     tags={"Desenvolvedores"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de desenvolvedores"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nenhum desenvolvedor encontrado"
     *     )
     * )
     */
    public function listAll()
    {
        return $this->desenvolvedorService->listAll();
    }

    /**
     * @OA\Post(
     *     path="/api/desenvolvedores",
     *     summary="Cria um novo desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nome", "nivel_id"},
     *             @OA\Property(property="nome", type="string"),
     *             @OA\Property(property="nivel_id", type="integer")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Desenvolvedor criado com sucesso"
     *     ),
     * )
     */
    public function createDesenvolvedor(DesenvolvedorPostRequest $dto)
    {
        return $this->desenvolvedorService->createDesenvolvedor($dto);
    }

    /**
     * @OA\Patch(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Atualiza um desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do desenvolvedor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nome", "nivel_id"},
     *             @OA\Property(property="nome", type="string"),
     *             @OA\Property(property="nivel_id", type="integer")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Desenvolvedor atualizado com sucesso"
     *     ),
     * )
     */
    public function updateDesenvolvedor(DesenvolvedorPatchRequest $dto , $id)
    {
        return $this->desenvolvedorService->updateDesenvolvedor($dto, $id);
    }

    /**
     * @OA\Delete(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Deleta um desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do desenvolvedor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Desenvolvedor deletado com sucesso"
     *     ),
     * )
     */
    public function deleteDesenvolvedor($id)
    {
        return $this->desenvolvedorService->deleteDesenvolvedor($id);
    }

    /**
     * @OA\Get(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Busca um desenvolvedor por ID",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do desenvolvedor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Desenvolvedor encontrado"
     *     ),
     * )
     */
    public function getById($id)
    {
        return $this->desenvolvedorService->getById($id);
    }

}
