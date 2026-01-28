const spotlightContainer = document.getElementById("spotlights");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        const qualified = members.filter(
            member => member.level === "Gold" || member.level === "Silver"
        );

        const randomMembers = qualified
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        randomMembers.forEach(member => {
            const card = document.createElement("section");
            card.classList.add("member-card");

            card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><strong>${member.level} Member</strong></p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight error:", error);
    }
}

loadSpotlights();
