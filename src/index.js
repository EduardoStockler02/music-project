const songsList = [
  {
    name: "Black",
    artist: "Pearl Jam",
    src: "/src/song/black.mp3",
    cover: "/src/img/pearljam.jpg",
  },
  {
    name: "And I love Her",
    artist: "Kurt Cobain",
    src: "/src/song/and_i_love_her.mp3",
    cover: "/src/img/nirvana.jpg",
  },
  {
    name: "South Of Heaven",
    artist: "Slayer",
    src: "/src/song/south_of_heaven.mp3",
    cover: "/src/img/slayer.jpg",
  },
];

const artistName = document.querySelector(".artist-name");
const musicName = document.querySelector(".song-name"); 
const fillBar = document.querySelector(".fill-bar"); 
const time = document.querySelector(".time"); 
const progress = document.querySelector(".progress"); 
const cover = document.getElementById("cover"); 
const playBtn = document.getElementById("play"); 
const prevBtn = document.getElementById("prev"); 
const nextBtn = document.getElementById("next"); 
const body = document.body;
const container = document.querySelector(".container");

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
  // Corrigido: Mudado de 'DOMcontentLoaded' para 'DOMContentLoaded'
  loadSong(currentSong);

  song.addEventListener("timeupdate", updateProgress);
  song.addEventListener("ended", nextSong);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  playBtn.addEventListener("click", togglePlayPause);
  progress.addEventListener("click", seek);
});

/**
 * @param {number} index
*/
function loadSong(index) {
  const { name, artist, src, cover: thumb } = songsList[index];
  artistName.innerText = artist;
  musicName.innerText = name;
  song.src = src;

  cover.style.backgroundImage = `url(${thumb})` 
  body.style.background = `url(${thumb}) center/cover no-repeat fixed`;
  body.style.transition = "background 1s ease"; 
  container.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.5)`;

}

function updateProgress() {
  if (song.duration) {
    const pos = (song.currentTime / song.duration) * 100;
    fillBar.style.width = `${pos}%`;
    const duration = formatTime(song.duration);
    const currentTime = formatTime(song.currentTime);
    time.innerText = `${currentTime} - ${duration}`;
  }
}

/**
 * @param {number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function togglePlayPause() {
  if (playing) {
    song.pause();
    cover.classList.remove("spin");
  } else {
    song.play();
    cover.classList.add("spin");
  }
  playing = !playing;
  playBtn.classList.toggle("fa-pause", playing);
  playBtn.classList.toggle("fa-play", !playing);
  playBtn.classList.toggle("active", playing);
}

function nextSong() {
  currentSong = (currentSong + 1) % songsList.length;
  playMusic();
}

function prevSong() {
  currentSong = (currentSong - 1 + songsList.length) % songsList.length; // Corrigido: Adicionado + songsList.length para garantir que o índice seja positivo
  playMusic();
}

function playMusic() {
  loadSong(currentSong);
  song.play();
  playing = true;

  playBtn.classList.remove("fa-play"); // Corrigido: Removido 'fa-pause' e corrigido para 'fa-play'
  playBtn.classList.add("fa-pause"); // Corrigido: Adicionado 'fa-pause'
  playBtn.classList.add("active");
}

/**
 * @param {Event} e
 */
function seek(e) {
  const pos = (e.offsetX / progress.clientWidth) * song.duration;
  song.currentTime = pos;
}


