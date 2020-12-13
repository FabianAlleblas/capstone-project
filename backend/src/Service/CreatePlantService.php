<?php

namespace App\Service;

use App\Entity\Plant;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\PlantRepository;
use App\Service\PlantCareService;
use App\Service\PathPrefixService;

class CreatePlantService {

    public function __construct(
        PlantRepository $plantRepository,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        PlantCareService $plantCareService,
        PathPrefixService $pathPrefixService)
    {
        $this->plantRepository = $plantRepository;
        $this->validator = $validator;
        $this->serializer = $serializer;
        $this->plantCareService = $plantCareService;
        $this->pathPrefixService = $pathPrefixService;
    }

    public function createPlant(object $user, Request $request)
    {           
        $plant = $this->serializer->deserialize($request->getContent(), Plant::class, 'json');
        
        $imageFile = new ConvertUploadFile($request);

        if (!$imageFile->getPathname()){
            $imageFile = Null;
        }

        $plant->setImageFile($imageFile);

        $validationResult = $this->validator->validate($plant);
        if ($validationResult->count() !== 0) {
            return null;
        }
        
        $plant->setUser($user);
        $plant->setLastWatered(new \Datetime());
        $plant->setLastFertilized(new \Datetime());
        $plant->setWaterInterval(10);
        $plant->setFertilizerInterval(28);
        
        $this->plantRepository->savePlant($plant);
        $this->plantCareService->setIntervalLeft($plant);
        $this->pathPrefixService->pathPrefix($plant);

        return $plant;
    }

}