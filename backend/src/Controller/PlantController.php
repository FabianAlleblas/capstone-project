<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Plant;
use App\Repository\PlantRepository;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PlantController extends AbstractController {
    /**
     * @Route("/plant", methods={"GET"})
     */
    public function getPlant(SerializerInterface $serializer, PlantRepository $plantRepository): JsonResponse {
        $plants = $plantRepository->findAll();

        return new JsonResponse(
                $serializer->serialize($plants, 'json'),
                JsonResponse::HTTP_OK,
                [],
                true);
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

        return new JsonResponse(
        $serializer->serialize($plant, 'json'),
        JsonResponse::HTTP_OK,
        [],
        true);
    }
}