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
    <span style={textStyle}>
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

export default function Planner({ majors, selectedMajors, takenCourses, setTakenCourses }) {
  const selectedObjs = majors.filter(m => selectedMajors.includes(m.major));
  const lowerYears = ["First Year", "Second Year"];

  const processCourses = (yearName) => {
    const courses = [];

    selectedObjs.forEach(m => {
      const y = m.years.find(yy => yy.year === yearName);
      if (!y || !y.required_courses) return;

      y.required_courses.forEach(c => {
        const options = c.options || [[c.course]];
        const display = options.map(opt => opt.join(" + ")).join(" / ");
        courses.push({ ...c, major: m.major, options, courseDisplay: display });
      });
    });

    return courses;
  };

  const lowerYearRows = lowerYears.map(y => ({ year: y, courses: processCourses(y) }));

  const upperYearCoursesRaw = selectedObjs.flatMap(m =>
    m.years.filter(yy => !lowerYears.includes(yy.year)).flatMap(yy => yy.required_courses || []).map(c => {
      const options = c.options || [[c.course]];
      return {
        ...c,
        major: m.major,
        options,
        courseDisplay: options.map(opt => opt.join(" + ")).join(" / ")
      };
    })
  );

  const toggleTaken = (option) => {
    const allTaken = option.every(c => takenCourses.includes(c));
    if (allTaken) {
      setTakenCourses(takenCourses.filter(c => !option.includes(c)));
    } else {
      const newTaken = [...takenCourses];
      option.forEach(c => { if (!newTaken.includes(c)) newTaken.push(c); });
      setTakenCourses(newTaken);
    }
  };

  const renderCourse = (c) => {
    const isTaken = c.options.some(opt => opt.every(course => takenCourses.includes(course)));
    return (
      <li key={c.courseDisplay}>
        <label>
          <input
            type="checkbox"
            checked={isTaken}
            onChange={() => toggleTaken(c.options[0])}
          />
          <strong><ExpandableText text={c.courseDisplay} /></strong> <em>({c.credits ?? "?"} cr) — {c.major}</em>
        </label>
      </li>
    );
  };

  return (
    <section className="planner">
      <h2>Year-by-year planner</h2>
      {selectedMajors.length === 0 ? (
        <p>Select at least one major to see planner.</p>
      ) : (
        <div>
          {lowerYearRows.map(yr => (
            <div key={yr.year} className="year">
              <h3>{yr.year}</h3>
              {yr.courses.length === 0 ? <p>No required courses for this year.</p> : <ul>{yr.courses.map(renderCourse)}</ul>}
              <p className="missing">
                Missing courses this year: {yr.courses.filter(c => !c.options.some(opt => opt.every(course => takenCourses.includes(course)))).length}
              </p>
            </div>
          ))}

          <div className="year">
            <h3>Upper-Year Courses</h3>
            {upperYearCoursesRaw.length === 0 ? <p>No upper-year courses.</p> : <ul>{upperYearCoursesRaw.map(renderCourse)}</ul>}
          </div>
        </div>
      )}
    </section>
  );
}
