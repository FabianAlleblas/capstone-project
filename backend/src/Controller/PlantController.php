<?php

namespace App\Controller;

use App\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use App\Entity\Plant;
use App\Repository\PlantRepository;
use App\Service\SetTimeLeftService;

class PlantController extends BaseController {

    /**
     * @Route("/plant", methods={"GET"})
     */
    public function getPlant(
        SerializerInterface $serializer,
        PlantRepository $plantRepository,
        SetTimeLeftService $setTimeLeftService
        ): JsonResponse {
        
            $plants = $plantRepository->findAll();

            foreach ($plants as $plant){
            $setTimeLeftService->setTimeLeft($plant);
            }
        
            return $this->jsonResponse($plants, $serializer);
        }

    /**
     * @Route("/plant", methods={"POST"})
     */
    public function createPlant(
        Request $request,
        PlantRepository $plantRepository,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        SetTimeLeftService $setTimeLeftService
        ): JsonResponse {

            $plant = $serializer->deserialize($request->getContent(), Plant::class, 'json');
            $validationResult = $validator->validate($plant);
            
            if ($validationResult->count() !== 0) {
                return $this->badRequestResponse();
            }
            
            $plant->setLastWatered(new \Datetime());
            $plant->setLastFertilized(new \Datetime());
            
            $plantRepository->savePlant($plant);
            $setTimeLeftService->setTimeLeft($plant);

            return $this->jsonResponse($plant, $serializer);
        }

    /**
     * @Route("/plant/{id}", methods={"PUT"})
     */
    public function updatePlant(
        $id, 
        SerializerInterface $serializer,
        PlantRepository $plantRepository,
        Request $request,
        ValidatorInterface $validator,
        SetTimeLeftService $setTimeLeftService
        ): JsonResponse {

            $plant = $plantRepository->findOneBy(['id' => $id]);
            $newPlantData = $request->getContent();
            $serializer->deserialize($newPlantData, Plant::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $plant]);
            
            if ($plant === null) {
                return $this->notFoundResponse();
            }

            $validationResult = $validator->validate($plant);
            if ($validationResult->count() !== 0) {
                return $this->badRequestResponse();
            }
            
            $plantRepository->savePlant($plant);
            $setTimeLeftService->setTimeLeft($plant);

            return $this->jsonResponse($plant, $serializer);
        }

    /**
     * @Route("/plant/{id}", methods={"DELETE"})
     */
    public function removePlant(
        $id,
        PlantRepository $plantRepository){
            
            $plant = $plantRepository->findOneBy(['id' => $id]);

            if ($plant === null) {
                return $this->notFoundResponse();
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
        $id,
        $type,
        SerializerInterface $serializer,
        PlantRepository $plantRepository,
        Request $request,
        ValidatorInterface $validator,
        SetTimeLeftService $setTimeLeftService
        ): JsonResponse {

            $plant = $plantRepository->findOneBy(['id' => $id]);
            if ($plant === null) {
                return $this->notFoundResponse();
            }

            $type === 'water' ? 
            $plant->setLastWatered(new \Datetime()) : 
            $plant->setLastFertilized(new \Datetime());

            $plantRepository->savePlant($plant);
            $setTimeLeftService->setTimeLeft($plant);

            return $this->jsonResponse($plant, $serializer);
        }
}