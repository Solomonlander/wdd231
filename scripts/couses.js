const courses = [
    { code: "CSE110", name: "Introduction to Programming", credits: 2, completed: true },
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, completed: false },
    { code: "WDD231", name: "Front-End Development I", credits: 3, completed: false }
];

const courseList = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(courseArray) {
    courseList.innerHTML = "";

    courseArray.forEach(course => {
        const li = document.createElement("li");
        li.classList.toggle("completed", course.completed);

        li.innerHTML = `
            ${course.code} – ${course.name}<br>
            Credits: ${course.credits}
            ${course.completed ? '<span class="done"> ✔ Completed</span>' : ''}
        `;

        courseList.appendChild(li);
    });

    updateCredits(courseArray);
}

function updateCredits(courseArray) {
    const credits = courseArray.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = credits;
}

/* SUBJECT FILTERS */
const subjectButtons = document.querySelectorAll(".filters button");
subjectButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        subjectButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        if (btn.id === "allBtn") displayCourses(courses);
        if (btn.id === "cseBtn") displayCourses(courses.filter(c => c.code.startsWith("CSE")));
        if (btn.id === "wddBtn") displayCourses(courses.filter(c => c.code.startsWith("WDD")));
    });
});

/* INDIVIDUAL COURSE FILTERS */
const individualButtons = document.querySelectorAll(".filter button");
individualButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        individualButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        displayCourses(courses.filter(c => c.code === btn.id));
    });
});

/* INITIAL LOAD */
displayCourses(courses);
