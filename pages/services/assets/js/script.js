document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  });
  
  //audio
// Corrected variable names
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekBar = document.getElementById("seekBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

// Toggle play/pause and button state
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.classList.add("pause");
    } else {
        audio.pause();
        playPauseBtn.classList.remove("pause");
    }
});

// Update seek bar and time during playback
audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    seekBar.value = percent;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Display duration when metadata loads
audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

// Seek audio on input change
seekBar.addEventListener("input", () => {
    const newTime = (seekBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// Helper function to format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function showPopup(event) {
  event.preventDefault();

  alert("Please log in to access this feature and enjoy a personalized experience.");

  window.location.href = "/AWD-Finals-Drapion/pages/login-signup/index.html"; 
}