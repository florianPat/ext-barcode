<?php

/**
 * Registry.
 */
declare(strict_types=1);

namespace HDNET\Site;

/**
 * Registry.
 */
class Registry
{
    /**
     * Get the default autoloader configuration.
     *
     * @return array
     */
    public static function getAutoloaderConfiguration()
    {
        return [
            // class replacement
            'Xclass',
            // additional functions
            'Hooks',
            'Slots',
            // smart object management
            'SmartObjects',
            'ContentObjects',
            'TcaFiles',
            'ExtensionTypoScriptSetup',
            // non-critical
            'Plugins',
            'FlexForms',
            'StaticTyposcript',
            'LanguageOverride',
            'Icon',
            'FluidNamespace',
        ];
    }
}
