import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { drawhand, setHandDetector } from "../../ai/handPoseAI";
import { useInterval } from "../../hooks/useInterval";

const WebCam = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [net, setNet] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  const detect = async (net) => {
    // check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video properties
      const { video } = webcamRef.current;
      const { videoWidth } = webcamRef.current.video;
      const { videoHeight } = webcamRef.current.video;
      // set video height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // make detections
      const hand = await net.estimateHands(video);
      // Draw meth
      const ctx = canvasRef.current.getContext("2d");
      drawhand(hand, ctx);
    }
  };
  useEffect(() => {
    const runHandPose = async () => {
      // Load the MediaPipe handpose model.
      const net = await setHandDetector();
      setModelLoaded(true);
      console.log("Handpose model Loaded");
      setNet(net);
      // Loop and Detect hands
    };

    runHandPose();
  }, []);

  useInterval(() => {
    if (net) {
      detect(net);
    }
  }, 100);

  if (!modelLoaded) return null;

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          transform: "rotateY(180deg)",
          zindex: 1,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          transform: "rotateY(180deg)",
          zindex: 1,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default WebCam;
