import { getGuests, saveGuests } from "./storage.js";

const form = document.querySelector("#checkin-form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector("#guest-name").value;
        const room = document.querySelector("#room-number").value;

        const guests = getGuests();

        const newGuest = {
            id: Date.now(),
            name,
            room,
            checkinDate: new Date().toLocaleDateString()
        };

        guests.push(newGuest);
        saveGuests(guests);

        alert("Guest Checked In!");
        form.reset();
    });
}
