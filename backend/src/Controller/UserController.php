<?php

namespace App\Controller;

use App\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
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
            $user = $userRepository->find($id);

            if ($user === null) {
                return $this->notFoundResponse('User Not Found!');
            }

            $plants = $user->getPlants();

            foreach ($plants as $plant){
                $setTimeLeftService->setTimeLeft($plant);
                }

            $ignoredAttributes  = ['user', 'lastWatered', 'lastFertilized'];
            return $this->jsonResponse($plants, $serializer, $ignoredAttributes);
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
                return $this->badRequestResponse('Invalid User Data!');
            }

            $checkedEmail = $userRepository->findBy(['email' => $user->getEmail()]);
            
            if ($checkedEmail){
                return $this->badRequestResponse('E-Mail Already In Use!');
            }

            $userRepository->saveUser($user);
            
            $ignoredAttributes  = ['email', 'password', 'plants'];
            return $this->jsonResponse($user, $serializer, $ignoredAttributes);
        }

    /**
    * @Route("/user/{id}", methods={"DELETE"})
    */
    public function removeUser(
        $id,
        Request $request,
        UserRepository $userRepository,
        
        ValidatorInterface $validator
        ): JsonResponse {
            
            $user = $userRepository->findOneBy(['id' => $id]);

            if ($user === null) {
                return $this->notFoundResponse('User Not Found');
            }
            
            $userRepository->deleteUser($user);                
                return new JsonResponse(
                    ["Status" => "User Deleted!"],
                    JsonResponse::HTTP_OK
                );
        }
}