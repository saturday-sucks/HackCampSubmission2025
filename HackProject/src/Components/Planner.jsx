import React from "react";

export default function Planner({ majors, selectedMajors, takenCourses, setTakenCourses }) {
  const selectedObjs = majors.filter((m) => selectedMajors.includes(m.major));
  const lowerYears = ["First Year", "Second Year"];

  const processCourses = (yearName) => {
    const courses = [];

    selectedObjs.forEach((m) => {
      const y = m.years.find((yy) => yy.year === yearName);
      if (!y || !y.required_courses) return;

      y.required_courses.forEach((c) => {
        const options = c.options || [[c.course]];
        options.forEach(opt => {
          const courseDisplay = opt.join(" + ");
          courses.push({ ...c, major: m.major, options: [opt], courseDisplay });
        });
      });
    });

    // Deduplicate
    const seen = new Set();
    const uniq = [];
    courses.forEach(c => {
      if (!seen.has(c.courseDisplay)) {
        seen.add(c.courseDisplay);
        uniq.push(c);
      }
    });

    return uniq;
  };

  const lowerYearRows = lowerYears.map(y => ({ year: y, courses: processCourses(y) }));

  const upperYearCoursesRaw = selectedObjs.flatMap((m) =>
    m.years.filter(yy => !lowerYears.includes(yy.year)).flatMap(yy => yy.required_courses || []).flatMap(c =>
      (c.options || [[c.course]]).map(opt => ({
        ...c,
        major: m.major,
        options: [opt],
        courseDisplay: opt.join(" + ")
      }))
    )
  );

  const seenUpper = new Set();
  const upperYearUniq = [];
  upperYearCoursesRaw.forEach(c => {
    if (!seenUpper.has(c.courseDisplay)) {
      seenUpper.add(c.courseDisplay);
      upperYearUniq.push(c);
    }
  });

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
          <strong>{c.courseDisplay}</strong> <em>({c.credits ?? "?"} cr) — {c.major}</em>
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
          {lowerYearRows.map((yr) => (
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
            {upperYearUniq.length === 0 ? <p>No upper-year courses.</p> : <ul>{upperYearUniq.map(renderCourse)}</ul>}
          </div>
        </div>
      )}
    </section>
  );
}
