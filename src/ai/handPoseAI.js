import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
  modelType: "lite",
  runtime: "tfjs",
  //modelType: "full",
  maxHands: 2,
};

export const getHands = async (id = "videoElement") => {
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
