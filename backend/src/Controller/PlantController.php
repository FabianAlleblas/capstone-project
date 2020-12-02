<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Plant;
use App\Repository\PlantRepository;
use App\Service\SetTimeLeft;

class PlantController extends AbstractController {

    /**
     * @Route("/plant", methods={"GET"})
     */
    public function getPlant(
        SerializerInterface $serializer,
        PlantRepository $plantRepository,
        SetTimeleft $setTimeLeft
        ): JsonResponse {
        
            $plants = $plantRepository->findAll();

            foreach ($plants as $plant){
            $setTimeLeft->setTimeLeft($plant);
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
        ValidatorInterface $validator
        ): JsonResponse {

            $plant = $serializer->deserialize($request->getContent(), Plant::class, 'json');
            $validationResult = $validator->validate($plant);
            
            if ($validationResult->count() !== 0) {
                return new JsonResponse(
                    ["error" => "Plant data invalid."],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }
            
            $plant->setLastWatered(new \Datetime());
            $plant->setLastFertilized(new \Datetime());
            
            $plantRepository->savePlant($plant);
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
        ValidatorInterface $validator
        ): JsonResponse {

            $plant = $plantRepository->findOneBy(['id' => $id]);
            $newPlantData = $request->getContent();
            $serializer->deserialize($newPlantData, Plant::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $plant]);
            
            if ($plant === null) {
                return new JsonResponse(
                    ["error" => "Plant ID not found."],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            $validationResult = $validator->validate($plant);
            if ($validationResult->count() !== 0) {
                return new JsonResponse(
                    ["error" => "Plant data invalid."],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }
            
            $plantRepository->savePlant($plant);
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
                return new JsonResponse(
                    ["error" => "Plant ID not found."],
                    JsonResponse::HTTP_BAD_REQUEST
                );
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
        SetTimeleft $setTimeLeft
        ): JsonResponse {

            $plant = $plantRepository->findOneBy(['id' => $id]);
            if ($plant === null || $type !== 'water' && 'fertilizer') {
                return new JsonResponse(
                    ["error" => "Plant ID not found."],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }

            $type === 'water' ? 
            $plant->setLastWatered(new \Datetime()) : 
            $plant->setLastFertilized(new \Datetime());

            $plantRepository->savePlant($plant);
            $setTimeLeft->setTimeLeft($plant);

            return $this->jsonResponse($plant, $serializer);
        }

    private function jsonResponse($data, $serializer): JsonResponse {
        return new JsonResponse(
            $serializer->serialize($data, 'json', 
                [
                    AbstractObjectNormalizer::SKIP_NULL_VALUES => true,
                    AbstractNormalizer::IGNORED_ATTRIBUTES => ['lastWatered', 'lastFertilized']
                ]
            ),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}