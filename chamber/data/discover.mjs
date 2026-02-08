/* discover.mjs */

export const places = [
    {
        name: "Lekki Conservation Centre",
        image: "lekki-conservation.webp",
        address: "Lekki Peninsula, Lagos",
        description: "A protected natural reserve featuring Africa’s longest canopy walkway."
    },
    {
        name: "Nike Art Gallery",
        image: "nike-art-gallery.webp",
        address: "Lekki, Lagos",
        description: "One of the largest art galleries in West Africa showcasing Nigerian art."
    },
    {
        name: "National Theatre",
        image: "national-theatre.webp",
        address: "Iganmu, Lagos",
        description: "A historic cultural landmark hosting major events and performances."
    },
    {
        name: "Tarkwa Bay Beach",
        image: "tarkwa-bay.webp",
        address: "Lagos Island",
        description: "A popular beach destination accessible only by boat."
    },
    {
        name: "Freedom Park",
        image: "freedom-park.webp",
        address: "Broad Street, Lagos Island",
        description: "A former colonial prison turned cultural and recreational park."
    },
    {
        name: "Elegushi Beach",
        image: "elegushi-beach.webp",
        address: "Lekki, Lagos",
        description: "A lively private beach known for nightlife and entertainment."
    },
    {
        name: "Lagos Lagoon",
        image: "lagos-lagoon.webp",
        address: "Lagos Mainland",
        description: "A major lagoon system supporting fishing and water transport."
    },
    {
        name: "Eko Atlantic City",
        image: "eko-atlantic.webp",
        address: "Victoria Island, Lagos",
        description: "A modern city built on reclaimed land along the Atlantic Ocean."
    }
];

/* ================= DOM ELEMENTS ================= */

const grid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

/* ================= VISIT MESSAGE (localStorage) ================= */

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysBetween < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        visitMessage.textContent =
            `Welcome back! You last visited ${daysBetween} day${daysBetween > 1 ? "s" : ""} ago.`;
    }
}

localStorage.setItem("lastVisit", now);

/* ================= BUILD DISCOVER CARDS ================= */

function buildCards() {
    places.forEach((place) => {
        const card = document.createElement("section");
        card.classList.add("discover-card");

        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = `images/${place.image}`;
        img.alt = place.name;
        img.loading = "lazy";
        img.width = 300;
        img.height = 200;

        const caption = document.createElement("figcaption");
        caption.textContent = place.name;

        figure.appendChild(img);
        figure.appendChild(caption);

        const address = document.createElement("p");
        address.innerHTML = `<strong>Location:</strong> ${place.address}`;

        const desc = document.createElement("p");
        desc.textContent = place.description;

        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(desc);

        grid.appendChild(card);
    });
}

buildCards();

/* ================= FOOTER YEAR ================= */

const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

/* ================= HAMBURGER MENU ================= */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}
