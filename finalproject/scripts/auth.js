export function login(username, role) {
    const user = { username, role };
    localStorage.setItem("user", JSON.stringify(user));
}

export function logout() {
    localStorage.removeItem("user");
}

export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}
