<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\PlantRepository;

class PlantCareService {

    public function __construct(
        PlantRepository $plantRepository,
        ValidatorInterface $validator)
    {
        $this->plantRepository = $plantRepository;
        $this->validator = $validator;
    }

    public function setIntervalLeft(object $plant): object
    {
        $today = new \Datetime();

        $wateringInterval = $plant->getWaterInterval();
        $fertilizingInterval = $plant->getFertilizerInterval() * 7;

        $lastWatered = $plant->getLastWatered();
        $lastFertilized = $plant->getLastFertilized();

        $daysLeft = $wateringInterval - intval(date_diff($lastWatered, $today)->format('%a'));
        $weeksLeft = ($fertilizingInterval - intval(date_diff($lastFertilized, $today)->format('%a'))) / 7;

        if ($daysLeft <= 0)
        {
            $daysLeft = 0;
        }

        if ($weeksLeft <= 0)
        {
            $weeksLeft = 0;
        }
        
        $plant->setDaysLeft(ceil($daysLeft));
        $plant->setWeeksLeft(ceil($weeksLeft));

        return $plant;
    }

    public function resetCareDate(int $id, string $type)
    {
        $plant = $this->plantRepository->findOneBy(['id' => $id]);

        if ($plant === null)
        {
            return 'Not found';
        }

        $type === 'water' ? 
        $plant->setLastWatered(new \Datetime()) : 
        $plant->setLastFertilized(new \Datetime());

        $this->plantRepository->savePlant($plant);

        $this->setIntervalLeft($plant);

        return $plant;
    }

    public function setCareInterval(int $id, Request $request)
    {
        $plant = $this->plantRepository->findOneBy(['id' => $id]);

        if ($plant === null)
        {
            return 'Not found';
        }

        $post = json_decode($request->getContent(), true);

        $plant->setWaterInterval($post['waterInterval'] ?? $plant->getWaterInterval());
        $plant->setFertilizerInterval($post['fertilizerInterval'] ?? $plant->getFertilizerInterval());

        $validationResult = $this->validator->validate($plant);
        if ($validationResult->count() !== 0) {
            return 'Invalid';
        }
        
        $this->plantRepository->savePlant($plant);
        $this->setIntervalLeft($plant);
        
        return $plant;
    }
}