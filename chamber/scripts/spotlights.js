const spotlightContainer = document.querySelector("#spotlight-container");
const dataURL = "data/members.json";

async function loadSpotlights() {
    try {
        const response = await fetch(dataURL);
        if (!response.ok) throw new Error("Fetch failed");

        const data = await response.json();

        // Gold (3) & Silver (2) members only
        const qualified = data.members.filter(
            member => member.level === 2 || member.level === 3
        );

        // Randomize
        qualified.sort(() => 0.5 - Math.random());

        // Select 2–3 members
        const selected = qualified.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("section");

            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="images/${member.image}" alt="${member.name}">
                <p>${member.description}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight error:", error);
        spotlightContainer.innerHTML = "<p>Member spotlights unavailable.</p>";
    }
}

loadSpotlights();
