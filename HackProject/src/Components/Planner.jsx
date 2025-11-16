import React from "react";

// ExpandableText component
function ExpandableText({ text, completed }) {
  const [expanded, setExpanded] = React.useState(false);

  // Split the text into first part and the rest
  const parts = text.split(" / ");
  const firstPart = parts[0];
  const rest = parts.slice(1).join("\n");

  const textStyle = {
    textDecoration: completed ? "line-through" : "none",
    display: "inline-block", // ensures line-through works correctly
  };

  return (
    <span>
      <span style={textStyle}>
        {firstPart}
        {parts.length > 1 && !expanded && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
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

      {expanded && rest && (
        <span
          style={{
            display: "block",
            whiteSpace: "pre-line",
            marginTop: "3px",
          }}
        >
          <span style={textStyle}>{rest}</span>
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
              onClick={() => setExpanded(false)}
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

// Planner component
export default function Planner({
  majors,
  selectedMajors,
  takenCourses,
  setTakenCourses,
}) {
  const selectedObjs = majors.filter((m) => selectedMajors.includes(m.major));
  const lowerYears = ["First Year", "Second Year"];

  // Helper function to build course objects
  const buildCourses = (yearFilter) => {
    const courses = [];
    selectedObjs.forEach((m) => {
      m.years.forEach((yy) => {
        if (yearFilter(yy.year) && yy.required_courses) {
          yy.required_courses.forEach((c) => {
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

    return uniq;
  };

  const lowerYearRows = lowerYears.map((year) => ({
    year,
    courses: buildCourses((y) => y === year),
  }));

  const upperYearUniq = buildCourses((y) => !lowerYears.includes(y));

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
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {yr.courses.map((c) => (
                    <li key={c.courseDisplay} style={{ marginBottom: "8px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
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
                        <div style={{ flex: 1 }}>
                          <strong>
                            <ExpandableText
                              text={c.courseDisplay}
                              completed={takenCourses.includes(c.courseDisplay)}
                            />
                          </strong>{" "}
                          <em>
                            ({c.credits ?? "?"} cr) — {c.major}
                          </em>
                        </div>
                      </div>
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
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {upperYearUniq.map((c) => (
                  <li key={c.courseDisplay} style={{ marginBottom: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
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
                      <div style={{ flex: 1 }}>
                        <strong>
                          <ExpandableText
                            text={c.courseDisplay}
                            completed={takenCourses.includes(c.courseDisplay)}
                          />
                        </strong>{" "}
                        <em>
                          ({c.credits ?? "?"} cr) — {c.major}
                        </em>
                      </div>
                    </div>
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
