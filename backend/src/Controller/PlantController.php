<?php

namespace App\Controller;

use App\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\AuthenticationService;
use App\Service\CreatePlantService;
use App\Service\UpdatePlantService;
use App\Service\PlantCareService;
use App\Repository\PlantRepository;
use App\Service\PathPrefixService;

class PlantController extends BaseController {
    
    /**
     * @Route("/plant", methods={"GET"})
     */
    public function userPlants(  
        Request $request, 
        PlantCareService $plantCareService,
        AuthenticationService $authenticationService,
        PathPrefixService $pathPrefixService): JsonResponse 
    {
        $user = $authenticationService->validateUser($request); 
        
        if (!$user) {
            return $this->unauthorizedResponse('unauthorized', 'Not Authorized!');
        }

        $plants = $user->getPlants();

        foreach ($plants as $plant){
            $plantCareService->setIntervalLeft($plant);
            $pathPrefixService->pathPrefix($plant);
        }

        return $this->plantResponse($plants);
    }

    /**
     * @Route("/plant", methods={"POST"})
     */
    public function addPlant(
        Request $request,
        CreatePlantService $createPlantService,
        AuthenticationService $authenticationService): JsonResponse 
    {   
        $user = $authenticationService->validateUser($request);

        if (!$user) 
        {
            return $this->unauthorizedResponse('unauthorized', 'Not Authorized!');
        }
        
        $plant = $createPlantService->createPlant($user, $request);

        if (!$plant)
        {
            return $this->badRequestResponse('Invalid Plant Data!');
        }
        
        return $this->plantResponse($plant);
    }

    /**
     * @Route("/plant/{id}", methods={"PUT"})
     */
    public function updatePlant(
        int $id, 
        Request $request,  
        UpdatePlantService $updatePlantService,
        AuthenticationService $authenticationService): JsonResponse 
    {
        $user = $authenticationService->validateUser($request);

        if (!$user) 
        {
            return $this->unauthorizedResponse('unauthorized', 'Not Authorized!');
        }

        $plant = $updatePlantService->updatePlantData($user, $id, $request);
        
        if ($plant === 'Invalid')
        {
            return $this->badRequestResponse('Invalid Plant Data!');
        }
        
        return $this->plantResponse($plant);
    }

    /**
     * @Route("/plant/{id}", methods={"DELETE"})
     */
    public function removePlant(
        int $id,
        Request $request,
        PlantRepository $plantRepository,
        AuthenticationService $authenticationService): JsonResponse
    {
        $user = $authenticationService->validateUser($request);

        if (!$user) 
        {
            return $this->unauthorizedResponse('unauthorized', 'Not Authorized!');
        }

        $plant = $plantRepository->findOneBy(['id' => $id]);
        
        if ($plant === null || $plant->getUser()->getId() !== $user->getId()) {
            return $this->notFoundResponse('Plant Not Found');
        }
        
        $plantRepository->deletePlant($plant);
        
        return new JsonResponse(
            ["Status" => "Item deleted"],
            JsonResponse::HTTP_OK
        );
    }

    /**
     * @Route("/plant/{id}/{type}", methods={"PATCH"})
     */
    public function resetTimer(
        int $id,
        string $type,
        Request $request,
        PlantCareService $plantCareService,
        AuthenticationService $authenticationService,
        PathPrefixService $pathPrefixService): JsonResponse 
    {
        $user = $authenticationService->validateUser($request);

        if (!$user) 
        {
            return $this->unauthorizedResponse('unauthorized', 'Not Authorized!');
        }

        $plant = $plantCareService->resetCareDate($id, $type);

        if ($plant === 'Not found' || $plant->getUser()->getId() !== $user->getId())
        {
            return $this->notFoundResponse('Plant Not Found');
        }

        $pathPrefixService->pathPrefix($plant);
        return $this->plantResponse($plant);
    }

        /**
     * @Route("/plant/{id}", methods={"PATCH"})
     */
    public function updateCareTime(
        int $id,
        Request $request,
        PlantCareService $plantCareService,
        AuthenticationService $authenticationService,
        PathPrefixService $pathPrefixService): JsonResponse 
    {
        $user = $authenticationService->validateUser($request);

        if (!$user) 
        {
            return $this->unauthorizedResponse('unauthorized', 'Not Authorized!');
        }

        $plant = $plantCareService->setCareInterval($id, $request);

        if ($plant === 'Not found' || $plant->getUser()->getId() !== $user->getId())
        {
            return $this->notFoundResponse('Plant Not Found');
        }

        $pathPrefixService->pathPrefix($plant);
        return $this->plantResponse($plant);
    }
}