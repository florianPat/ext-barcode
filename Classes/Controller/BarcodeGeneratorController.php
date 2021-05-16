<?php

declare(strict_types=1);

namespace Patruck\Barcode\Controller;

use HDNET\Autoloader\Annotation\NoCache;
use HDNET\Autoloader\Annotation\Plugin;
use Patruck\Barcode\Domain\Model\Barcode;
use Patruck\Barcode\Domain\Repository\BarcodeRepository;

class BarcodeGeneratorController extends AbstractController
{
    protected BarcodeRepository $barcodeRepository;

    public function __construct(BarcodeRepository $barcodeRepository)
    {
        $this->barcodeRepository = $barcodeRepository;
    }

    /**
     * @Plugin("BarcodeGenerator")
     * @NoCache
     */
    public function generateAction(): void
    {
        $code = '128B/124';
        $barcodeObj = new \TCPDFBarcode($code, 'C128');
        $this->view->assign('code', $code);
        $this->view->assign('html', $barcodeObj->getBarcodeHTML());
        $this->view->assign('svg', \base64_encode($barcodeObj->getBarcodeSVGcode()));
    }

    /**
     * @Plugin("BarcodeAdder")
     * @NoCache
     * @param Barcode|null $barcode
     * @TYPO3\CMS\Extbase\Annotation\IgnoreValidation("barcode")
     */
    public function formAction(Barcode $barcode = null): void
    {
        $this->view->assign('barcode', $barcode);
    }

    /**
     * @param Barcode $barcode
     */
    public function submitAction(Barcode $barcode): void
    {
        $this->barcodeRepository->add($barcode);
        $this->addFlashMessage('Persisted');
        $this->redirect('form', null, null, ['barcode' => $barcode]);
    }
}
