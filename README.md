# EXT:barcode

Barcode rendering and decoding

## Setup

1. Install extension and required packages: `npm i @zxing/browser:0.0.8 @zxing/library:^0.18.5 webrtc-adapter`
2. Import Javascript:
   - `import { default as Zxing } from 'js/components/zxing.js';`
   - `Zxing.go();`
3. Create a template like the one in `Resources/Private/Templates/BarcodeGenerator/Form.html` (SET THE ID`S OF THE ELEMENTS!!)
4. Pass an optional handler to the `go` method (for an example, look into `Resources/Private/JavaScript/zxing.js` `onDetected(result)`)
