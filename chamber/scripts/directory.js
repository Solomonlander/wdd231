const directory = document.getElementById("directory");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to load members");

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        directory.innerHTML = "<p>Member directory unavailable.</p>";
        console.error(error);
    }
}

function displayMembers(members) {
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}" loading="lazy">
          <div>
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
            <p>Membership Level: ${member.level}</p>
            <p>${member.description}</p>
          </div>
        `;

        directory.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => {
    directory.className = "grid";
});

listBtn.addEventListener("click", () => {
    directory.className = "list";
});

loadMembers();
