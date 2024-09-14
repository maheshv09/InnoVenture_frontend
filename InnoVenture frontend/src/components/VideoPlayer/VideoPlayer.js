import React from "react";
import YouTube from "react-youtube";

const VideoPlayer = () => {
  function getYouTubeVideoId(url) {
    // Regex to match YouTube video ID
    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return null;
    }
  }

  // Example usage:
  var videoUrl = "https://www.youtube.com/watch?v=VMy3BrMM6O0";
  var videoId = getYouTubeVideoId(videoUrl);

  return <YouTube videoId={videoId} />;
};

export default VideoPlayer;
