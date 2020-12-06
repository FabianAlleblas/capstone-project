<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Plant;
use App\Repository\PlantRepository;
use App\Service\PlantCareService;

class UpdatePlantService {

    public function __construct(
        PlantRepository $plantRepository,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        PlantCareService $plantCareService)
    {
        $this->plantRepository = $plantRepository;
        $this->validator = $validator;
        $this->serializer = $serializer;
        $this->plantCareService = $plantCareService;
    }

    public function updatePlantData(object $user, int $id, Request $request)
    {
        $plant = $this->plantRepository->findOneBy(['id' => $id]);
        $newPlantData = $request->getContent();
        $this->serializer->deserialize($newPlantData, Plant::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $plant]);
        
        $validationResult = $this->validator->validate($plant);
        if ($validationResult->count() !== 0)
        {
            return 'Invalid';
        }
        
        $this->plantRepository->savePlant($plant);
        $this->plantCareService->setIntervalLeft($plant);

        return $plant;
    }
}