// UI Variables
const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector(".title");
const disc = document.querySelector("#disc");
const cover = document.querySelector("#cover");
const timer = document.querySelector(".timer");
const duration = document.querySelector(".duration");
let songIndex = 0;

// Song titles
const songs = [
    {
        title: "Dior",
        coverPath: "Assets/images/Dior.jpg",
        discPath: "Assets/Music/Dior.mp3",
        duration: "3:36"
    },
    {
        title: "Godzilla (feat. Juice WRLD)",
        coverPath: "Assets/images/Godzilla (feat. Juice WRLD).jpg",
        discPath: "Assets/Music/Godzilla (feat. Juice WRLD).mp3",
        duration: "3:30"
    },
    {
        title: "Invincible",
        coverPath: "Assets/images/Invincible.jpg",
        discPath: "Assets/Music/Invincible.mp3",
        duration: "2:07"
    },
    {
        title: "Keanu Reeves",
        coverPath: "Assets/images/Keanu Reeves.jpg",
        discPath: "Assets/Music/Keanu Reeves.mp3",
        duration: "3:45"
    },
    {
        title: "Rockstar (feat. 21 Savage)",
        coverPath: "Assets/images/Rockstar (feat. 21 Savage).jpg",
        discPath: "Assets/Music/Rockstar (feat. 21 Savage).mp3",
        duration: "3:38"
    },
    {
        title: "SAINt JHN - Roses",
        coverPath: "Assets/images/SAINt JHN - Roses.jpg",
        discPath: "Assets/Music/SAINt JHN - Roses.mp3",
        duration: "3:17"
    }
];

// Update song details
const loadSong = (song) => {
    title.innerText = song.title;
    cover.src = song.coverPath;
    disc.src = song.discPath;
    duration.textContent = song.duration;
}

// Play song
const playSong = () => {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    disc.play();
}

// Pause song
const pauseSong = () => {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    disc.pause();
}

// Previous song 
const prevSong = () => {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next song
const nextSong = () => {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Update progress
const updateProgress = (e) => {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

    let minutes = Math.floor(disc.currentTime / 60);
    let seconds = Math.floor(disc.currentTime % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    timer.textContent = `${minutes}:${seconds}`;
}

// Change song progress
const setProgress = (e) => {
    const Width = this.clientWidth;
    const clickWidth = e.offsetX;
    const duration = disc.duration;

    disc.currentTime = (clickWidth / width) * duration;

}

// Toggle play and pause
const playPause = () => {
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}


// Event listeners
const loadEventListeners  = () => {
    // Toggle Play/Pause when clicked
    playBtn.addEventListener("click", playPause);

    // Prvious song when clicked
    prevBtn.addEventListener("click", prevSong);

    // Next song when clicked
    nextBtn.addEventListener("click", nextSong);

    // Change progress when clicked
    progressContainer.addEventListener("click", setProgress);

    // Other various events
    disc.addEventListener("timeupdate", updateProgress);
    disc.addEventListener("ended", nextSong)
}


// Load songs initially into DOM
loadSong(songs[songIndex]);


// Load all Event listeners
loadEventListeners();