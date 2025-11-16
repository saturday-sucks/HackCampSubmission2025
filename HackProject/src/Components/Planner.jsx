import React from "react";

// ---------------------------
// ExpandableText (UNCHANGED)
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
// NEW PLANNER WITH CREDITS
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

  // ----------------------------
  // BUILD COURSES (same logic)
  // ----------------------------
  const buildCourses = (yearFilter) => {
    const raw = [];

    selectedObjs.forEach((m) => {
      m.years.forEach((yy) => {
        if (yearFilter(yy.year) && yy.required_courses) {
          yy.required_courses.forEach((c) => {
            const options = c.options || [[c.course]];

            if (options.length === 1 && options[0].length > 1) {
              options[0].forEach((single) => {
                raw.push({
                  ...c,
                  majors: [m.major],
                  options: [[single]],
                  courseDisplay: single,
                  credits: c.credits ?? 0,
                });
              });
            } else {
              const display = options
                .map((opt) => opt.join(" + "))
                .join(" / ");

              raw.push({
                ...c,
                majors: [m.major],
                options,
                courseDisplay: display,
                credits: c.credits ?? 0,
              });
            }
          });
        }
      });
    });

    // merge duplicates
    const map = new Map();

    raw.forEach((c) => {
      if (!map.has(c.courseDisplay)) {
        map.set(c.courseDisplay, c);
      } else {
        const ex = map.get(c.courseDisplay);
        c.majors.forEach((mj) => {
          if (!ex.majors.includes(mj)) ex.majors.push(mj);
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

  // ----------------------------
  // TOGGLE
  // ----------------------------
  const toggleCourse = (courseDisplay) => {
    if (takenCourses.includes(courseDisplay)) {
      setTakenCourses(takenCourses.filter((x) => x !== courseDisplay));
    } else {
      setTakenCourses([...takenCourses, courseDisplay]);
    }
  };

  // ----------------------------
  // CREDIT CALCULATIONS
  // ----------------------------
  const calcCredits = (courses) => {
    const total = courses.reduce((sum, c) => sum + (c.credits ?? 0), 0);
    const completed = courses
      .filter((c) => takenCourses.includes(c.courseDisplay))
      .reduce((sum, c) => sum + (c.credits ?? 0), 0);
    return { total, completed, remaining: total - completed };
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <section className="planner">
      <h2>Year-by-year planner</h2>

      {selectedMajors.length === 0 ? (
        <p>Select at least one major to see planner.</p>
      ) : (
        <div>
          {/* === FILTER === */}
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

          {/* ===================== LOWER YEARS ===================== */}
          {lowerYearRows.map((yr) => {
            const filtered = yr.courses.filter(
              (c) =>
                majorFilter === "All" || c.majors.includes(majorFilter)
            );

            const creditStats = calcCredits(filtered);

            return (
              <div key={yr.year} className="year">
                <h3>
                  {yr.year} —{" "}
                  <span style={{ fontSize: "0.85em" }}>
                    Total: <strong>{creditStats.total}</strong> credits |{" "}
                    Completed: <strong>{creditStats.completed}</strong> |{" "}
                    Remaining:{" "}
                    <strong style={{ color: "red" }}>
                      {creditStats.remaining}
                    </strong>
                  </span>
                </h3>

                {filtered.length === 0 ? (
                  <p>No required courses for this year.</p>
                ) : (
                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {filtered.map((c) => {
                      const done = takenCourses.includes(c.courseDisplay);

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
                              checked={done}
                              onChange={() => toggleCourse(c.courseDisplay)}
                            />

                            <div style={{ flex: 1 }}>
                              <strong>
                                <ExpandableText
                                  text={c.courseDisplay}
                                  completed={done}
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
            );
          })}

          {/* ===================== UPPER YEARS ===================== */}
          <div className="year">
            {(() => {
              const filtered = upperYearCourses.filter(
                (c) =>
                  majorFilter === "All" || c.majors.includes(majorFilter)
              );
              const creditStats = calcCredits(filtered);

              return (
                <>
                  <h3>
                    Upper-Year Courses —{" "}
                    <span style={{ fontSize: "0.85em" }}>
                      Total: <strong>{creditStats.total}</strong> credits |{" "}
                      Completed: <strong>{creditStats.completed}</strong> |{" "}
                      Remaining:{" "}
                      <strong style={{ color: "red" }}>
                        {creditStats.remaining}
                      </strong>
                    </span>
                  </h3>

                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {filtered.map((c) => {
                      const done = takenCourses.includes(c.courseDisplay);

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
                              checked={done}
                              onChange={() => toggleCourse(c.courseDisplay)}
                            />

                            <div style={{ flex: 1 }}>
                              <strong>
                                <ExpandableText
                                  text={c.courseDisplay}
                                  completed={done}
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
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
