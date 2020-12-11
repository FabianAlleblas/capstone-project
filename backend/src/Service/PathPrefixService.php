<?php

namespace App\Service;

class PathPrefixService {

    public function pathPrefix(object $plant): object
    {
        if (!$plant->getImage()){
            return $plant;
        }

        $preFixUrl = 'http://urbanplants.local/images/plants/';
        $imagePath = $plant->getImage();
        $plant->setImage($preFixUrl . $imagePath);

        return $plant;
    }
}