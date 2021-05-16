<?php

declare(strict_types=1);

namespace Patruck\Barcode\Domain\Model;

use HDNET\Autoloader\Annotation\DatabaseField;
use HDNET\Autoloader\Annotation\DatabaseTable;
use TYPO3\CMS\Extbase\DomainObject\AbstractEntity;

/**
 * @DatabaseTable
 */
class Barcode extends AbstractEntity
{
    /**
     * @DatabaseField(type="string")
     * @TYPO3\CMS\Extbase\Annotation\Validate("NotEmpty")
     */
    protected string $barcode = '';

    public function getBarcode(): string
    {
        return $this->barcode;
    }

    public function setBarcode(string $barcode): void
    {
        $this->barcode = $barcode;
    }
}
