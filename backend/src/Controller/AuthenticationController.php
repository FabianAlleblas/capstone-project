<?php

namespace App\Controller;

use App\Controller\BaseController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\UserRepository;
use App\Repository\TokenRepository;
use App\Service\AuthenticationService;

class AuthenticationController extends BaseController {

    /**
     * @Route("/login", methods={"POST"})
     */
    public function userLogin(
        Request $request,
        UserRepository $userRepository,
        TokenRepository $tokenRepository,
        AuthenticationService $authenticationService): JsonResponse 
    {
        $post = json_decode($request->getContent(), true);
        $user = $userRepository->findOneBy(['email' => $post['email'], 'password' => $post['password']]);

        if ($user === null){
            return $this->unauthorizedResponse('error', 'Password Or E-Mail Wrong!');
        }

        $token = $tokenRepository->createToken($user);
        $authenticationService->deleteInvalidToken($user);

        return $this->userResponse($user, $token);
    }
}