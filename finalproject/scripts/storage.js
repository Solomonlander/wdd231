export function getGuests() {
    return JSON.parse(localStorage.getItem("guests")) || [];
}

export function saveGuests(guests) {
    localStorage.setItem("guests", JSON.stringify(guests));
}
