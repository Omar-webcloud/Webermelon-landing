// Templates
(() => {
  const slider = document.querySelector(".template-card-container");
  const buttons = document.querySelectorAll(".temp-list");
  const gap = 16;

  let originalCards = Array.from(slider.children);
  let currentIndex = 0;
  let interval;
  let activeCategory = null;

  originalCards.forEach((card) => {
    slider.appendChild(card.cloneNode(true));
  });

  const allCards = Array.from(slider.children);

  function cardWidth() {
    return allCards[0].offsetWidth + gap;
  }

  currentIndex = 0;
  slider.style.transform = `translateX(-${currentIndex * cardWidth()}px)`;

  function moveTo(index, smooth = true) {
    slider.style.transition = smooth ? "transform 0.6s ease" : "none";
    slider.style.transform = `translateX(-${index * cardWidth()}px)`;
  }

  function nextSlide() {
    currentIndex++;
    moveTo(currentIndex);

    if (currentIndex >= originalCards.length) {
      setTimeout(() => {
        currentIndex = 0;
        moveTo(currentIndex, false);
      }, 600);
    }
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(nextSlide, 3000);
  }

  function stopAuto() {
    if (interval) clearInterval(interval);
  }

  startAuto();

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      if (activeCategory === category) {
        btn.classList.remove("active");
        activeCategory = null;
        startAuto();
        return;
      }

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = category;

      stopAuto();

      const index = allCards.findIndex(
        (card) => card.dataset.category === category,
      );

      if (index !== -1) {
        currentIndex = index;
        moveTo(currentIndex);
      }
    });
  });

  window.addEventListener("resize", () => {
    moveTo(currentIndex, false);
  });
})();

// Hover
const favContents = document.querySelectorAll(".favorite-content");

favContents.forEach((content) => {
  const img = content.querySelector(".favorite-image");

  content.addEventListener("mousemove", (e) => {
    const rect = content.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    img.style.left = x + "px";
    img.style.top = y + "px";
  });

  content.addEventListener("mouseleave", () => {
    img.style.opacity = "0";
  });

  content.addEventListener("mouseenter", () => {
    img.style.opacity = "1";
  });
});

// Navigation
const navItems = document.querySelectorAll(".nav-items li");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");
  });
});

// Slider
const sliders = document.querySelectorAll(".slider");
const fruitsContainer = document.querySelector(".fruits");
const upBtn = document.querySelector(".arrow-up");
const downBtn = document.querySelector(".arrow-down");
const completeBg = document.querySelector(".completed-project-bg");
const fruitItems = document.querySelectorAll(".fruit-list li");
const semiCircle = document.querySelector(".semi-circle-down");

let currentIndex = 0;

function getSliderHeight(index) {
  if (index === 0) return 220;
  if (index === 1) return 310;

  if (window.matchMedia("(max-width: 576px)").matches) {
    return 240;
  } else if (window.matchMedia("(max-width: 768px)").matches) {
    return 255;
  } else {
    return 340;
  }
}

const bgColors = [
  "#443747",
  "#588c43",
  "#504959",
  "#9b3327",
  "#c74928",
  "#c71e3e",
];

function updateArrowOpacity() {
  upBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
  downBtn.style.opacity = currentIndex === sliders.length - 1 ? "0.5" : "1";
}

function setActiveFruit() {
  fruitItems.forEach((item) => item.classList.remove("active"));
  fruitItems[currentIndex].classList.add("active");
}

function updateSlider() {
  let moveY = 0;

  for (let i = 0; i < currentIndex; i++) {
    moveY += getSliderHeight(i);
  }

  fruitsContainer.style.transform = `translateY(-${moveY}px)`;

  completeBg.style.backgroundColor = bgColors[currentIndex];

  const step = 22.5;
  semiCircle.style.setProperty("--fill", `${150 + currentIndex * step}deg`);

  setActiveFruit();
  updateArrowOpacity();
}

fruitItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    updateSlider();
  });
});

downBtn.addEventListener("click", () => {
  if (currentIndex < sliders.length - 1) {
    currentIndex++;
    updateSlider();
  }
});

upBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

window.addEventListener("resize", updateSlider);

updateSlider();
