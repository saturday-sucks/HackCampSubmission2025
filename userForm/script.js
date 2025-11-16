document.addEventListener("DOMContentLoaded", () => {
    // --- Global arrays ---
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
  
    createCourseInput();
  
    addCourseBtn.addEventListener("click", () => createCourseInput());
  
    submitBtn.addEventListener("click", () => {
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
  
      courses.forEach(c => {
        if (!takenCourses.includes(c)) takenCourses.push(c);
      });
  
      if (userRecord.major && !selectedMajors.includes(userRecord.major)) {
        selectedMajors.push(userRecord.major);
      }
  
      redrawPlanner();
    });
  
    function redrawPlanner() {
      recordOutput.innerHTML = "";
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
  });
  