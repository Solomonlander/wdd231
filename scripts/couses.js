const courses = [
    { code: "CSE110", credits: 2, completed: true },
    { code: "WDD130", credits: 2, completed: true },
    { code: "WDD131", credits: 3, completed: true },
    { code: "WDD231", credits: 3, completed: false }
];

const courseContainer = document.getElementById("courses");
const creditDisplay = document.getElementById("totalCredits");

function displayCourses(list) {
    courseContainer.innerHTML = "";

    list.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course");
        if (course.completed) div.classList.add("completed");
        div.textContent = course.code;
        courseContainer.appendChild(div);
    });

    const totalCredits = list.reduce((sum, course) => sum + course.credits, 0);
    creditDisplay.textContent = totalCredits;
}

function filterCourses(type) {
    if (type === "all") {
        displayCourses(courses);
    } else {
        displayCourses(courses.filter(course => course.code.startsWith(type)));
    }
}

displayCourses(courses);
