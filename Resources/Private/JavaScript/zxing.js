'use strict';

import adapter from 'webrtc-adapter';
import { BrowserMultiFormatOneDReader, BarcodeFormat } from '@zxing/browser';
import { DecodeHintType, NotFoundException } from '@zxing/library';

function createHints() {
	const hints = new Map();
	const formats = [BarcodeFormat.CODE_128];
	hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
	return hints;
}

function createFileDecoder() {
	const hints = createHints();
	hints.set(DecodeHintType.TRY_HARDER, true);
	return new BrowserMultiFormatOneDReader(hints);
}

function createCameraDecoder() {
	const hints = createHints();
	return new BrowserMultiFormatOneDReader(hints);
}

function onDetected(result) {
	const codeInput = document.getElementById('codeInput');
	codeInput.value = result.text;
	codeInput.focus();
}

async function fileApiInput() {
    const codeReader = createFileDecoder();

    async function decode(src) {
        try {
            const result = await codeReader.decodeFromImageElement(src);
            console.log('image url result');
            console.log(result);
            onDetected(result);
        } catch (error) {
            console.log('decode failed');
            console.log(error);
        }
    }

    let image = document.getElementById('fileDivImage');

    document.getElementById('fileInput').addEventListener('change', function(e) {
        console.log('files changed');
        if (e.target.files && e.target.files.length) {
			image.setAttribute('src', URL.createObjectURL(e.target.files[0]));
			decode(image);
        }
    });
    document.getElementById('rerunButton').addEventListener('click', function(e) {
        let input = document.getElementById('fileInput');
        if (input.files && input.files.length) {
			image.setAttribute('src', URL.createObjectURL(input.files[0]));
			decode(image);
        }
    });
}

async function cameraInput(formElement) {
    const codeReader = createCameraDecoder();
    const controls = await codeReader.decodeFromVideoDevice(null, 'livestreamVideo', (result, error, controls) => {
        if (error) {
        	if (!error instanceof NotFoundException) {
				document.getElementById('cameraSupport').innerText = error.message;
				console.log('video device error!');
				console.log(error);
			}
        	return;
        }
        if (result) {
            console.log('video device result');
            console.log(result);
            onDetected(result);
            document.getElementById('cameraSupport').innerText = 'Detected a barcode!';
            controls.stop();
            formElement.textContent = '';
        }
    });

    document.getElementById('stopButton').addEventListener('click', function (e) {
        e.preventDefault();
        controls.stop();
        formElement.textContent = '';
    });

    document.getElementById('cameraSupport').innerText = 'Your platform supports camera input!';
}

async function initZxingWithFileInput(fileInputElement) {
    console.log('No livestream support');
    try {
        await fileApiInput(fileInputElement);
    } catch (error) {
        console.log('file input failed');
        console.log(error);
    }
}

async function initZxingWithLivestream(livestreamElement) {
    console.log('livestream support, trying it!');
    try {
        await cameraInput(livestreamElement);
    } catch(error) {
        console.log('camera input failed, trying file input');
        console.log(error);
        document.getElementById('cameraSupport').innerText = error;
        livestreamElement.textContent = '';
    }
}

export default {
	go: function(onDetectedHandler = onDetected) {
		try {
			window.addEventListener('load', function() {
				onDetected = onDetectedHandler;

				const formElement = document.getElementById('barcodeDiv');
				if(!formElement) {
					return;
				}
				const livestreamElement = document.getElementById('livestreamDiv');
				console.log('Loading zxing!');

				let livestreamSupport = navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function';

				if (livestreamSupport) {
					initZxingWithLivestream(livestreamElement).then(r => {});
				}

				initZxingWithFileInput().then(r => {});
			});
		} catch (error) {
			console.log(error);
		}
	}
};
