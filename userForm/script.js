const coursesContainer = document.getElementById('coursesContainer');
const addCourseBtn = document.getElementById('addCourse');
const submitBtn = document.getElementById('submitRecord');

// Start with one course input visible
addNewCourseInput();

// Add a new input field for a course
addCourseBtn.addEventListener('click', addNewCourseInput);

function addNewCourseInput() {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Course code, e.g. CPSC 110';
  coursesContainer.appendChild(input);
  coursesContainer.appendChild(document.createElement('br'));
}

// Collect all inputs when submit is clicked
submitBtn.addEventListener('click', () => {
  const gpa = parseFloat(document.getElementById('gpa').value);
  const major = document.getElementById('major').value.trim();
  const year = document.getElementById('year').value;

  const courseInputs = coursesContainer.querySelectorAll('input');
  const courses = Array.from(courseInputs)
                       .map(input => input.value.trim())
                       .filter(c => c.length > 0);

  // Display collected data
  document.getElementById('recordOutput').innerHTML = `
    <p><strong>GPA:</strong> ${gpa}</p>
    <p><strong>Major:</strong> ${major}</p>
    <p><strong>Year:</strong> ${year}</p>
    <p><strong>Completed Courses:</strong> ${courses.join(', ')}</p>
  `;

  console.log({ gpa, major, year, courses }); // For testing
});
