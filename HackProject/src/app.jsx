import React, { useEffect, useState } from 'react'
import MajorSelector from './Components/MajorSelector'
import ComparisonTable from './Components/ComparisonTable'
import Planner from './Components/Planner'

const UserForm = ({ onSubmit, onCancel }) => {
  const [gpa, setGpa] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [courses, setCourses] = useState(['']);

  const addCourse = () => {
    setCourses([...courses, '']);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const updateCourse = (index, value) => {
    const newCourses = [...courses];
    newCourses[index] = value;
    setCourses(newCourses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty courses
    const filteredCourses = courses.filter(c => c.trim() !== '');
    
    // Pass the data back to App component
    onSubmit({
      gpa,
      major,
      year,
      takenCourses: filteredCourses
    });
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Enter Your Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>GPA:</label>
            <input 
              type="number" 
              step="0.1"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              placeholder="Enter your GPA"
            />
          </div>

          <div className="form-group">
            <label>Major:</label>
            <input 
              type="text" 
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="Enter your major"
            />
          </div>

          <div className="form-group">
            <label>Year:</label>
            <input 
              type="text" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter your year"
            />
          </div>

          <div className="form-group">
            <label>Courses Taken:</label>
            {courses.map((course, index) => (
              <div key={index} className="course-field">
                <input
                  type="text"
                  value={course}
                  onChange={(e) => updateCourse(index, e.target.value)}
                  placeholder="Course code (e.g., CPSC 110)"
                />
                {courses.length > 1 && (
                  <button type="button" onClick={() => removeCourse(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addCourse}>
              Add Another Course
            </button>
          </div>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function App() {
const [data, setData] = useState(null)
const [selectedMajors, setSelectedMajors] = useState([])
const [takenCourses, setTakenCourses] = useState([])

// For showing/hiding the user form
const [showForm, setShowForm] = useState(false);


useEffect(() => {
fetch('/src/data/courses.json')
.then(r => r.json())
.then(setData)
.catch(err => console.error('Failed to load courses.json', err))
}, [])


if (!data) return <div className="app">Loading data...</div>


return (
<div className="app">
<header>
<h1>UBC Major Planner</h1>
<p>Select majors to compare requirements, then mark courses taken/planned.</p>
</header>


<main>

{/* Button to open user form */}
<button onClick={() => setShowForm(true)}>Enter Your Info</button>

{/* Show form only when needed */}
{showForm && (
  <UserForm
    onSubmit={(userData) => {
      // update courses from form
      setTakenCourses(userData.takenCourses || []);
      // hide the form after submit
      setShowForm(false);
    }}
    onCancel={() => setShowForm(false)}
  />
)}

<MajorSelector
majors={data}
selected={selectedMajors}
setSelected={setSelectedMajors}
/>


<section className="results">
<ComparisonTable
majors={data}
selectedMajors={selectedMajors}
takenCourses={takenCourses}
setTakenCourses={setTakenCourses}
/>


<Planner
majors={data}
selectedMajors={selectedMajors}
takenCourses={takenCourses}
setTakenCourses={setTakenCourses}
/>
</section>
</main>



</div>
)
}