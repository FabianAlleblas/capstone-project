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
use App\Service\DeleteInvalidTokenService;

class UserController extends BaseController {

    /**
     * @Route("/user/login", methods={"POST"})
     */
    public function userLogin(
        Request $request,
        UserRepository $userRepository,
        TokenRepository $tokenRepository,
        DeleteInvalidTokenService $deleteInvalidTokenService
        ): JsonResponse {
        $post = json_decode($request->getContent(), true);
        $user = $userRepository->findOneBy(['email' => $post['email'], 'password' => $post['password']]);

        if ($user === null){
            return $this->unauthorizedResponse('error', 'Password Or E-Mail Wrong!');
        }

        $token = $tokenRepository->createToken($user);
        $user->setCurrentToken($token);

        $deleteInvalidTokenService->deleteInvalidToken($user);

        $ignoredAttributes = ['email', 'password', 'plants', 'tokens'];
        return $this->jsonResponse($user, $ignoredAttributes);
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
            return $this->jsonResponse($user, $ignoredAttributes);
        }

    /**
    * @Route("/user/{id}", methods={"DELETE"})
    */
    public function removeUser(
        $id,
        Request $request,
        UserRepository $userRepository,
        ValidatorInterface $validator,
        TokenValidationService $tokenValidationService
        ): JsonResponse {
            $user = $userRepository->findOneBy(['id' => $id]);
            $currentToken = json_decode($request->getContent(), true);

            if ($user === null) {
                return $this->notFoundResponse('User Not Found');
            }

            $autherized = $tokenValidationService->validateToken($user, $currentToken);
            if (!$autherized){
                return $this->unauthorizedResponse('error', 'Whoops! You need to Login!!');
            }
            
            $userRepository->deleteUser($user);                
                return new JsonResponse(
                    ["Status" => "User Deleted!"],
                    JsonResponse::HTTP_OK
                );
        }
}