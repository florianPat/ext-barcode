<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Barcode',
    'description' => '',
    'category' => 'misc',
    'version' => '0.9.0',
    'state' => 'stable',
    'author' => 'Florian Patruck',
    'author_email' => 'florian.patruck@gmx.de',
    'constraints' => [
        'depends' => [
            'php' => '7.4.0-7.4.99',
            'typo3' => '10.4.0-0.0.0',
            'autoloader' => '7.1.0-7.99.99',
        ],
        'suggests' => [
            'bootstrap_package' => '',
        ],
    ],
];
