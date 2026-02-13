const roomSelect = document.querySelector("#room");
const form = document.querySelector("#checkin-form");
const message = document.querySelector("#checkin-message");

document.querySelector("#year").textContent = new Date().getFullYear();

// NAV
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton?.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

// ROOM INIT
async function initializeRooms() {
    if (!localStorage.getItem("rooms")) {
        const response = await fetch("data/rooms.json");
        const rooms = await response.json();
        localStorage.setItem("rooms", JSON.stringify(rooms));
    }
}

function getRooms() {
    return JSON.parse(localStorage.getItem("rooms")) || [];
}

function saveRooms(rooms) {
    localStorage.setItem("rooms", JSON.stringify(rooms));
}

// LOAD ROOMS
async function loadRooms() {
    await initializeRooms();
    const rooms = getRooms();

    const available = rooms.filter(r => r.status === "available");

    available.forEach(room => {
        const option = document.createElement("option");
        option.value = room.number;
        option.textContent = `${room.number} – ${room.type}`;
        roomSelect.appendChild(option);
    });
}

roomSelect && loadRooms();

// CHECK-IN
form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const guest = form.guest.value;
    const roomNumber = form.room.value;

    const rooms = getRooms();
    const room = rooms.find(r => r.number === roomNumber);

    if (!room || room.status !== "available") {
        message.textContent = "❌ Room not available";
        return;
    }

    room.status = "occupied";
    saveRooms(rooms);

    const booking = {
        guest,
        room: roomNumber,
        checkin: new Date().toLocaleString()
    };

    localStorage.setItem("currentBooking", JSON.stringify(booking));

    message.textContent = `✅ ${guest} checked into Room ${roomNumber}`;
    form.reset();
    roomSelect.innerHTML = `<option value="">Choose a room</option>`;
    loadRooms();
});

const checkinForm = document.querySelector("#checkin-form");

if (checkinForm) {
    checkinForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const guestName = document.querySelector("#guest-name").value;
        const roomId = Number(document.querySelector("#room-select").value);

        const rooms = await loadRooms();
        const room = rooms.find(r => r.id === roomId);

        if (!room.available) {
            alert("Room already occupied!");
            return;
        }

        room.available = false;
        room.guest = guestName;

        saveRooms(rooms);

        alert(`${guestName} checked into ${room.name}`);
        checkinForm.reset();
    });
}

