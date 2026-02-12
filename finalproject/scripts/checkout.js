import { getGuests, saveGuests } from "./storage.js";

const container = document.querySelector("#checkout-list");

function buildCheckoutList() {
    const guests = getGuests();

    guests.forEach(guest => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p><strong>${guest.name}</strong> — Room ${guest.room}</p>
            <button data-id="${guest.id}">Check Out</button>
        `;

        container.appendChild(div);
    });
}

container?.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = Number(e.target.dataset.id);

        let guests = getGuests();
        guests = guests.filter(g => g.id !== id);

        saveGuests(guests);
        location.reload();
    }
});

buildCheckoutList();
