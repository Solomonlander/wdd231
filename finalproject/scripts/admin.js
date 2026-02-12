import { getGuests } from "./storage.js";
import { getUser } from "./auth.js";

const user = getUser();

if (!user || user.role !== "admin") {
    window.location.href = "index.html";
}

const stats = document.querySelector("#admin-stats");

const guests = getGuests();

stats.innerHTML = `
    <p>Total Guests Checked In: ${guests.length}</p>
`;
