const vision = require("@google-cloud/vision");
const files = require("fs");
const crypto = require('crypto');
const sizeOf = require('image-size')

class TextRecognition {
    constructor() {
        this.client = new vision.ImageAnnotatorClient();
    }

    /**
     * Accepts a base64 encoded image and uses the Google Vision API to perform
     * text recognition
     * @param {string} image64 The base64 encoded image
     * @returns The text and bounding boxes extracted from the input image
     */
    async getTextData(image64) {
        const fileName = __dirname + "/image_cache/" + crypto.randomUUID() + ".png";
        files.writeFileSync(fileName, image64, 'base64', (err) => {
            if (err) {
                console.log(err);
                return null;
          }
        });

        const imageSize = sizeOf(fileName);
        let imageWidth = imageSize.width;
        let imageHeight = imageSize.height;

        // Request for text recognition to be performed on the given image
        const [result] = await this.client.documentTextDetection(fileName);
        const fullText = result.fullTextAnnotation;

        // Get rid of the temporary image
        files.rmSync(fileName);

        if (!fullText) {
            console.log("No text detected");
            return null;
        }

        const getWordString = (word) => {
            let sentence = "";

            word.symbols.forEach(symbol => {
                sentence += symbol.text;
                let symbolBreak = symbol.property?.detectedBreak;

                if (symbolBreak && symbolBreak.type === "SPACE")
                    sentence += " ";
            });

            return sentence;
        }

        const normalizeVertices = (vertices) => {
            return vertices.map(vertex => {
                return { x: vertex.x / imageWidth, y: vertex.y / imageHeight }
            });
        }

        let textAndBounds = [];

        fullText.pages.forEach(page => {
            page.blocks.forEach(block => {
                block.paragraphs.forEach(paragraph => {
                    let sentence = "";

                    paragraph.words.forEach(word => {
                        sentence += getWordString(word);
                    })

                    let vertices = normalizeVertices(paragraph.boundingBox.vertices);
                    let selectedVertices = [vertices[0], vertices[2]]; // Only want top left and bottom-right

                    textAndBounds.push({text: sentence, boundingBox: selectedVertices })
                })
            })
        })

        return textAndBounds;
    }
}

module.exports = TextRecognition;
