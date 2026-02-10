const message = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("visit");

if (!lastVisit) {
    message.textContent = "Welcome to HOMS!";
} else {
    message.textContent = "Welcome back!";
}

localStorage.setItem("visit", Date.now());

document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector(".navigation").classList.toggle("open");
});

document.querySelector("#year").textContent = new Date().getFullYear();
