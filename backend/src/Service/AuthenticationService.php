<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use App\Repository\TokenRepository;

class AuthenticationService {

    public function __construct(TokenRepository $tokenRepository)
    {
        $this->tokenRepository = $tokenRepository;
    }

    public function validateUser(Request $request)
    {
        $authHeader = $request->headers->get('Authorization');
        $currentToken = substr($authHeader, strpos($authHeader, ' ')+1);

        if (!$currentToken)
        {
            return null;
        }

        $foundToken = $this->tokenRepository->findOneBy(['token' => $currentToken]);

        if (!$foundToken)
        {
            return null;
        }

        $userId = intval($request->headers->get('UserId'));
        $user = $foundToken->getUser();

        if ($user->getId() !== $userId) 
        {
            return null;
        }
        
        $today = new \Datetime();

        if ($foundToken->getValidUntil() < $today)
        {
            return null;
        }

        return $user;
    }

    public function deleteInvalidToken(object $user): void 
    {
        $tokens = $user->getTokens();
        $today = new \Datetime();

        foreach ($tokens as $token)
        {
            if ($token->getValidUntil() < $today)
            {
                $this->tokenRepository->deleteToken($token);
            }
        }
    }
}