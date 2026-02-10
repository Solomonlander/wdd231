// ====== HAMBURGER MENU ======
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
});

// ====== FOOTER YEAR ======
document.querySelector("#year").textContent = new Date().getFullYear();

// ====== VISIT MESSAGE (LOCAL STORAGE) ======
const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! This is your first visit.";
} else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    visitMessage.textContent =
        days === 0
            ? "Welcome back! You visited today."
            : `Welcome back! It's been ${days} day(s) since your last visit.`;
}

localStorage.setItem("lastVisit", now);
