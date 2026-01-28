const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const modifiedSpan = document.querySelector("#lastModified");
if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
}
