const form = document.querySelector("#login-form");
const message = document.querySelector("#login-message");

document.querySelector("#year").textContent = new Date().getFullYear();

// Demo users (for school project)
const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "staff", password: "staff123", role: "staff" }
];

form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    const user = users.find(u =>
        u.username === username && u.password === password
    );

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        message.textContent = "✅ Login successful";

        setTimeout(() => {
            location.href = user.role === "admin"
                ? "admin.html"
                : "index.html";
        }, 800);
    } else {
        message.textContent = "❌ Invalid login";
    }
});
