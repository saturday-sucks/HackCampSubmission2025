import React from "react";

export default function Planner({
  majors,
  selectedMajors,
  takenCourses,
  setTakenCourses,
}) {
  // Build a year-by-year view for the selected majors
  const selectedObjs = majors.filter((m) => selectedMajors.includes(m.major));
  const years = ["First Year", "Second Year", "Third Year", "Fourth Year"];

  const yearRows = years.map((year) => {
    const courses = [];

    selectedObjs.forEach((m) => {
      const y = m.years.find((yy) => yy.year === year);
      if (y && y.required_courses) {
        y.required_courses.forEach((c) => {
          const courseOptions = c.options || [[c.course]];

          // Case: single inner array with multiple courses → split into separate entries
          if (courseOptions.length === 1 && courseOptions[0].length > 1) {
            courseOptions[0].forEach((singleCourse) => {
              courses.push({
                ...c,
                major: m.major,
                options: [[singleCourse]], // each course gets its own option
                courseDisplay: singleCourse,
              });
            });
          } else {
            const courseDisplay = courseOptions
              .map((opt) => opt.join(" + "))
              .join(" / ");
            courses.push({
              ...c,
              major: m.major,
              options: courseOptions,
              courseDisplay,
            });
          }
        });
      }
    });

    // dedupe by courseDisplay
    const uniq = [];
    const seen = new Set();
    courses.forEach((c) => {
      if (!seen.has(c.courseDisplay)) {
        seen.add(c.courseDisplay);
        uniq.push(c);
      }
    });

    return { year, courses: uniq };
  });

  const missingByYear = yearRows.map((yr) => ({
    year: yr.year,
    missing: yr.courses.filter((c) => !takenCourses.includes(c.courseDisplay)),
  }));

  return (
    <section className="planner">
      <h2>Year-by-year planner</h2>
      {selectedMajors.length === 0 ? (
        <p>Select at least one major to see planner.</p>
      ) : (
        <div>
          {yearRows.map((yr) => (
            <div key={yr.year} className="year">
              <h3>{yr.year}</h3>
              {yr.courses.length === 0 ? (
                <p>No required courses for this year.</p>
              ) : (
                <ul>
                  {yr.courses.map((c) => (
                    <li key={c.courseDisplay}>
                      <label>
                        <input
                          type="checkbox"
                          checked={takenCourses.includes(c.courseDisplay)}
                          onChange={() => {
                            if (takenCourses.includes(c.courseDisplay))
                              setTakenCourses(
                                takenCourses.filter(
                                  (x) => x !== c.courseDisplay
                                )
                              );
                            else
                              setTakenCourses([
                                ...takenCourses,
                                c.courseDisplay,
                              ]);
                          }}
                        />
                        <strong>{c.courseDisplay}</strong>{" "}
                        <em>
                          ({c.credits ?? "?"} cr) — {c.major}
                        </em>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              <p className="missing">
                Missing courses this year:{" "}
                {missingByYear.find((m) => m.year === yr.year).missing.length}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
