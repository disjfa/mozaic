<?php

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Debug\Debug;

/**
 * @var Composer\Autoload\ClassLoader $loader
 */
$loader = require __DIR__ . '/../../bin/mozaic/app/autoload.php';
Debug::enable();


$kernel = new AppKernel('dev', true);
$kernel->loadClassCache();
$kernel->boot();

$application = new Application($kernel);

$command = new \Doctrine\Bundle\DoctrineBundle\Command\Proxy\UpdateSchemaDoctrineCommand();
$command->setApplication($application);
$input = new ArrayInput(array('--dump-sql' => true));
$output = new BufferedOutput();
$resultCode = $command->run($input, $output);

echo "<pre>";
print_r($output->fetch());
exit;