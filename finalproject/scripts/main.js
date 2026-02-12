// ================= HAMBURGER MENU =================
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
    });
}

// ================= FOOTER YEAR =================
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ================= VISIT MESSAGE (LOCAL STORAGE) =================
const visitMessage = document.querySelector("#visit-message");

if (visitMessage) {
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
}

// ================= SIMPLE AUTH SYSTEM =================

// Demo users (for academic project only)
const demoUsers = [
    { username: "guest", password: "1234", role: "guest" },
    { username: "staff", password: "1234", role: "staff" },
    { username: "admin", password: "1234", role: "admin" }
];

// DOM elements (optional – only if present in HTML)
const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");
const userDisplay = document.querySelector("#user-display");
const logoutButton = document.querySelector("#logout");

// Check login state on load
const currentUser = JSON.parse(localStorage.getItem("homsUser"));

if (currentUser && userDisplay) {
    userDisplay.textContent = `Logged in as: ${currentUser.username} (${currentUser.role})`;
}

// Handle login
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        const user = demoUsers.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            localStorage.setItem("homsUser", JSON.stringify(user));

            if (loginMessage) {
                loginMessage.textContent = "Login successful!";
            }

            location.reload(); // Refresh UI
        } else {
            if (loginMessage) {
                loginMessage.textContent = "Invalid credentials.";
            }
        }
    });
}

// Handle logout
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("homsUser");
        location.reload();
    });
}

// ================= ROLE-BASED UI CONTROL =================
function protectAdminFeatures() {
    const adminOnly = document.querySelectorAll(".admin-only");

    if (!currentUser || currentUser.role !== "admin") {
        adminOnly.forEach(el => el.style.display = "none");
    }
}

protectAdminFeatures();
