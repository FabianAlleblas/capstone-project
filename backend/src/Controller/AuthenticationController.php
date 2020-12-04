<?php

namespace App\Controller;

use App\Controller\BaseController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\User;
use App\Repository\UserRepository;

class AuthenticationController extends BaseController {

    /**
     * @Route("/login", methods={"GET"})
     */
    public function userLogin(
        Request $request,
        UserRepository $userRepository,
        SerializerInterface $serializer
    ): JsonResponse {
        $loginData = $post = json_decode($request->getContent(), true);
        $user = $userRepository->findOneBy(['email' => $post['email'], 'password' => $post['password']]);

        if ($user === null){
            return $this->unauthorizedResponse('Password Or E-Mail Wrong!');
        }

        $user->setLoginAuthorized(true);

        $ignoredAttributes = ['email', 'password', 'plants'];
        return $this->jsonResponse($user, $serializer, $ignoredAttributes);
    }
}