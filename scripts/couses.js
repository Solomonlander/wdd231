const courses = [
    { code: "CSE110", name: "Introduction to Programming", credits: 2, completed: true },
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, completed: false },
    { code: "CSE111", name: "Programming with Functions", credits: 2, completed: false }
];

const courseList = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(courseArray) {
    courseList.innerHTML = "";

    courseArray.forEach(course => {
        const li = document.createElement("li");
        li.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;

        if (course.completed) {
            li.classList.add("completed");
        }

        courseList.appendChild(li);
    });

    calculateCredits(courseArray);
}

function calculateCredits(courseArray) {
    const credits = courseArray.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = credits;
}

/* FILTER BUTTONS (NO inline onclick) */
document.getElementById("allBtn").addEventListener("click", () => {
    displayCourses(courses);
});

document.getElementById("cseBtn").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.code.startsWith("CSE")));
});

document.getElementById("wddBtn").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.code.startsWith("WDD")));
});

/* INITIAL LOAD */
displayCourses(courses);
