const openBtn = document.querySelector("#open-btn");
const videoInput = document.querySelector("#video-input");
const volumeUp = document.querySelector("#Volume-up");
const volumeDown = document.querySelector("#Volume-down");
const speedUp = document.querySelector("#speed-up");
const speedDown = document.querySelector("#speed-down");
const mainSection = document.querySelector("#main-section");
const toast = document.querySelector(".toast");
const videoPlay = document.querySelector(".fa-play");
const videoPause = document.querySelector(".fa-pause");
const videoBackward = document.querySelector(".fa-backward");
const videoStop = document.querySelector(".fa-stop");
const videoForward = document.querySelector(".fa-forward");
const videoFullScreen = document.querySelector(".fa-expand");
const currTime = document.querySelector("#current-time");

const showToast = (message) => {
  toast.style.display = "block";
  toast.innerHTML = message;
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
};

const videoHandler = () => {
  videoInput.click();
};
const acceptInputHandler = (obj) => {
  const selectedElement = obj.target.files[0];
  const link = URL.createObjectURL(selectedElement);
  const videoElement = document.createElement("video");
  videoElement.src = link;
  videoElement.setAttribute("class", "video");
  mainSection.appendChild(videoElement);
  videoElement.play();
  /******** CONTROLS*******/
  //play
  videoPlay.addEventListener("click", () => {
    videoElement.play();
    videoElement.volume = 0.3;
    videoPlay.style.display = "none";
    videoPause.style.display = "block";
  });
  //pause
  videoPause.addEventListener("click", () => {
    videoElement.pause();
    videoPlay.style.display = "block";
    videoPause.style.display = "none";
  });
  //stop
  videoStop.addEventListener("click", () => {
    videoElement.pause();
    videoPlay.style.display = "block";
    videoPause.style.display = "none";
    videoElement.currentTime = 0;
  });
  //backward
  videoBackward.addEventListener("click",()=>{
    const newTime = videoElement.currentTime - 10;
    videoElement.currentTime = newTime;
  })
  //forward 
  videoForward.addEventListener("click",() =>{
    const newTime = videoElement.currentTime + 10;
    videoElement.currentTime = newTime;
  })
  //fullscreen
  videoFullScreen.addEventListener("click", ()=>{
    mainSection.requestFullscreen();
  })
  
};
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};
setInterval(()=>{
  const updateTime = (videoElement) => {
    currTime.innerHTML = formatTime(videoElement.currentTime);
  };
},1000)

const speedIncreasedHandler = () => {
  const videoElement = document.querySelector("video");
  if (videoElement == null) {
    return;
  }
  if (videoElement.playbackRate < 3) {
    const speedIncreased = videoElement.playbackRate + 0.25;
    videoElement.playbackRate = speedIncreased;
    showToast(speedIncreased, "X");
  }
};
const speedDownHandler = () => {
  const videoElement = document.querySelector("video");
  if (videoElement == null) {
    return;
  }
  if (videoElement.playbackRate > 0.25) {
    const speedDecreased = videoElement.playbackRate - 0.25;
    videoElement.playbackRate = speedDecreased;
    showToast(speedDecreased, "X");
  }
};

const volumeUpHandler = () => {
  const videoElement = document.querySelector("video");
  if (videoElement == null) {
    return;
  }
  if (videoElement.volume <= 1) {
    const volumeIncreased = videoElement.volume + 0.1;
    v = videoElement.volume = volumeIncreased;
    let percentage = Math.floor(volumeIncreased * 100);
    if (percentage == 89 || percentage == 99 || percentage == 9) {
      percentage += 1;
    }
    showToast(percentage, "%");
  }
};

const volumeDownHandler = () => {
  const videoElement = document.querySelector("video");
  if (videoElement == null) {
    return;
  }
  if (videoElement.volume >= 0) {
    const volumeDecreased = videoElement.volume - 0.1;
    videoElement.volume = volumeDecreased;
    let percentage = Math.floor(volumeDecreased * 100);
    if (percentage == 89 || percentage == 99 || percentage == 9) {
      percentage += 1;
    }
    showToast(percentage, "%");
  }
};

openBtn.addEventListener("click", videoHandler);
videoInput.addEventListener("change", acceptInputHandler);
speedUp.addEventListener("click", speedIncreasedHandler);
speedDown.addEventListener("click", speedDownHandler);
volumeUp.addEventListener("click", volumeUpHandler);
volumeDown.addEventListener("click", volumeDownHandler);

// controls
