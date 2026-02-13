const container = document.querySelector("#admin-rooms");
document.querySelector("#year").textContent = new Date().getFullYear();

function getRooms() {
    return JSON.parse(localStorage.getItem("rooms")) || [];
}

function renderRooms() {
    const rooms = getRooms();
    container.innerHTML = "";

    rooms.forEach(room => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            <h3>Room ${room.number}</h3>
            <p>${room.type}</p>
            <p>₦${room.price.toLocaleString()}</p>
            <p><strong>Status:</strong> ${room.status}</p>
        `;

        container.appendChild(card);
    });
}

container && renderRooms();
