
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