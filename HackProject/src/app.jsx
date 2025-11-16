import React, { useEffect, useState } from 'react';
import MajorSelector from './Components/MajorSelector';
import ComparisonTable from './Components/ComparisonTable';
import Planner from './Components/Planner';

const printPlanner = () => {
  window.print();
};

const UserForm = ({ onSubmit, onCancel }) => {
  const [gpa, setGpa] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [courses, setCourses] = useState(['']);

  const addCourse = () => setCourses([...courses, '']);
  const removeCourse = (index) => setCourses(courses.filter((_, i) => i !== index));
  const updateCourse = (index, value) => {
    const newCourses = [...courses];
    newCourses[index] = value;
    setCourses(newCourses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredCourses = courses.filter(c => c.trim() !== '');
    onSubmit({
      gpa,
      major,
      year,
      takenCourses: filteredCourses,
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
                  <button type="button" onClick={() => removeCourse(index)}>Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addCourse}>Add Another Course</button>
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
  const [data, setData] = useState(null);
  const [selectedMajors, setSelectedMajors] = useState([]);
  const [takenCourses, setTakenCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch('/src/data/courses.json')
      .then(r => r.json())
      .then(setData)
      .catch(err => console.error('Failed to load courses.json', err));
  }, []);

  if (!data) return <div className="app">Loading data...</div>;

  return (
    <div className="app">
      {/* Banner from second implementation */}
      <header className="Banner">
        <img className="Banner" src="https://live.staticflickr.com/8027/29016431894_d3a9befbfd_h.jpg" />
      </header>
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

      <main>
        <button className="enter-info-btn" onClick={() => setShowForm(true)}>
          Enter Your Info
        </button>
        <button className="download-btn" onClick={printPlanner}>
          📄 Download Planner PDF
        </button>

        {showForm && (
          <UserForm
            onSubmit={(userData) => {
              setTakenCourses(userData.takenCourses || []);
              setUserInfo({
                gpa: userData.gpa,
                major: userData.major,
                year: userData.year,
              });
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
  );
}
