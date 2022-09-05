import { largestRect } from "rect-scaler";

/**
 * Takes the current state of the list of users and determines the best height to use
 * to fit the video frames in the page
 * @param streams
 */
const useDetermineLayout = (streams, screenWidth, screenHeight) => {
    let numStreams = streams.length;

    if (numStreams > 0 && screenWidth && screenHeight) {

        // Calculate the average width and height of the streams
        var totalWidth = 0
        var totalHeight = 0

        streams.forEach((stream) => {
            if (stream.stream) {
                totalWidth += stream.width;
                totalHeight += stream.height;
            }
        });

        let averageWidth = totalWidth / numStreams;
        let averageHeight = totalHeight / numStreams;

        // Determine number of rows required
        return largestRect(screenWidth, screenHeight, numStreams, averageWidth, averageHeight);
    }
    else {
        return { area: 0, cols: 0, rows: 0, width: 0, height: 400 }
    }
}

export default useDetermineLayout;