<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HomeController extends Controller
{
    /**
     * @Route("/", name="home_index")
     */
    public function index()
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/privacy-policy", name="home_privacy_policy")
     */
    public function privacyPolicy()
    {
        return $this->render('home/privacy_policy.html.twig');
    }

    /**
     * @Route("/offline.html", name="home_offline")
     */
    public function offline()
    {
        return $this->render('home/offline.html.twig');
    }
}
