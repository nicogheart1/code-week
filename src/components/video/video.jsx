import { useEffect } from "react";
import { getHands } from "../../ai/handPoseAI";

const Video = () => {
  let video;

  const startVideoStream = () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((error) => {
          console.log("Video stream error", error);
        });
    }
  };

  const stopVideoStream = () => {
    if (video) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();

      for (var i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        track.stop();
      }

      video.srcObject = null;
    }
  };

  const retireveHands = async () => {
    try {
      if (video) {
        const hands = await getHands();
        console.log("hands", hands);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    video = document.querySelector("#videoElement");
    startVideoStream();
  }, []);

  if (video) {
    retireveHands();
  }

  return (
    <div className="video-container">
      <video height={250} width={250} autoPlay id="videoElement"></video>
      <button onClick={startVideoStream}>Start video</button>
      <button onClick={stopVideoStream}>Stop video</button>
    </div>
  );
};

export default Video;
