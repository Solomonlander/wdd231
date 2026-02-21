const container = document.querySelector("#services");
const modal = document.querySelector("#amenities-modal");
const closeBtn = document.querySelector("#close-amenities");

async function getServices() {
    try {
        const response = await fetch("data/services.json");
        const data = await response.json();

        container.innerHTML = ""; // Prevent duplication

        data.forEach(service => {
            const card = document.createElement("article");

            card.innerHTML = `
                <h3>${service.name}</h3>
                <p><strong>Category:</strong> ${service.category}</p>
                <p><strong>Price:</strong> ${service.price}</p>
                <p><strong>Status:</strong> ${service.status}</p>
                <button class="details-btn">View Amenities</button>
            `;

            card.querySelector(".details-btn").addEventListener("click", () => {
                modal.querySelector("p").textContent =
                    `${service.name} is part of our ${service.category} services. 
                     Price: ${service.price}. Status: ${service.status}.`;

                modal.showModal();
            });

            container.appendChild(card);
        });

    } catch (error) {
        container.textContent = "Unable to load services.";
        console.error("Services fetch error:", error);
    }
}

/* Close Modal */
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.close();
    });
}

getServices();