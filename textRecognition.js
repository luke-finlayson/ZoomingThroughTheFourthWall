const vision = require("@google-cloud/vision");
const files = require("fs");
const crypto = require('crypto');

class TextRecognition{
    constructor() {
        this.client = new vision.ImageAnnotatorClient();
    }

    async getTextData(image64) {
        fileName = "/image_cache/" + crypto.randomUUID();
        files.writeFileSync(fileName, image64);

        // Request for text recognition to be performed on the given image
        const [result] = await this.client.textDetection(fileName);
        const detections = result.textAnnotations;
        let output = new Map();

        if (!detections.length) {
            console.log("No text detected");
            return null;
        }

        detections.forEach(text => {
            output.set(text.description, text.boundingPoly.normalizedVertices);
        });

        // Get rid of the temporary image
        files.rmSync(fileName);

        return output;
    }
}

module.exports = TextRecognition;