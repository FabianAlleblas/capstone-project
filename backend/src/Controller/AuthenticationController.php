<?php

namespace App\Controller;

use App\Controller\BaseController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\TokenRepository;

class AuthenticationController extends BaseController {

    /**
     * @Route("/login", methods={"POST"})
     */
    public function userLogin(
        Request $request,
        UserRepository $userRepository,
        TokenRepository $tokenRepository
        ): JsonResponse {
        $post = json_decode($request->getContent(), true);
        $user = $userRepository->findOneBy(['email' => $post['email'], 'password' => $post['password']]);

        if ($user === null){
            return $this->unauthorizedResponse('Password Or E-Mail Wrong!');
        }

        $token = $tokenRepository->createToken($user);
        $user->setCurrentToken($token);

        $ignoredAttributes = ['email', 'password', 'plants', 'tokens'];
        return $this->jsonResponse($user, $ignoredAttributes);
    }
}