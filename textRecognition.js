const vision = require("@google-cloud/vision");
const files = require("fs");
const crypto = require('crypto');

class TextRecognition{
    constructor() {
        this.client = new vision.ImageAnnotatorClient();
    }

    async getTextData(image64) {
        const fileName = __dirname + "/image_cache/" + crypto.randomUUID() + ".png";
        files.writeFileSync(fileName, image64, 'base64', (err) => {
          console.log(err);
        });

        console.log(image64);

        // Request for text recognition to be performed on the given image
        const [result] = await this.client.textDetection(fileName);
        const detections = result.textAnnotations;
        let output = new Map();

        console.log(result);

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
