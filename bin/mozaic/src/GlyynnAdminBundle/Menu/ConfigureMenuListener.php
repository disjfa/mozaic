<?php
namespace GlyynnAdminBundle\Menu;

/**
 * Class ConfigureMenuListener
 * @package GlyynnAdminBundle\Menu
 */
class ConfigureMenuListener
{
    /**
     * @param ConfigureMenuEvent $event
     */
    public function onMenuConfigure(ConfigureMenuEvent $event)
    {
        $menu = $event->getMenu();
    }
}
