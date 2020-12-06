<?php

namespace App\Service;

use App\Repository\TokenRepository;
use App\Entity\User;

class DeleteInvalidTokenService {
    private $tokenRepository;
    private $userRepository;

    public function __construct(TokenRepository $tokenRepository) {
        $this->tokenRepository = $tokenRepository;
    }

    public function deleteInvalidToken(User $user): void {
        $tokens = $user->getTokens();
        $today = new \Datetime('');

        foreach ($tokens as $token){
            if ($token->getValidUntil() < $today){
                $this->tokenRepository->deleteToken($token);
            }
        }
    }
}