<?php

namespace App\Controller;

use App\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use App\Entity\User;
use App\Repository\UserRepository;

class UserController extends BaseController {

    /**
     * @Route("/user", methods={"POST"})
     */
    public function createUser(
        Request $request,
        UserRepository $userRepository,
        SerializerInterface $serializer,
        ValidatorInterface $validator
        ): JsonResponse {

            $user = $serializer->deserialize($request->getContent(), User::class, 'json');
            //$validationResult = $validator->validate($plant);
            
            //if ($validationResult->count() !== 0) {
            //    return $this->badRequestResponse();
            //}
            
            //$plant->setLastWatered(new \Datetime());
            //$plant->setLastFertilized(new \Datetime());
            
            $userRepository->saveUser($user);
            //$setTimeLeftService->setTimeLeft($plant);

            return $this->jsonResponse($user, $serializer);
        }
}