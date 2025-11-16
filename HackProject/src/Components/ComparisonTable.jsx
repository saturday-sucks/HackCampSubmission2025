import React, { useMemo, useState } from "react";

// Helper to format nested course options
function formatCourseOptions(options) {
  return options.map((inner) => inner.join(" + ")).join(" / ");
}

// Gather requirements for selected majors WITH YEAR FILTER
function gatherRequirements(majorsData, selectedMajors, selectedYear = "All") {
  const map = new Map();

  const selectedObjs = majorsData.filter((m) =>
    selectedMajors.includes(m.major)
  );

  selectedObjs.forEach((m) => {
    m.years.forEach((y) => {
      if (selectedYear !== "All" && y.year !== selectedYear) return;

      (y.required_courses || []).forEach((c) => {
        const courseOptions = c.options || [[c.course]];

        // Case: single inner array with multiple courses → split into separate options
        if (courseOptions.length === 1 && courseOptions[0].length > 1) {
          courseOptions[0].forEach((singleCourse) => {
            const code = singleCourse;
            if (!map.has(code))
              map.set(code, {
                course: code,
                byMajor: {},
                options: [[singleCourse]],
              });
            map.get(code).byMajor[m.major] = true;
          });
        } else {
          const code = formatCourseOptions(c.options);
          if (!map.has(code))
            map.set(code, { course: code, byMajor: {}, options: c.options });
          map.get(code).byMajor[m.major] = true;
        }
      });
    });
  });

  return Array.from(map.values()).sort((a, b) =>
    a.course.localeCompare(b.course)
  );
}

export default function ComparisonTable({
  majors,
  selectedMajors,
  takenCourses,
  setTakenCourses,
}) {
  const [selectedYear, setSelectedYear] = useState("All");

  // Compute the union of all possible years for selected majors
  const allYears = Array.from(
    new Set(
      majors
        .filter((m) => selectedMajors.includes(m.major))
        .flatMap((m) => m.years.map((y) => y.year))
    )
  );

  const rows = useMemo(
    () => gatherRequirements(majors, selectedMajors, selectedYear),
    [majors, selectedMajors, selectedYear]
  );

  const toggleTaken = (course) => {
    if (takenCourses.includes(course)) {
      setTakenCourses(takenCourses.filter((c) => c !== course));
    } else {
      setTakenCourses([...takenCourses, course]);
    }
  };

  // Proper handling of minimal average
  const relevantMajors = majors.filter((m) =>
    selectedMajors.includes(m.major)
  );
  const minAvgValues = relevantMajors
    .map((m) => m.min_average)
    .filter((v) => v !== undefined && v !== null);

  const minAvg = minAvgValues.length === 0 ? "N/A" : Math.max(...minAvgValues);

  return (
    <section className="comparison">
      <h2>Comparison</h2>

      {/* Year Dropdown */}
      <div style={{ marginBottom: 10 }}>
        <label>
          Show courses for year:{" "}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All</option>
            {allYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="summary">
        Selected majors: {selectedMajors.join(", ") || "—"} — Minimal required
        average (suggested): <strong>{minAvg}</strong>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              {selectedMajors.map((s) => (
                <th key={s}>{s}</th>
              ))}
              <th>Taken</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.course}
                className={takenCourses.includes(r.course) ? "taken" : ""}
              >
                <td>{formatCourseOptions(r.options)}</td>
                {selectedMajors.map((s) => (
                  <td key={s}>{r.byMajor[s] ? "✔" : ""}</td>
                ))}
                <td>
                  <input
                    type="checkbox"
                    checked={takenCourses.includes(r.course)}
                    onChange={() => toggleTaken(r.course)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
