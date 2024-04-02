import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
const Video = () => {
  return (
    <div>
      <JitsiMeeting
        roomName={"INNOVENTUREEE"}
        getIFrameRef={(node) => (node.style.height = "800px")}
      />
    </div>
  );
};

export default Video;
