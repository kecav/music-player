const music = document.querySelector('audio');
const playIcon = document.querySelector(".playImage");
const albumImage = document.querySelector(".album-image");
const progressBar = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');
const playBtn = document.getElementById("playBtn");
let currentTimeEl = document.getElementById('current-time');
let totalTimeEl = document.getElementById('total-time');
let isPlaying = false;

// To play Music
function playMusic() {
    isPlaying = true;
    albumImage.classList.add("rotateThis");
    playIcon.src = "Media/pause-button.png";
    playIcon.title = "Pause Music";
    music.play();
}

// To pause Music
function pauseMusic() {
    isPlaying = false;
    albumImage.classList.remove("rotateThis");
    playIcon.src = "Media/play-button.png";
    playIcon.title = "Play Music";
    music.pause();
}

function updateTime(duration, currentTime) {
    //Update Progress Width
    let progressPercent = Math.floor((currentTime / duration) * 100);
    progress.style.width = `${progressPercent}%`;

    //Updating Total Time
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`
    }
    // console.log("Duration : ", durationMinutes, durationSeconds);
    totalTimeEl.innerHTML = `${durationMinutes}:${durationSeconds}`;

    //Updating Current Time
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    // console.log("Current: ", currentMinutes, currentSeconds);
    currentTimeEl.innerHTML = `${currentMinutes}:${currentSeconds}`;
}
// To update time 
function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    updateTime(duration, currentTime);
}

function setProgressBar(e) {
    console.log(e);
    // clientWidth is total width of the bar
    // offsetX is clicked position on the bar
    const width = this.clientWidth;
    const clickX = e.offsetX;

    //Progress width automatically changes because timeupdate event is fired
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
    console.log(width, clickX, music.currentTime);
}

playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));
music.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', setProgressBar);