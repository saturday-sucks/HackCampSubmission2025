import React, { useEffect, useState } from 'react'
import MajorSelector from './components/MajorSelector'
import ComparisonTable from './components/ComparisonTable'
import Planner from './components/Planner'


export default function App() {
const [data, setData] = useState(null)
const [selectedMajors, setSelectedMajors] = useState([])
const [takenCourses, setTakenCourses] = useState([])


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