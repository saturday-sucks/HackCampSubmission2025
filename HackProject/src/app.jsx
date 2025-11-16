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
             min="0"
             max="4.33"
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
            <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Select your year</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
            </select>
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
const [userInfo, setUserInfo] = useState(null);

const printPlanner = () => {
  // Create a hidden iframe for printing
  const printFrame = document.createElement('iframe');
  printFrame.style.position = 'fixed';
  printFrame.style.right = '0';
  printFrame.style.bottom = '0';
  printFrame.style.width = '0';
  printFrame.style.height = '0';
  printFrame.style.border = 'none';
  
  document.body.appendChild(printFrame);

  const printDocument = printFrame.contentWindow.document;
  
  printDocument.open();
  printDocument.write(`
    <html>
      <head>
        <title>UBC Major Planner</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .major { margin-bottom: 25px; }
          .year { margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
          .course { margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
        </style>
      </head>
      <body>
        <h1>UBC Major Planner</h1>
        <h2>Year-by-Year Planner</h2>
        ${selectedMajors.length === 0 ? 
          '<p>Select at least one major to see planner.</p>' : 
          `
          <div>
            ${data
              .filter(m => selectedMajors.includes(m.major))
              .map(m => `
                <div class="major">
                  <h3>${m.major}</h3>
                  ${m.years.map(y => `
                    <div class="year">
                      <h4>${y.year}</h4>
                      <div>
                        ${(y.required_courses || []).map(c => {
                          const courseOptions = c.options || [[c.course]];
                          const courseDisplay = courseOptions.map(opt => opt.join(' + ')).join(' / ');
                          const isTaken = takenCourses.some(taken => courseDisplay.includes(taken));
                          return `
                          <div class="course">
                            <div style="display: flex; align-items: flex-start; gap: 8px;">
                              <div style="font-size: 16px;">${isTaken ? '☑' : '☐'}</div>
                              <div>
                                <div style="font-weight: bold; margin-bottom: 4px;">${courseDisplay}</div>
                                <div style="color: #666; font-size: 14px;">(${c.credits || '?'} credits) — ${c.major || m.major}</div>
                              </div>
                            </div>
                          </div>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              `).join('')}
          </div>
          `
        }
      </body>
    </html>
  `);
  printDocument.close();

  // Print from the iframe
  printFrame.contentWindow.focus();
  printFrame.contentWindow.print();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(printFrame);
  }, 100);
};

useEffect(() => {
fetch('/src/data/courses.json')
.then(r => r.json())
.then(setData)
.catch(err => console.error('Failed to load courses.json', err))
}, [])




if (!data) return <div className="app">Loading data...</div>




return (
<div className="app">
<header className="header-container">
  <div className="header-text">
    <h1>UBC Major Planner</h1>
    <p>Select majors to compare requirements, then mark courses taken/planned.</p>
  </div>
  {userInfo && (
    <div className="user-display">
      <h3>Your Information</h3>
      <p><strong>Major:</strong> {userInfo.major}</p>
      <p><strong>Year:</strong> {userInfo.year}</p>
      <p><strong>GPA:</strong> {userInfo.gpa}</p>
    </div>
  )}
</header>

<main>
  <button className="enter-info-btn" onClick={() => setShowForm(true)}>
    Enter Your Info
  </button>
  <button className="download-btn" onClick={printPlanner}>
  📄 Download Planner PDF
   </button>


{/* Show form only when needed */}
{showForm && (
 <UserForm
   onSubmit={(userData) => {
     // update courses from form
     setTakenCourses(userData.takenCourses || []);


       setUserInfo({
           gpa: userData.gpa,
           major: userData.major,
           year: userData.year
       });


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




<footer>
<small>Sample app — adapt the JSON file in <code>src/data/courses.json</code> to match your real database.</small>
</footer>
</div>
)
}
