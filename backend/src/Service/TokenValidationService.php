<?php

namespace App\Service;

use App\Repository\TokenRepository;
use App\Entity\User;

class TokenValidationService {
    private $tokenRepository;
    private $userRepository;

    public function __construct(TokenRepository $tokenRepository) {
        $this->tokenRepository = $tokenRepository;
    }

    public function validateToken(User $user, $currentToken): bool {

        if (!$currentToken){
            return false;
        }

        $today = new \Datetime();
        $foundToken = $this->tokenRepository->findOneBy(['token' => $currentToken]);

        return !is_null($foundToken) && $today < $foundToken->getValidUntil();;
    }
}