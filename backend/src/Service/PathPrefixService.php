<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ContainerInterface as Container;

class PathPrefixService {

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function pathPrefix(object $plant): object
    {
        if (!$plant->getImage()){
            return $plant;
        }

        $preFixUrl = $this->container->getParameter("api_img_url_prefix");
        $imagePath = $plant->getImage();
        $plant->setImage($preFixUrl . $imagePath);

        return $plant;
    }
}