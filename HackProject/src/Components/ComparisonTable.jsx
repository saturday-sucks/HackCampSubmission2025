import React, { useMemo, useState } from 'react'

function gatherRequirements(majorsData, selectedMajors, selectedYear) {
  const map = new Map()
  const selectedObjs = majorsData.filter(m => selectedMajors.includes(m.major))

  selectedObjs.forEach(m => {
    m.years.forEach(y => {
      if (selectedYear && selectedYear !== 'All' && y.year !== selectedYear) return

      (y.required_courses || []).forEach(c => {
        c.options.forEach(option => {
          const code = option.join(' + ')
          if (!map.has(code)) map.set(code, { course: code, byMajor: {} })
          map.get(code).byMajor[m.major] = true
        })
      })
    })
  })

  return Array.from(map.values()).sort((a, b) => a.course.localeCompare(b.course))
}

export default function ComparisonTable({ majors, selectedMajors, takenCourses, setTakenCourses }) {
  const [selectedYear, setSelectedYear] = useState('All')

  // Get all possible years from selected majors
  const allYears = Array.from(
    new Set(
      majors
        .filter(m => selectedMajors.includes(m.major))
        .flatMap(m => m.years.map(y => y.year))
    )
  )

  const rows = useMemo(
    () => gatherRequirements(majors, selectedMajors, selectedYear),
    [majors, selectedMajors, selectedYear]
  )

  const toggleTaken = course => {
    if (takenCourses.includes(course)) setTakenCourses(takenCourses.filter(c => c !== course))
    else setTakenCourses([...takenCourses, course])
  }

  const minAvg =
    selectedMajors.length === 0
      ? 'N/A'
      : Math.max(...majors.filter(m => selectedMajors.includes(m.major)).map(m => m.min_average ?? 0))

  return (
    <section className="comparison">
      <h2>Comparison</h2>

      {/* Year selector dropdown */}
      <div style={{ marginBottom: '10px' }}>
        <label>
          Show courses for year:{' '}
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
            <option value="All">All</option>
            {allYears.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="summary">
        Selected majors: {selectedMajors.join(', ') || '—'} — Minimal required average (suggested):{' '}
        <strong>{minAvg === 0 ? 'N/A' : minAvg}</strong>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              {selectedMajors.map(s => (
                <th key={s}>{s}</th>
              ))}
              <th>Taken</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.course} className={takenCourses.includes(r.course) ? 'taken' : ''}>
                <td>{r.course}</td>
                {selectedMajors.map(s => (
                  <td key={s}>{r.byMajor[s] ? '✔' : ''}</td>
                ))}
                <td>
                  <input type="checkbox" checked={takenCourses.includes(r.course)} onChange={() => toggleTaken(r.course)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
