import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const messageBox = document.querySelector("#visit-message");

/* ---------- BUILD CARDS ---------- */
places.forEach((place) => {
    const card = document.createElement("section");
    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img 
                src="images/${place.image}" 
                alt="${place.name}" 
                loading="lazy"
                width="300"
                height="200"
            >
        </figure>

        <p><strong>Location:</strong> ${place.address}</p>
        <p>${place.description}</p>
    `;

    grid.appendChild(card);
});

/* ---------- VISIT MESSAGE (localStorage) ---------- */
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    messageBox.textContent =
        days < 1
            ? "Back so soon! Awesome!"
            : `Welcome back! You last visited ${days} day${days > 1 ? "s" : ""} ago.`;
}

localStorage.setItem("lastVisit", now);
