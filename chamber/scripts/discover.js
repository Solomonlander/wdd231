import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const messageBox = document.querySelector("#visit-message");

/* ---------- BUILD CARDS ---------- */
places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.style.gridArea = String.fromCharCode(97 + index); // a–h

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="images/${place.image}" alt="${place.name}" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
    `;

    grid.appendChild(card);
});

/* ---------- VISIT MESSAGE ---------- */
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    messageBox.textContent =
        days < 1 ? "Back so soon! Awesome!" : `You last visited ${days} day(s) ago.`;
}

localStorage.setItem("lastVisit", now);
