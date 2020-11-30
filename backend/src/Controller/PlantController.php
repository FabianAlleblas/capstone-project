<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use App\Entity\Plant;
use App\Repository\PlantRepository;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PlantController extends AbstractController {

    /**
     * @Route("/plant", methods={"GET"})
     */
    public function getPlant(SerializerInterface $serializer, PlantRepository $plantRepository): JsonResponse {
        $plants = $plantRepository->findAll();
        return $this->jsonResponse($plants, $serializer);
    }

    /**
     * @Route("/plant", methods={"POST"})
     */
    public function createPlant(Request $request, PlantRepository $plantRepository, SerializerInterface $serializer, ValidatorInterface $validator): JsonResponse {
        $plant = $serializer->deserialize($request->getContent(), Plant::class, 'json');
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
     * @Route("/plant/{id}", methods={"PUT"})
     */
    public function updatePlant($id, SerializerInterface $serializer, PlantRepository $plantRepository, Request $request, ValidatorInterface $validator): JsonResponse {
        $plant = $plantRepository->findOneBy(array('id' => $id));
        $newData = $serializer->deserialize($request->getContent(), Plant::class, 'json');
        $validationResult = $validator->validate($newData);
        if ($validationResult->count() !== 0) {
            return new JsonResponse(
                ["error" => "Plant data invalid."],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $validatedData = json_decode($serializer->serialize($newData, 'json'), true);
        
        $plantRepository->updatePlant($plant, $validatedData);
        return $this->jsonResponse($plant, $serializer);
     }

    private function jsonResponse($data, $serializer): JsonResponse {
        return new JsonResponse(
            $serializer->serialize($data, 'json', [AbstractObjectNormalizer::SKIP_NULL_VALUES => true]),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}