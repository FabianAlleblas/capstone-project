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

class UserController extends BaseController {

    /**
     * @Route("/user", methods={"POST"})
     */
    public function createUser(
        Request $request,
        UserRepository $userRepository,
        SerializerInterface $serializer,
        ValidatorInterface $validator
        ): JsonResponse 
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $validationResult = $validator->validate($user);
        
        if ($validationResult->count() !== 0)
        {
            return $this->badRequestResponse('Invalid User Data!');
        }

        $checkedEmail = $userRepository->findBy(['email' => $user->getEmail()]);
        
        if ($checkedEmail)
        {
            return $this->badRequestResponse('E-Mail Already In Use!');
        }

        $userRepository->saveUser($user);
        
        return $this->userResponse($user,);
    }
}