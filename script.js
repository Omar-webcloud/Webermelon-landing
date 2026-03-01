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
