<?php

namespace App\Oauth;

use App\Entity\User;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider;
use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthAwareUserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserProvider extends FOSUBUserProvider implements OAuthAwareUserProviderInterface
{
    /**
     * @param UserResponseInterface $response
     * @return UserInterface
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        $username = $response->getUsername();
        $service = $response->getResourceOwner()->getName();
        $setter = 'set' . ucfirst($service);
        $setterId = $setter . 'Id';
        $setterToken = $setter . 'AccessToken';
        $user = $this->userManager->findUserByEmail($response->getEmail());
        if (false === $user instanceof User) {
            $user = $this->userManager->createUser();
            $user->setEmail($response->getEmail());
            $user->setUsername($response->getEmail());
            $user->setPlainPassword(uniqid());
            $user->setEnabled(true);
        }
        $user->$setterId($username);
        $user->$setterToken($response->getAccessToken());
        $this->userManager->updateUser($user);
        return $user;
    }

    /**
     * @param string $class
     * @return bool
     */
    public function supportsClass($class)
    {
        return $class === User::class;
    }
}