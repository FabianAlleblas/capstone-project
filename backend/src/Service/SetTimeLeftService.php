<?php

namespace App\Service;

use App\Entity\Plant;

class SetTimeLeftService{

    public function setTimeLeft(Plant $plant): Plant {
        $today = new \Datetime();

        $lastWatered = $plant->getLastWatered();
        $lastFertilized = $plant->getLastFertilized();

        $daysLeft = 10 - intval(date_diff($lastWatered, $today)->format('%a'));
        $weeksLeft = (28 - intval(date_diff($lastFertilized, $today)->format('%a'))) / 7;

        if ($daysLeft <= 0){
            $daysLeft = 0;
        }

        if ($weeksLeft <= 0){
            $weeksLeft = 0;
        }
        
        $plant->setDaysLeft(ceil($daysLeft));
        $plant->setWeeksLeft(ceil($weeksLeft));

        return $plant;
    }
}