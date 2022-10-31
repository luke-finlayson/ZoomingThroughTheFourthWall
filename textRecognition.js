const vision = require("@google-cloud/vision");
const files = require("fs");
const crypto = require('crypto');
const sizeOf = require('image-size')

class TextRecognition{
    constructor() {
        this.client = new vision.ImageAnnotatorClient();
    }

    /**
     * Accepts a base64 encoded image and uses the Google Vision API to perform
     * text recognition
     * @param {string} image64 The base64 encoded image
     * @returns {string} The text extracted from the input image
     */
    async getTextData(image64) {
        const fileName = __dirname + "/image_cache/" + crypto.randomUUID() + ".png";
        files.writeFileSync(fileName, image64, 'base64', (err) => {
            if (err) {
                console.log(err);
                return null;
          }
        });

        // Request for text recognition to be performed on the given image
        const [result] = await this.client.textDetection(fileName);
        const detections = result.textAnnotations;

        // Get rid of the temporary image
        files.rmSync(fileName);

        if (!detections.length) {
            console.log("No text detected");
            return null;
        }
        
        // First detection contains all text found in the image.
        let output = detections[0].description;

        return output;
    }
}

module.exports = TextRecognition;
