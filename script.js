// === THEME SETUP ===
const body = document.body;
const themeToggleBtn = document.getElementById("theme-toggle");

function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    if (saved === "dark") body.classList.add("dark");
    else body.classList.remove("dark");
  } else {
    // Auto dark if evening or early morning
    const hour = new Date().getHours();
    if (hour < 6 || hour >= 18) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }
}

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// === DATE PICKER & COUNTDOWN ===
const examDateInput = document.getElementById("examDate");
const saveDateBtn = document.getElementById("saveDate");
const countdownEl = document.getElementById("countdown");
const currentTimeEl = document.getElementById("current-time");

let examDate = localStorage.getItem("examDate")
  ? new Date(localStorage.getItem("examDate"))
  : new Date("2025-06-26");

examDateInput.valueAsDate = examDate;

function updateCountdown() {
  const now = new Date();
  const diff = examDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "🎉 Kỳ thi đã bắt đầu hoặc kết thúc!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
}

function updateCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("vi-VN");
  currentTimeEl.textContent = `Giờ hiện tại: ${timeString}`;
}

saveDateBtn.addEventListener("click", () => {
  if (examDateInput.value) {
    examDate = new Date(examDateInput.value);
    localStorage.setItem("examDate", examDateInput.value);
    updateCountdown();
  }
});

setInterval(() => {
  updateCountdown();
  updateCurrentTime();
}, 1000);

updateCountdown();
updateCurrentTime();

// === YOUTUBE MUSIC ===
let player;
let musicPlaying = false;
const musicToggleBtn = document.getElementById("music-toggle");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("ytplayer", {
    height: "0",
    width: "0",
    videoId: "ZtRTh8BU4sQ", // Bạn có thể thay ID nhạc YouTube khác
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: "ZtRTh8BU4sQ",
      modestbranding: 1,
      iv_load_policy: 3,
    },
    events: {
      onReady: () => {
        // player.playVideo(); // ko auto phát vì chính sách Chrome
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.ENDED) {
          player.playVideo();
        }
      },
    },
  });
}

musicToggleBtn.addEventListener("click", () => {
  if (!player) return;
  if (musicPlaying) {
    player.pauseVideo();
    musicToggleBtn.textContent = "🎵";
  } else {
    player.playVideo();
    musicToggleBtn.textContent = "🔈";
  }
  musicPlaying = !musicPlaying;
});

// === PARTICLES.JS SETUP ===
particlesJS.load("particles-js", "particles.json", function () {
  console.log("particles.js loaded - Luxury edition");
});
