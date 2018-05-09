<?php

namespace App\Menu;

use Knp\Menu\FactoryInterface;
use Knp\Menu\ItemInterface;
use Knp\Menu\Matcher\MatcherInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class AdminMenuBuilder
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * @var FactoryInterface
     */
    private $factory;

    /**
     * @var MatcherInterface
     */
    private $matcher;
    /**
     * @var EventDispatcherInterface
     */
    private $eventDispatcher;

    /**
     * MainBuilder constructor.
     *
     * @param ContainerInterface       $container
     * @param FactoryInterface         $factory
     * @param MatcherInterface         $matcher
     * @param EventDispatcherInterface $eventDispatcher
     */
    public function __construct(ContainerInterface $container, FactoryInterface $factory, MatcherInterface $matcher, EventDispatcherInterface $eventDispatcher)
    {
        $this->container = $container;
        $this->factory = $factory;
        $this->matcher = $matcher;
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * @param array $options
     *
     * @return ItemInterface
     */
    public function build(array $options)
    {
        $menu = $this->factory->createItem('root', [
            'childrenAttributes' => [
                'class' => 'sidebar-menu',
            ],
        ]);

        $this->eventDispatcher->dispatch(
            ConfigureMenuEvent::ADMIN,
            new ConfigureMenuEvent($this->factory, $menu)
        );

        $this->setupMenuData($menu->getChildren());

        return $menu;
    }

    /**
     * @param ItemInterface[] $children
     * @param bool            $hasCurrent
     *
     * @return bool
     */
    public function setupMenuData(array $children, $hasCurrent = false)
    {
        $childIndex = 0;
        foreach ($children as $child) {
            ++$childIndex;

            if (count($child->getChildren()) > 0) {
                $itemId = sprintf('menu-%d-%d', $child->getLevel(), $childIndex + 1);

                $child->setUri('#' . $itemId);
                $child->setAttribute('class', 'sidebar-sub');

                $child->setLinkAttribute('data-toggle', 'collapse');
                if ($this->matcher->isAncestor($child)) {
                    $child->setChildrenAttribute('class', 'sidebar-sub collapse show');
                    $child->setLinkAttribute('class', 'sidebar-link');
                } else {
                    $child->setLinkAttribute('class', 'sidebar-link collapsed');
                    $child->setChildrenAttribute('class', 'sidebar-sub collapse');
                }
                $child->setChildrenAttribute('id', $itemId);

                $this->setupMenuData($child->getChildren());
            } else {
                $child->setLinkAttribute('class', 'sidebar-link');
            }
        }

        return $hasCurrent;
    }
}
