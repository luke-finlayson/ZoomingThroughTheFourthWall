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

        for (const i in streams) {
            if (streams[i].stream) {
                const streamSettings = streams[i].stream.getVideoTracks()[0].getSettings()

                totalWidth += streamSettings.width;
                totalHeight += streamSettings.height;
            }
        }

        let averageWidth = totalWidth / numStreams;
        let averageHeight = totalHeight / numStreams;

        console.log("W: " + screenWidth + "\nH: " + screenHeight)

        // Determine number of rows required
        return largestRect(screenWidth, screenHeight, numStreams, averageWidth, averageHeight);
    }
    else {
        return { area: 0, cols: 0, rows: 0, width: 0, height: 400 }
    }
}

export default useDetermineLayout;