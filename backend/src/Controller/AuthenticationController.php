<?php

namespace App\Controller;

use App\Controller\BaseController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\UserRepository;
use App\Repository\TokenRepository;
use App\Service\AuthenticationService;
use App\Service\LoginService;

class AuthenticationController extends BaseController {

    /**
     * @Route("/login", methods={"POST"})
     */
    public function userLogin(
        Request $request,
        UserRepository $userRepository,
        TokenRepository $tokenRepository,
        LoginService $loginService,
        AuthenticationService $authenticationService): JsonResponse 
    {
        $post = json_decode($request->getContent(), true);
        $loginData = $loginService->login($post['email'], $post['password']);
        
        if (!$loginData['isValid']){
            return $this->unauthorizedResponse('error', 'Password Or E-Mail Wrong!');
        }

        $token = $tokenRepository->createToken($loginData['user']);
        $authenticationService->deleteInvalidToken($loginData['user']);

        return $this->userResponse($loginData['user'], $token);
    }
}