const directory = document.getElementById("directory");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

async function loadMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <div>
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
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

document.getElementById("last-modified").textContent = document.lastModified;
document.getElementById("copyright-year").textContent =
    new Date().getFullYear();

loadMembers();
