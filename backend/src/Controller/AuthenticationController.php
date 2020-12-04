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
            return new JsonResponse(
                ["NOT" => "GOOD"],
                JsonResponse::HTTP_UNAUTHORIZED
        );
        }

        return new JsonResponse(
            ["VERY" => "GOOD"],
            JsonResponse::HTTP_OK
    );
    }
}