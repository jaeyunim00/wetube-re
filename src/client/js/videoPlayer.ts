const video: any = document.querySelector("video");
const playBtn: any = document.getElementById("play");
const muteBtn: any = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange: any = document.getElementById("volume");

const handlePlayClick = (e: any) => {
  if (video?.paused) {
    video.play();
  } else {
    video?.pause();
  }
  playBtn.innerText = video.paused ? "재생" : "정지"
}

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : 0.5;
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn?.addEventListener("click", handleMute);