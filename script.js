
// navbar
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
    item.addEventListener("click", function() {
       
        document.querySelector(".nav-item.active")?.classList.remove("active");
        
        
        this.classList.add("active");
    });
});


const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    navToggle.classList.toggle("open");
});


const navLinks = document.querySelectorAll(".nav-item");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});





// hover
const projectContainers = document.querySelectorAll(".project-container");

projectContainers.forEach(container => {
  const img = container.querySelector('.project-img');
  if (!img) return;

  container.addEventListener('mouseenter', () => {
    img.style.display = 'block';
  });

  container.addEventListener('mouseleave', () => {
    img.style.display = 'none';
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    img.style.left = x + 'px';
    img.style.top = y + 'px';
  });
});


// swiper


 document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".temp-right", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      
    },
    breakpoints: {
      577: {
        slidesPerView: 2,
      },
    },
  });
});







//project slide

const sliders = document.querySelectorAll(".slider");
const fruitsContainer = document.querySelector(".fruits"); 
const upBtn = document.querySelector(".arrow-up");
const downBtn = document.querySelector(".arrow-down");
const completeBg = document.querySelector(".completed-project-bg");
const fruitItems = document.querySelectorAll(".fruit-list li");
const semiCircle = document.querySelector(".semi-circle-down");

let currentIndex = 0;


const bgColors = ["#443747", "#588c43", "#504959", "#9b3327", "#c74928", "#c71e3e"];

function getSliderHeight(index) {
  
  if (index === 0) return 220;
  if (index === 1) return 310;
  return window.innerWidth <= 576 ? 240 : 340;
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

  
  fruitItems.forEach((item) => item.classList.remove("active"));
  fruitItems[currentIndex].classList.add("active");

  
  upBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
  downBtn.style.opacity = currentIndex === sliders.length - 1 ? "0.5" : "1";
}


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

fruitItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    updateSlider();
  });
});


updateSlider();
