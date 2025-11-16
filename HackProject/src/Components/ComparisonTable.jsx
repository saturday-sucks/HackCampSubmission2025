import React, { useMemo } from "react";

// Helper to format nested course options
function formatCourseOptions(options) {
  return options.map((inner) => inner.join(" + ")).join(", ");
}

// Gather requirements for selected majors
function gatherRequirements(majorsData, selectedMajors) {
  const map = new Map();

  const selectedObjs = majorsData.filter((m) =>
    selectedMajors.includes(m.major)
  );

  selectedObjs.forEach((m) => {
    m.years.forEach((y) => {
      (y.required_courses || []).forEach((c) => {
        const courseOptions = c.options || [[c.course]];

        // Case: single inner array with multiple courses → split into separate options
        if (courseOptions.length === 1 && courseOptions[0].length > 1) {
          courseOptions[0].forEach((singleCourse) => {
            const code = singleCourse; // each course becomes its own key
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
  const rows = useMemo(
    () => gatherRequirements(majors, selectedMajors),
    [majors, selectedMajors]
  );

  const toggleTaken = (course) => {
    if (takenCourses.includes(course)) {
      setTakenCourses(takenCourses.filter((c) => c !== course));
    } else {
      setTakenCourses([...takenCourses, course]);
    }
  };

  const minAvg =
    selectedMajors.length === 0
      ? "N/A"
      : Math.max(
          ...majors
            .filter((m) => selectedMajors.includes(m.major))
            .map((m) => m.min_average ?? 0)
        );

  return (
    <section className="comparison">
      <h2>Comparison</h2>
      <div className="summary">
        Selected majors: {selectedMajors.join(", ") || "—"} — Minimal required
        average (suggested): <strong>{minAvg === 0 ? "N/A" : minAvg}</strong>
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
