const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

document.getElementById("last-modified").textContent = document.lastModified;
document.getElementById("copyright-year").textContent =
    new Date().getFullYear();
