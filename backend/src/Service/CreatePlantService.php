<?php

namespace App\Service;

use App\Entity\Plant;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\PlantRepository;
use App\Service\PlantCareService;

class CreatePlantService {

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

    public function createPlant(object $user, Request $request)
    {
        $plant = $this->serializer->deserialize($request->getContent(), Plant::class, 'json');
    
        $validationResult = $this->validator->validate($plant);

        if ($validationResult->count() !== 0) {
            return null;
        }
        
        $plant->setUser($user);
        $plant->setLastWatered(new \Datetime());
        $plant->setLastFertilized(new \Datetime());
        
        $this->plantRepository->savePlant($plant);
        $this->plantCareService->setIntervalLeft($plant);

        return $plant;
    }

}