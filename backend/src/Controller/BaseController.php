<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class BaseController extends AbstractController {

    protected function jsonResponse($data, $serializer): JsonResponse {
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

    protected function notFoundResponse(): JsonResponse {
        return new JsonResponse(
            ["error" => "Plant ID not found."],
            JsonResponse::HTTP_NOT_FOUND
        );
    }

    protected function badRequestResponse(): JsonResponse {
        return new JsonResponse(
            ["error" => "Plant data invalid."],
            JsonResponse::HTTP_BAD_REQUEST
        );
    }
}