const startingHour = 24;
let time = startingHour * 3600;

const countdownEl = document.querySelector("#countdown");

setInterval(updateCountdown, 1000);

function updateCountdown() {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor(time / 60 % 60);
  let seconds = time % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdownEl.innerHTML = `${hours}h:${minutes}m:${seconds}s`;
  time--;
}
