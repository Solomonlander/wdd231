// Set timestamp when form loads
document.getElementById("timestamp").value = new Date().toISOString();

// Open modal buttons
document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        document.getElementById(modalId).showModal();
    });
});

// Close modal buttons
document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
