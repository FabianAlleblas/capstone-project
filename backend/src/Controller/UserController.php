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
use App\Service\SetTimeLeftService;

class UserController extends BaseController {

    /**
     * @Route("/user/{id}/plants", methods={"GET"})
     */
    public function userPlants(  
        $id,      
        SerializerInterface $serializer,
        UserRepository $userRepository,
        SetTimeLeftService $setTimeLeftService
        ): JsonResponse {
            $plants = $userRepository->find($id)->getPlants();

            foreach ($plants as $plant){
                $setTimeLeftService->setTimeLeft($plant);
                }

            return $this->jsonResponse($plants, $serializer);
        }

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
            $validationResult = $validator->validate($user);
            
            if ($validationResult->count() !== 0) {
                return $this->badRequestResponse();
            }
            
            $userRepository->saveUser($user);
            
            return $this->jsonResponse($user, $serializer);
        }
}