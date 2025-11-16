import React from "react";

function ExpandableText({ text, completed }) {
  const [expanded, setExpanded] = React.useState(false);

  const parts = text.split(" / ");
  const firstPart = parts[0];
  const rest = parts.slice(1);

  const textStyle = {
    textDecoration: completed ? "line-through" : "none",
  };

  return (
    <span style={completed}>
      <span>
        {firstPart}
        {parts.length > 1 && !expanded && (
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setExpanded(true);
            }}
            style={{
              border: "none",
              background: "none",
              padding: 0,
              marginLeft: "4px",
              color: "#007bff",
              cursor: "pointer",
              fontSize: "0.9em",
            }}
          >
            ...
          </button>
        )}
      </span>

      {expanded && (
        <span
          style={{
            display: "block",
            whiteSpace: "pre-line",
            marginTop: "3px",
          }}
        >
          {rest.join("\n")}

          <div
            style={{
              marginTop: "4px",
              fontSize: "0.75em",
              color: "#666",
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setExpanded(false);
              }}
              style={{
                border: "none",
                background: "none",
                padding: 0,
                color: "#888",
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "auto",
              }}
            >
              show less
            </button>
          </div>
        </span>
      )}
    </span>
  );
}

export default function Planner({
  majors,
  selectedMajors,
  takenCourses,
  setTakenCourses,
}) {
  const selectedObjs = majors.filter((m) => selectedMajors.includes(m.major));
  const lowerYears = ["First Year", "Second Year"];

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

  // Upper-year courses
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
                      <label
                        style={{
                          display: "inline-flex",
                          alignItems: "flex-start",
                        }}
                      >
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
                        <strong>
                          <ExpandableText text={c.courseDisplay} />
                        </strong>{" "}
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
                        checked={takenCourses.includes(c.courseDisplay)}
                        onChange={() => {
                          if (takenCourses.includes(c.courseDisplay))
                            setTakenCourses(
                              takenCourses.filter((x) => x !== c.courseDisplay)
                            );
                          else
                            setTakenCourses([...takenCourses, c.courseDisplay]);
                        }}
                      />
                      <strong>
                        <ExpandableText text={c.courseDisplay} />
                      </strong>{" "}
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