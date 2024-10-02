import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
  modelType: "full",
  runtime: "tfjs",
  maxHands: 2,
};

const getHands = async (id = "videoElement") => {
  try {
    const video = document.getElementById(id);
    if (video) {
      const detector = await handPoseDetection.createDetector(
        model,
        detectorConfig
      );
      //const estimationConfig = { flipHorizontal: false, staticImageMode: true };
      const hands = await detector.estimateHands(video);
      return hands;
    }
  } catch (error) {
    console.error(error);
  }
};


const setHandDetector = async () => {
  const hands = handPoseDetection.SupportedModels.MediaPipeHands;
  return await handPoseDetection.createDetector(hands, detectorConfig);
};

const drawhand = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const { keypoints } = prediction;
      for (let i = 0; i < keypoints.length; i += 1) {
        // Get x point
        const x = keypoints[i].x;
        // Get y point
        const y = keypoints[i].y;
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);
        // Set line color
        ctx.fillStyle = "#283681";
        ctx.fill();
      }
    });
  }
};

export { getHands, setHandDetector, drawhand };
