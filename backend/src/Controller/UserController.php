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
use App\Repository\TokenRepository;
use App\Service\PasswordEncoder;

class UserController extends BaseController {

    /**
     * @Route("/user", methods={"POST"})
     */
    public function createUser(
        Request $request,
        UserRepository $userRepository,
        TokenRepository $tokenRepository,
        PasswordEncoder $passwordEncoder,
        SerializerInterface $serializer,
        ValidatorInterface $validator
        ): JsonResponse 
    {
        $newUser = $serializer->deserialize($request->getContent(), User::class, 'json');
        $checkedEmail = $userRepository->findBy(['email' => $newUser->getEmail()]);
        
        if ($checkedEmail)
        {
            return $this->badRequestResponse('E-Mail already in use!');
        }

        $validationResult = $validator->validate($newUser);
        
        if ($validationResult->count() !== 0)
        {
            return $this->badRequestResponse('Invalid User Data!');
        }

        $passwordEncoder->encode($newUser->getPassword(), $newUser);
        $userRepository->saveUser($newUser);
        $token = $tokenRepository->createToken($newUser);
        
        return $this->userResponse($newUser, $token);
    }
}