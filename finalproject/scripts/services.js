const container = document.querySelector("#services");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");

async function getServices() {
    try {
        const response = await fetch("data/services.json");
        const data = await response.json();

        data.forEach(service => {
            const card = document.createElement("article");
            card.innerHTML = `
        <h3>${service.name}</h3>
        <p>${service.category}</p>
        <p>${service.price}</p>
        <p>${service.status}</p>
        <button>Details</button>
      `;

            card.querySelector("button").addEventListener("click", () => {
                modalContent.textContent = `${service.name} is a ${service.category} service costing ${service.price}.`;
                modal.showModal();
            });

            container.appendChild(card);
        });

    } catch (error) {
        container.textContent = "Unable to load services.";
    }
}

getServices();
