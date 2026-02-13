/* main.js */

// ================= HAMBURGER MENU =================
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
    });
}

// ================= FOOTER YEAR =================
const yearEl = document.querySelector("#year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// ================= LOGIN SYSTEM =================
const loginForm = document.querySelector("#login-form");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.querySelector("#username").value;
        const role = document.querySelector("#role").value;

        const user = { username, role };
        localStorage.setItem("homsUser", JSON.stringify(user));

        alert(`Logged in as ${role}`);
        window.location.reload();
    });
}

// ================= LOAD / SAVE ROOMS =================
async function loadRooms() {
    const storedRooms = localStorage.getItem("roomsData");

    if (storedRooms) {
        return JSON.parse(storedRooms);
    }

    const response = await fetch("data/rooms.json");
    const rooms = await response.json();

    localStorage.setItem("roomsData", JSON.stringify(rooms));
    return rooms;
}

function saveRooms(rooms) {
    localStorage.setItem("roomsData", JSON.stringify(rooms));
}

// ================= AVAILABILITY DISPLAY =================
async function displayAvailability() {
    const preview = document.querySelector("#availability-preview");
    if (!preview) return;

    const rooms = await loadRooms();
    preview.innerHTML = "";

    rooms.forEach(room => {
        const card = document.createElement("div");
        card.classList.add("availability-card");

        const statusClass = room.available ? "available" : "occupied";

        card.innerHTML = `
            <h3>${room.name}</h3>
            <p>Type: ${room.type}</p>
            <p>Price: ₦${room.price}</p>
            <p class="${statusClass}">
                ${room.available ? "Available" : `Occupied (${room.guest})`}
            </p>
        `;

        preview.appendChild(card);
    });
}
displayAvailability();

// ================= CHECK-IN =================
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
        displayAvailability();
    });
}

// ================= CHECK-OUT =================
const checkoutForm = document.querySelector("#checkout-form");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const roomId = Number(document.querySelector("#checkout-room").value);

        const rooms = await loadRooms();
        const room = rooms.find(r => r.id === roomId);

        if (room.available) {
            alert("Room already available!");
            return;
        }

        const guest = room.guest;

        room.available = true;
        room.guest = null;

        saveRooms(rooms);
        alert(`${guest} checked out from ${room.name}`);

        checkoutForm.reset();
        displayAvailability();
    });
}

// ================= ADMIN DASHBOARD =================
const adminDashboard = document.querySelector("#admin-dashboard");

async function renderAdminDashboard() {
    if (!adminDashboard) return;

    const user = JSON.parse(localStorage.getItem("homsUser"));

    if (!user || user.role !== "admin") {
        adminDashboard.innerHTML = "<p>Access Denied (Admin Only)</p>";
        return;
    }

    const rooms = await loadRooms();
    adminDashboard.innerHTML = "<h2>Admin Room Control</h2>";

    rooms.forEach(room => {
        const row = document.createElement("div");

        row.innerHTML = `
            <strong>${room.name}</strong>
            <span> — ${room.available ? "Available" : "Occupied"}</span>
            <button data-id="${room.id}" class="toggle-room">
                Toggle Status
            </button>
        `;

        adminDashboard.appendChild(row);
    });

    document.querySelectorAll(".toggle-room").forEach(button => {
        button.addEventListener("click", async () => {
            const id = Number(button.dataset.id);

            const rooms = await loadRooms();
            const room = rooms.find(r => r.id === id);

            room.available = !room.available;
            if (room.available) room.guest = null;

            saveRooms(rooms);
            renderAdminDashboard();
            displayAvailability();
        });
    });
}
renderAdminDashboard();

// ================= STAFF PERMISSIONS =================
const user = JSON.parse(localStorage.getItem("homsUser"));

if (user && user.role === "staff") {
    const adminLink = document.querySelector('a[href="admin.html"]');
    if (adminLink) adminLink.style.display = "none";
}
