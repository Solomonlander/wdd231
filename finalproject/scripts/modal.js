export function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.showModal();
}

export function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.close();
}
