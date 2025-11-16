import React from "react";

// ---------------------------
// ExpandableText
// ---------------------------
function ExpandableText({ text, completed }) {
  const [expanded, setExpanded] = React.useState(false);

  const parts = text.split(" / ");
  const firstPart = parts[0];
  const rest = parts.slice(1).join("\n");

  const textStyle = {
    textDecoration: completed ? "line-through" : "none",
    display: "inline-block",
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

// ---------------------------
// Final MERGED Planner
// ---------------------------
export default function Planner({
  majors,
  selectedMajors,
  takenCourses,
  setTakenCourses,
}) {
  const [majorFilter, setMajorFilter] = React.useState("All");

  const selectedObjs = majors.filter((m) => selectedMajors.includes(m.major));
  const lowerYears = ["First Year", "Second Year"];

  // -----------------------------------
  // COURSE BUILDING + MERGE LOGIC
  // -----------------------------------
  const buildCourses = (yearFilter) => {
    const raw = [];

    selectedObjs.forEach((m) => {
      m.years.forEach((yy) => {
        if (yearFilter(yy.year) && yy.required_courses) {
          yy.required_courses.forEach((c) => {
            const courseOptions = c.options || [[c.course]];

            // Expand multi-choice like ["A","B"]
            if (courseOptions.length === 1 && courseOptions[0].length > 1) {
              courseOptions[0].forEach((single) => {
                raw.push({
                  ...c,
                  majors: [m.major],
                  options: [[single]],
                  courseDisplay: single,
                  credits: c.credits ?? 0,
                });
              });
            } else {
              const display = courseOptions
                .map((opt) => opt.join(" + "))
                .join(" / ");

              raw.push({
                ...c,
                majors: [m.major],
                options: courseOptions,
                courseDisplay: display,
                credits: c.credits ?? 0,
              });
            }
          });
        }
      });
    });

    // Deduplicate and merge majors
    const map = new Map();

    raw.forEach((c) => {
      if (!map.has(c.courseDisplay)) {
        map.set(c.courseDisplay, c);
      } else {
        const existing = map.get(c.courseDisplay);
        c.majors.forEach((mj) => {
          if (!existing.majors.includes(mj)) existing.majors.push(mj);
        });
      }
    });

    return Array.from(map.values());
  };

  const lowerYearRows = lowerYears.map((yr) => ({
    year: yr,
    courses: buildCourses((y) => y === yr),
  }));

  const upperYearCourses = buildCourses((y) => !lowerYears.includes(y));

  // -----------------------------------
  // CHECKBOX TOGGLE
  // -----------------------------------
  const toggleCourse = (courseDisplay) => {
    if (takenCourses.includes(courseDisplay)) {
      setTakenCourses(takenCourses.filter((x) => x !== courseDisplay));
    } else {
      setTakenCourses([...takenCourses, courseDisplay]);
    }
  };

  // -----------------------------------
  // RENDER
  // -----------------------------------
  return (
    <section className="planner">
      <h2>Year-by-year planner</h2>

      {selectedMajors.length === 0 ? (
        <p>Select at least one major to see planner.</p>
      ) : (
        <div>
          {/* ---------------- Major Filter ---------------- */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Filter by major: </label>
            <select
              value={majorFilter}
              onChange={(e) => setMajorFilter(e.target.value)}
            >
              <option value="All">All</option>
              {selectedObjs.map((m) => (
                <option key={m.major} value={m.major}>
                  {m.major}
                </option>
              ))}
            </select>
          </div>

          {/* ---------------- LOWER YEARS ---------------- */}
          {lowerYearRows.map((yr) => (
            <div key={yr.year} className="year">
              <h3>{yr.year}</h3>

              {yr.courses.length === 0 ? (
                <p>No required courses for this year.</p>
              ) : (
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {yr.courses
                    .filter(
                      (c) =>
                        majorFilter === "All" || c.majors.includes(majorFilter)
                    )
                    .map((c) => {
                      const completed = takenCourses.includes(c.courseDisplay);
                      return (
                        <li key={c.courseDisplay} style={{ marginBottom: 8 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 8,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={completed}
                              onChange={() => toggleCourse(c.courseDisplay)}
                            />

                            <div style={{ flex: 1 }}>
                              <strong>
                                <ExpandableText
                                  text={c.courseDisplay}
                                  completed={completed}
                                />
                              </strong>{" "}
                              <em>
                                ({c.credits} cr) — {c.majors.join(", ")}
                              </em>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}

              <p className="missing">
                Missing courses this year:{" "}
                {
                  yr.courses.filter(
                    (c) =>
                      (majorFilter === "All" ||
                        c.majors.includes(majorFilter)) &&
                      !takenCourses.includes(c.courseDisplay)
                  ).length
                }
              </p>
            </div>
          ))}

          {/* ---------------- UPPER YEARS ---------------- */}
          <div className="year">
            <h3>Upper-Year Courses</h3>

            {upperYearCourses.length === 0 ? (
              <p>No upper-year courses.</p>
            ) : (
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {upperYearCourses
                  .filter(
                    (c) =>
                      majorFilter === "All" || c.majors.includes(majorFilter)
                  )
                  .map((c) => {
                    const completed = takenCourses.includes(c.courseDisplay);

                    return (
                      <li key={c.courseDisplay} style={{ marginBottom: 8 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => toggleCourse(c.courseDisplay)}
                          />

                          <div style={{ flex: 1 }}>
                            <strong>
                              <ExpandableText
                                text={c.courseDisplay}
                                completed={completed}
                              />
                            </strong>{" "}
                            <em>
                              ({c.credits} cr) — {c.majors.join(", ")}
                            </em>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
