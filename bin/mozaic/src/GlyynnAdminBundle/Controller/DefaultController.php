<?php

namespace GlyynnAdminBundle\Controller;

use GlyynnAdminBundle\Dashboard\ConfigureDashboardEvent;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="glynn-admin-homepage")
     */
    public function indexAction()
    {
        $dashboardItems = $this->get('event_dispatcher')->dispatch(
            ConfigureDashboardEvent::NAME,
            new ConfigureDashboardEvent($this->get('twig'))
        );

        return $this->render('GlyynnAdminBundle:Default:index.html.twig', [
            'dashboardItems' => $dashboardItems,
        ]);
    }
}
