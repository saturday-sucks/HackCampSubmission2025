import React, { useMemo, useState } from "react";

// Helper to format nested course options
function formatCourseOptions(options) {
  return options.map((inner) => inner.join(" + ")).join(" / ");
}

// Gather requirements for selected majors with year filter
function gatherRequirements(majorsData, selectedMajors, selectedYear = "All") {
  const map = new Map();
  const selectedObjs = majorsData.filter((m) => selectedMajors.includes(m.major));

  selectedObjs.forEach((m) => {
    m.years.forEach((y) => {
      if (selectedYear !== "All" && y.year !== selectedYear) return;

      (y.required_courses || []).forEach((c) => {
        const courseOptions = c.options || [[c.course]];

        // Split single inner array with multiple courses
        if (courseOptions.length === 1 && courseOptions[0].length > 1) {
          courseOptions[0].forEach((singleCourse) => {
            if (!map.has(singleCourse))
              map.set(singleCourse, { course: singleCourse, byMajor: {}, options: [[singleCourse]] });
            map.get(singleCourse).byMajor[m.major] = true;
          });
        } else {
          const code = formatCourseOptions(c.options);
          if (!map.has(code)) map.set(code, { course: code, byMajor: {}, options: c.options });
          map.get(code).byMajor[m.major] = true;
        }
      });
    });
  });

  return Array.from(map.values()).sort((a, b) => a.course.localeCompare(b.course));
}

export default function ComparisonTable({ majors, selectedMajors, takenCourses, setTakenCourses }) {
  const [selectedYear, setSelectedYear] = useState("All");

  // Union of all years for selected majors
  const allYears = Array.from(
    new Set(
      majors
        .filter((m) => selectedMajors.includes(m.major))
        .flatMap((m) => m.years.map((y) => y.year))
    )
  );

  const rows = useMemo(() => gatherRequirements(majors, selectedMajors, selectedYear), [majors, selectedMajors, selectedYear]);

  const minAvgValues = majors
    .filter((m) => selectedMajors.includes(m.major))
    .map((m) => m.min_average ?? 0);
  const minAvg = minAvgValues.length === 0 ? "N/A" : Math.max(...minAvgValues);

  return (
    <section className="comparison">
      <h2>Comparison</h2>

      <div style={{ marginBottom: 10 }}>
        <label>
          Show courses for year:{" "}
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="All">All</option>
            {allYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="summary">
        Selected majors: {selectedMajors.join(", ") || "—"} — Minimal required average: <strong>{minAvg}</strong>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              {selectedMajors.map((s) => <th key={s}>{s}</th>)}
              <th>Taken</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              // Requirement fulfilled if any option fully satisfied
              const isTaken = r.options.some(option => option.every(c => takenCourses.includes(c)));

              return (
                <tr key={r.course} className={isTaken ? "taken" : ""}>
                  <td>{formatCourseOptions(r.options)}</td>
                  {selectedMajors.map((s) => <td key={s}>{r.byMajor[s] ? "✔" : ""}</td>)}
                  <td>
                    <input
                      type="checkbox"
                      checked={isTaken}
                      onChange={() => {
                        const option = r.options[0]; // toggle first option
                        const allTaken = option.every(c => takenCourses.includes(c));
                        if (allTaken) {
                          setTakenCourses(takenCourses.filter(c => !option.includes(c)));
                        } else {
                          const newTaken = [...takenCourses];
                          option.forEach(c => { if (!newTaken.includes(c)) newTaken.push(c); });
                          setTakenCourses(newTaken);
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
