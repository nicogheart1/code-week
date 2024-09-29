import { useEffect } from "react";
import Square from "../square/square";

const Video = ({ hide = false, squares }) => {
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    video = document.querySelector("#videoElement");
    startVideoStream();
  }, []);

  return (
    <div
      className="video-container"
      style={{
        display: hide ? "none" : undefined,
      }}
    >
      <video
        className="video"
        autoPlay
        id="videoElement"
      ></video>
      <div className="video-squares">
        {squares.map((s, i) => {
          if (s) return null;
          return <Square key={`video-square-${i + 1}`} value={i + 1} />;
        })}
      </div>
      {/*<button onClick={startVideoStream}>Start video</button>
      <button onClick={stopVideoStream}>Stop video</button>*/}
    </div>
  );
};

export default Video;
