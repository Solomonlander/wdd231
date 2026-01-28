const spotlightContainer = document.querySelector("#spotlight-container");
const membersURL = "data/members.json";

async function loadSpotlights() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error("Members data not found");
        }

        const data = await response.json();

        const qualifiedMembers = data.members.filter(member =>
            member.membership === "Gold" || member.membership === "Silver"
        );

        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("section");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <p>${member.description}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        spotlightContainer.textContent = "Member spotlights unavailable.";
    }
}

loadSpotlights();
