import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
// eslint-disable-next-line no-unused-vars
import * as tf from "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";

const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
  modelType: "lite",
  runtime: "tfjs",
};

export const getHands = async (id = "#videoElement") => {
  try {
    const image = document.querySelector(id);
    if (image) {
      const detector = await handPoseDetection.createDetector(
        model,
        detectorConfig
      );
      const estimationConfig = { flipHorizontal: false, staticImageMode: true };
      const hands = await detector.estimateHands(image, estimationConfig);
      return hands;
    }
  } catch (error) {
    console.error(error);
  }
};
