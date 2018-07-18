<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Translation\Translator;
use Symfony\Component\Translation\TranslatorInterface;

class TransController extends Controller
{
    /**
     * @var Translator
     */
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * @Route("/trans", name="trans_trans")
     */
    public function trans()
    {
        dump($this->translator->getCatalogue());
        dump($this);
        exit;
    }
}
