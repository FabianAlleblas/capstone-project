<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class BaseController extends AbstractController {
    private $serializer;

    public function __construct(SerializerInterface $serializer) {
        $this->serializer = $serializer;
    }

    protected function jsonResponse($data, $ignoredAttributes): JsonResponse {
        return new JsonResponse(
            $this->serializer->serialize($data, 'json', 
                [
                    AbstractObjectNormalizer::SKIP_NULL_VALUES => true,
                    AbstractNormalizer::IGNORED_ATTRIBUTES => $ignoredAttributes,
                    AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                        return $object->getId();
                    },
                ]
            ),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    protected function notFoundResponse(string $message): JsonResponse {
        return new JsonResponse(
            ["error" => $message],
            JsonResponse::HTTP_NOT_FOUND
        );
    }

    protected function badRequestResponse(string $message): JsonResponse {
        return new JsonResponse(
            ["error" => $message],
            JsonResponse::HTTP_BAD_REQUEST
        );
    }

    protected function unauthorizedResponse(string $type, string $message): JsonResponse {
        return new JsonResponse(
            [$type => $message],
            JsonResponse::HTTP_UNAUTHORIZED
        );
    }
}