const directory = document.getElementById("directory");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

const dataURL = "data/members.json";

async function loadMembers() {
    try {
        const response = await fetch(dataURL);
        if (!response.ok) throw new Error("Failed to load members");

        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Directory error:", error);
        directory.innerHTML = "<p>Member directory unavailable.</p>";
    }
}

function displayMembers(members) {
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const img = document.createElement("img");
        img.src = `images/${member.image}`;
        img.alt = member.name;
        img.loading = "lazy";

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const link = document.createElement("a");
        link.href = member.website;
        link.textContent = "Visit Website";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const level = document.createElement("p");
        level.textContent = `Membership Level: ${member.level}`;

        const desc = document.createElement("p");
        desc.textContent = member.description;

        card.append(img, name, address, phone, link, level, desc);
        directory.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => {
    directory.classList.remove("list");
    directory.classList.add("grid");
});

listBtn.addEventListener("click", () => {
    directory.classList.remove("grid");
    directory.classList.add("list");
});

loadMembers();
