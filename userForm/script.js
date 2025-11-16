// --- Global arrays to track user data ---
let takenCourses = [];
let selectedMajors = [];

// --- Grab form elements ---
const gpaInput = document.getElementById('gpa');
const majorInput = document.getElementById('major');
const yearInput = document.getElementById('year');
const coursesContainer = document.getElementById('coursesContainer');
const addCourseBtn = document.getElementById('addCourse');
const submitBtn = document.getElementById('submitRecord');
const recordOutput = document.getElementById('recordOutput');

// --- Function to create a new course input ---
function createCourseInput(value = "") {
  const div = document.createElement("div");
  div.className = "course-field";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Course code (e.g., CPSC 110)";
  input.value = value;
  input.className = "course-input";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => div.remove());

  div.appendChild(input);
  div.appendChild(removeBtn);
  coursesContainer.appendChild(div);
}

// --- Add initial course input ---
createCourseInput();

// --- Add course on button click ---
addCourseBtn.addEventListener("click", () => createCourseInput());

// --- Handle form submission ---
submitBtn.addEventListener("click", () => {
  // Grab course values
  const courses = Array.from(coursesContainer.querySelectorAll(".course-input"))
                       .map(input => input.value)
                       .filter(c => c);

  const userRecord = {
    gpa: gpaInput.value,
    major: majorInput.value,
    year: yearInput.value,
    courses
  };

  console.log("User Record:", userRecord);

  // Update global arrays
  courses.forEach(c => {
    if (!takenCourses.includes(c)) takenCourses.push(c);
  });

  if (userRecord.major && !selectedMajors.includes(userRecord.major)) {
    selectedMajors.push(userRecord.major);
  }

  // Update the Planner display
  redrawPlanner();
});

// --- Function to update Planner display ---
function redrawPlanner() {
  recordOutput.innerHTML = ""; // clear previous

  selectedMajors.forEach(major => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${major}</h3>`;

    const ul = document.createElement("ul");
    takenCourses.forEach(course => {
      const li = document.createElement("li");
      li.textContent = course;
      ul.appendChild(li);
    });

    div.appendChild(ul);
    recordOutput.appendChild(div);
  });
}