const video: any = document.querySelector("video");
const playBtn: any = document.getElementById("play");
const muteBtn: any = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange: any = document.getElementById("volume");

const currentTime:any = document.getElementById("currentTime");
const totalTime:any = document.getElementById("totalTime");

const timeline:any = document.getElementById("timeline");
const fullScreenBtn:any = document.getElementById("fullScreen");
const videoContainer:any = document.getElementById("videoContainer");
const videoControls:any = document.getElementById("videoControls");

let controlsTimeout: any = null;

let volumeValue = 0.5;
video.volume = volumeValue;

const formatTime = (seconds: number) => new Date(seconds * 1000).toISOString().substring(11, 19);

totalTime.innerText = formatTime(Math.ceil(video.duration));

const handlePlayClick = (e: any) => {
  if (video?.paused) {
    video.play();
  } else {
    video?.pause();
  }
  playBtn.innerText = video.paused ? "재생" : "정지"
}
const handleChange = (event: any) => {
  const { value } = event.target;

  if(value === 0) {
    console.log("a");
    video.muted = true;
  } else {
    video.muted = false;
  }

  if(video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
}

const handleMute = (e: any) => {
  if (video.muted) {
  video.muted = false;
  video.volume = volumeValue;
  } else {
  video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn?.addEventListener("click", handleMute);

  const handleInputVolumeRange = (event: any) => {
  const {
  target: { value },
  } = event;
  if (video.muted) {
  video.muted = false;
  muteBtn.innerText = "Mute";
  }
  if (value == 0) {
  video.muted = true;
  muteBtn.innerText = "Unmute";
  }
  video.volume = value;
  };
  
  const handleChangeVolumeRange = (event: any) => {
  const {
  target: { value },
  } = event;
  if (value != 0) {
  volumeValue = value;
  }
  };

  const handleMetadata = () => {
    totalTime.innerText = formatTime(Math.ceil(video.duration));
    console.log(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
  }

  const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.ceil(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
  }
  
  volumeRange.addEventListener("input", handleInputVolumeRange);
  volumeRange.addEventListener("change", handleChangeVolumeRange);

  video.readyState
  ? handleMetadata()
  : video.addEventListener("loadedmetadata", handleMetadata);
  video.addEventListener("timeupdate", handleTimeUpdate);

  const handleTimelineChange = (event: any) => {
    const { value } = event.target;
    video.currentTime = value;
  }

  timeline.addEventListener("input", handleTimelineChange);

  const handleFullScreen = () => {
    const fullScreen = document.fullscreenElement;
    if(fullScreen) {
      document.exitFullscreen();
      fullScreenBtn.innerText = "전체화면";
    } else {
      videoContainer.requestFullscreen();
      fullScreenBtn.innerText = "축소";
    }
  }

  fullScreenBtn?.addEventListener("click", handleFullScreen);

  const handleMouseMove = () => {
    if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
    }, 3000);
    };

  

  video.addEventListener("mousemove", handleMouseMove);

