import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
  modelType: "full",
  runtime: "tfjs",
  maxHands: 1,
};

const setHandDetector = async () => {
  const hands = model;
  return await handPoseDetection.createDetector(hands, detectorConfig);
};

const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
};

const drawhand = (predictions, ctx) => {
  let squareId;
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      //console.log("prediction", prediction)
      const { keypoints } = prediction;
      for (let i = 0; i < keypoints.length; i += 1) {
        // Get name point
        const name = keypoints[i].name;
        // Get x point
        const x = keypoints[i].x;
        // Get y point
        const y = keypoints[i].y;
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);
        // Set line color
        ctx.fillStyle = "white";

        if (name === "index_finger_tip") {
          ctx.fillStyle = "red";
          const boardContainer = document.querySelector("#boardContainer");
          const adjustedX =
            Math.abs(boardContainer.getBoundingClientRect().width - x) +
            getOffset(boardContainer).left;
          const adjustedY = Math.abs(y + getOffset(boardContainer).top);
          squareId = document
            .elementsFromPoint(adjustedX, adjustedY)
            .find((el) => el?.classList?.contains("square"))?.id;
        }

        ctx.fill();
      }
    });
  }
  return squareId;
};

export { setHandDetector, drawhand };
