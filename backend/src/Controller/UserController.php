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
     * @Route("/user", methods={"GET"})
     */
    public function getUser(        
        SerializerInterface $serializer,
        UserRepository $userRepository
        ): JsonResponse {
            $user = $userRepository->findAll();
            return $this->jsonResponse($user, $serializer);
        }

    /**
     * @Route("/user/{id}/plants", methods={"GET"})
     */
    public function getUserPlants(  
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