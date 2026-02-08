/* Typing Effect */
const text = `Minnu jii 💖

From the moment you entered my life,
everything felt warmer and brighter.

I don’t want a perfect story,
I just want YOU in every chapter of my life.

Hold my hand today, tomorrow, and forever…
Because my soul chose you long ago 💍💞

I love you endlessly ❤️`;

let i = 0;
function typeText() {
  if (i < text.length) {
    document.getElementById("typeText").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, 45);
  }
}
typeText();

/* Slideshow */
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 3000);

/* Music Reactive Glow */
const audio = document.getElementById("music");
const glow = document.querySelector(".glow");

let audioCtx, analyser, source, dataArray;

function initAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  source = audioCtx.createMediaElementSource(audio);

  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 256;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  animateGlow();
}

function animateGlow() {
  analyser.getByteFrequencyData(dataArray);
  let avg = dataArray.reduce((a, b) => a + b) / dataArray.length;

  glow.style.transform = `scale(${1 + avg / 250})`;
  glow.style.opacity = Math.min(1, avg / 180 + 0.3);

  requestAnimationFrame(animateGlow);
}

/* Gradient Shift */
let hue = 330;
setInterval(() => {
  hue = (hue + 1) % 360;
  glow.style.setProperty("--hue", hue);
}, 100);

/* Mobile Audio Start */
document.body.addEventListener("click", () => {
  if (!audioCtx) initAudio();
}, { once: true });
