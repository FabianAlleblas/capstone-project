<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

abstract class BaseController extends AbstractController {

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    protected function plantResponse($plants): JsonResponse 
    {
        $ignoredAttributes = ['user', 'lastWatered', 'lastFertilized'];
        return new JsonResponse($this->serializer->serialize($plants, 'json', 
                    [
                        AbstractObjectNormalizer::SKIP_NULL_VALUES => true,
                        AbstractNormalizer::IGNORED_ATTRIBUTES => $ignoredAttributes,
                        AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) 
                            {
                                return $object->getId();
                            },
                    ]
                ),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    protected function notFoundResponse(string $message): JsonResponse 
    {
        return new JsonResponse(
            ["error" => $message],
            JsonResponse::HTTP_NOT_FOUND
        );
    }

    protected function badRequestResponse(string $message): JsonResponse 
    {
        return new JsonResponse(
            ["error" => $message],
            JsonResponse::HTTP_BAD_REQUEST
        );
    }

    protected function unauthorizedResponse(string $type, string $message): JsonResponse 
    {
        return new JsonResponse(
            [$type => $message],
            JsonResponse::HTTP_UNAUTHORIZED
        );
    }

    protected function userResponse(object $user, string $token): JsonResponse 
    {
        $userResponse = ["userId" => $user->getId(), "currentToken" => $token];

        return new JsonResponse(
            $userResponse,
            JsonResponse::HTTP_OK);
    }
}