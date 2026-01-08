const courses = [
    { code: "CSE110", credits: 2, completed: true },
    { code: "WDD130", credits: 2, completed: true },
    { code: "WDD131", credits: 3, completed: true },
    { code: "WDD231", credits: 3, completed: false }
];

const courseContainer = document.getElementById("courses");
const creditDisplay = document.getElementById("totalCredits");

function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course");
        if (course.completed) div.classList.add("completed");
        div.textContent = course.code;
        courseContainer.appendChild(div);
    });

    const total = courseList.reduce((sum, c) => sum + c.credits, 0);
    creditDisplay.textContent = total;
}

function filterCourses(type) {
    if (type === "all") {
        displayCourses(courses);
    } else {
        displayCourses(courses.filter(c => c.code.startsWith(type)));
    }
}

displayCourses(courses);
