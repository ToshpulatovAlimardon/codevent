window.addEventListener("DOMContentLoaded", () => {
  // Countdown
  const startingHour = 17;
  let time = startingHour * 3600 + 300;

  const countdownEl = document.querySelector("#countdown");

  setInterval(updateCountdown, 1000);

  function updateCountdown() {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time / 60) % 60);
    let seconds = time % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdownEl.innerHTML = `2kun ${hours}:${minutes}:${seconds}`;
    time--;
  }

  // Carusel
  const wrapper = document.querySelector(".wrapper");
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const firstCardWith = carousel.querySelector(".card").offsetWidth;
  const carouselChildrens = [...carousel.children];

  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  let cardPerView = Math.round(carousel.offsetWidth / firstCardWith);

  carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id === "left" ? -firstCardWith : firstCardWith;
    });
  });

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const autoPlay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWith), 2500);
  };
  autoPlay();

  const InfiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", InfiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  // Modul
  const selectTitles = document.querySelectorAll(".modul .select-title");

  selectTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const list = title.nextElementSibling;
      list.classList.toggle("hide");
    });
  });
});
