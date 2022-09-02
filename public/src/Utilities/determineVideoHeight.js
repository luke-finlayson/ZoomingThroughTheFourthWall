import useWindowDimensions from "./useWindowDimensions";
import { largestRect } from "rect-scaler";

/**
 * Takes the current state of the list of users and determines the best height to use
 * to fit the video frames in the page
 * @param streams
 */
const determineVideoHeight = (streams) => {
    // Determine window size and amount of frames to fit into space
    const { width, height } = useWindowDimensions;
    let numStreams = streams.length;

    // Calculate the average width and height of the streams
    var totalWidth = 0
    var totalHeight = 0

    for (const i in streams) {
        const streamSettings = streams[i].stream.getVideoTracks()[0].getSettings()

        totalWidth += streamSettings.width;
        totalHeight += streamSettings.height;
    }

    let averageWidth = totalWidth / numStreams;
    let averageHeight = totalHeight / numStreams;

    // Determine number of rows required -- taking into account margins to give space around video section
    return largestRect(width - 40, height - 40, numStreams, averageWidth, averageHeight);
}

export default determineVideoHeight;