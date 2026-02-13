const summary = document.querySelector("#bill-summary");
const checkoutBtn = document.querySelector("#checkout-btn");

document.querySelector("#year").textContent = new Date().getFullYear();

// ROOM HELPERS
function getRooms() {
    return JSON.parse(localStorage.getItem("rooms")) || [];
}

function saveRooms(rooms) {
    localStorage.setItem("rooms", JSON.stringify(rooms));
}

const booking = JSON.parse(localStorage.getItem("currentBooking"));

if (booking && summary) {
    summary.innerHTML = `
        <p><strong>Guest:</strong> ${booking.guest}</p>
        <p><strong>Room:</strong> ${booking.room}</p>
        <p><strong>Check-In:</strong> ${booking.checkin}</p>
    `;
} else {
    summary.innerHTML = "<p>No active guest.</p>";
}

checkoutBtn?.addEventListener("click", () => {
    const rooms = getRooms();
    const room = rooms.find(r => r.number === booking.room);

    if (room) {
        room.status = "available";
        saveRooms(rooms);
    }

    localStorage.removeItem("currentBooking");

    alert("✅ Guest checked out");
    location.reload();
});

const checkoutForm = document.querySelector("#checkout-form");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const roomId = Number(document.querySelector("#checkout-room").value);

        const rooms = await loadRooms();
        const room = rooms.find(r => r.id === roomId);

        if (room.available) {
            alert("Room is already available!");
            return;
        }

        const guest = room.guest;

        room.available = true;
        room.guest = null;

        saveRooms(rooms);

        alert(`${guest} checked out from ${room.name}`);
        checkoutForm.reset();
    });
}

