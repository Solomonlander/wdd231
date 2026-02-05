const spotlightContainer = document.querySelector("#spotlight-container");
const dataURL = "data/members.json";

async function loadSpotlights() {
    try {
        const response = await fetch(dataURL);
        if (!response.ok) throw new Error("Fetch failed");

        const data = await response.json();

        // Gold (3) & Silver (2)
        const qualified = data.members.filter(
            member => member.level === 2 || member.level === 3
        );

        shuffleArray(qualified);

        const selected = qualified.slice(0, 3);
        spotlightContainer.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("section");

            const name = document.createElement("h3");
            name.textContent = member.name;

            const img = document.createElement("img");
            img.src = `images/${member.image}`;
            img.alt = member.name;
            img.loading = "lazy";

            const desc = document.createElement("p");
            desc.textContent = member.description;

            const link = document.createElement("a");
            link.href = member.website;
            link.textContent = "Visit Website";
            link.target = "_blank";
            link.rel = "noopener";

            card.append(name, img, desc, link);
            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight error:", error);
        spotlightContainer.innerHTML = "<p>Member spotlights unavailable.</p>";
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

loadSpotlights();
