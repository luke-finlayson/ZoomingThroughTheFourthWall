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

        // Request for text recognition to be performed on the given image
        const [result] = await this.client.textDetection(fileName);
        const detections = result.textAnnotations;

        if (!detections.length) {
            console.log("No text detected");
            return null;
        }
        
        // First detection is all text found in the image.
        let output = detections[0].description;

        // Get rid of the temporary image
        files.rmSync(fileName);

        return output;
    }
}

module.exports = TextRecognition;
