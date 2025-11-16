import React from "react";

export default function Planner({
  majors,
  selectedMajors,
  takenCourses,
  setTakenCourses,
}) {
  // Filter selected majors
  const selectedObjs = majors.filter((m) => selectedMajors.includes(m.major));
  const lowerYears = ["First Year", "Second Year"];

  // Build lower-year courses
  const lowerYearRows = lowerYears.map((year) => {
    const courses = [];

    selectedObjs.forEach((m) => {
      const y = m.years.find((yy) => yy.year === year);
      if (y && y.required_courses) {
        y.required_courses.forEach((c) => {
          const courseOptions = c.options || [[c.course]];

          if (courseOptions.length === 1 && courseOptions[0].length > 1) {
            courseOptions[0].forEach((singleCourse) => {
              courses.push({
                ...c,
                major: m.major,
                options: [[singleCourse]],
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

    // Deduplicate
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

  // Collect all upper-year courses (any year not in lowerYears)
  const upperYearCourses = [];
  selectedObjs.forEach((m) => {
    m.years.forEach((yy) => {
      if (!lowerYears.includes(yy.year) && yy.required_courses) {
        yy.required_courses.forEach((c) => {
          const courseOptions = c.options || [[c.course]];

          if (courseOptions.length === 1 && courseOptions[0].length > 1) {
            courseOptions[0].forEach((singleCourse) => {
              upperYearCourses.push({
                ...c,
                major: m.major,
                options: [[singleCourse]],
                courseDisplay: singleCourse,
              });
            });
          } else {
            const courseDisplay = courseOptions
              .map((opt) => opt.join(" + "))
              .join(" / ");
            upperYearCourses.push({
              ...c,
              major: m.major,
              options: courseOptions,
              courseDisplay,
            });
          }
        });
      }
    });
  });

  // Deduplicate upper-year courses
  const upperYearUniq = [];
  const seenUpper = new Set();
  upperYearCourses.forEach((c) => {
    if (!seenUpper.has(c.courseDisplay)) {
      seenUpper.add(c.courseDisplay);
      upperYearUniq.push(c);
    }
  });

  return (
    <section className="planner">
      <h2>Year-by-year planner</h2>
      {selectedMajors.length === 0 ? (
        <p>Select at least one major to see planner.</p>
      ) : (
        <div>
          {/* Lower-year courses */}
          {lowerYearRows.map((yr) => (
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
                            checked={takenCourses.some(taken => c.courseDisplay.includes(taken))}
                            onChange={() => {
                                const mainCourse = c.courseDisplay.split(' / ')[0];
                                if (takenCourses.includes(mainCourse)) {
                                setTakenCourses(takenCourses.filter(x => x !== mainCourse))
                                } else {
                                setTakenCourses([...takenCourses, mainCourse])
                                }
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
                {
                  yr.courses.filter(
                    (c) => !takenCourses.includes(c.courseDisplay)
                  ).length
                }
              </p>
            </div>
          ))}

          {/* Upper-year courses */}
          <div className="year">
            <h3>Upper-Year Courses</h3>
            {upperYearUniq.length === 0 ? (
              <p>No upper-year courses.</p>
            ) : (
              <ul>
                {upperYearUniq.map((c) => (
                  <li key={c.courseDisplay}>
                    <label>
                      <input
                        type="checkbox"
                        checked={takenCourses.some(taken => c.courseDisplay.includes(taken))}
                        onChange={() => {
                            const mainCourse = c.courseDisplay.split(' / ')[0];
                            if (takenCourses.includes(mainCourse)) {
                            setTakenCourses(takenCourses.filter(x => x !== mainCourse))
                            } else {
                            setTakenCourses([...takenCourses, mainCourse])
                            }
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
          </div>
        </div>
      )}
    </section>
  );
}