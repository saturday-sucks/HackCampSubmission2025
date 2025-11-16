import React from "react";

export default function Planner({
    majors,
    selectedMajors,
    takenCourses,
    setTakenCourses,
}) {
    // Major filter dropdown
    const [majorFilter, setMajorFilter] = React.useState("All");

    // Filter selected major objects
    const selectedObjs = majors.filter((m) => selectedMajors.includes(m.major));
    const lowerYears = ["First Year", "Second Year"];

    // ------------------------------
    // BUILD LOWER-YEAR COURSES
    // ------------------------------
    const lowerYearRows = lowerYears.map((year) => {
        const courses = [];

        selectedObjs.forEach((m) => {
            const yearObj = m.years.find((yy) => yy.year === year);
            if (yearObj?.required_courses) {
                yearObj.required_courses.forEach((c) => {
                    const courseOptions = c.options || [[c.course]];

                    // Expand multi-options (e.g., ["A","B"])
                    if (courseOptions.length === 1 && courseOptions[0].length > 1) {
                        courseOptions[0].forEach((singleCourse) => {
                            courses.push({
                                ...c,
                                major: m.major,
                                majors: [m.major],
                                options: [[singleCourse]],
                                courseDisplay: singleCourse,
                            });
                        });
                    } else {
                        const display = courseOptions
                            .map((opt) => opt.join(" + "))
                            .join(" / ");
                        courses.push({
                            ...c,
                            major: m.major,
                            majors: [m.major],
                            options: courseOptions,
                            courseDisplay: display,
                        });
                    }
                });
            }
        });

        // Deduplicate AND merge majors
        const map = new Map(); // key: courseDisplay

        courses.forEach((c) => {
            if (!map.has(c.courseDisplay)) {
                map.set(c.courseDisplay, c);
            } else {
                const existing = map.get(c.courseDisplay);
                if (!existing.majors.includes(c.major)) {
                    existing.majors.push(c.major);
                }
            }
        });

        const uniqCourses = Array.from(map.values());
        return { year, courses: uniqCourses };
    });

    // ------------------------------
    // BUILD UPPER-YEAR COURSES
    // ------------------------------
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
                                majors: [m.major],
                                options: [[singleCourse]],
                                courseDisplay: singleCourse,
                            });
                        });
                    } else {
                        const display = courseOptions
                            .map((opt) => opt.join(" + "))
                            .join(" / ");
                        upperYearCourses.push({
                            ...c,
                            major: m.major,
                            majors: [m.major],
                            options: courseOptions,
                            courseDisplay: display,
                        });
                    }
                });
            }
        });
    });

    // Deduplicate & merge majors (upper-year)
    const mapUpper = new Map();
    upperYearCourses.forEach((c) => {
        if (!mapUpper.has(c.courseDisplay)) {
            mapUpper.set(c.courseDisplay, c);
        } else {
            const existing = mapUpper.get(c.courseDisplay);
            if (!existing.majors.includes(c.major)) {
                existing.majors.push(c.major);
            }
        }
    });

    const upperYearUniq = Array.from(mapUpper.values());

    // ------------------------------
    // RENDER
    // ------------------------------
    return (
        <section className="planner">
            <h2>Year-by-year planner</h2>

            {selectedMajors.length === 0 ? (
                <p>Select at least one major to see planner.</p>
            ) : (
                <div>
                    {/* Major Filter Dropdown */}
                    <div className="major-filter" style={{ marginBottom: "1rem" }}>
                        <label>Filter by major: </label>
                        <select
                            value={majorFilter}
                            onChange={(e) => setMajorFilter(e.target.value)}
                        >
                            <option value="All">All Majors</option>
                            {selectedObjs.map((m) => (
                                <option key={m.major} value={m.major}>
                                    {m.major}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* LOWER-YEAR COURSES */}
                    {lowerYearRows.map((yr) => (
                        <div key={yr.year} className="year">
                            <h3>{yr.year}</h3>

                            {yr.courses.length === 0 ? (
                                <p>No required courses for this year.</p>
                            ) : (
                                <ul>
                                    {yr.courses
                                        .filter(
                                            (c) => majorFilter === "All" || c.majors.includes(majorFilter)
                                        )
                                        .map((c) => (
                                            <li key={c.courseDisplay}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={takenCourses.includes(c.courseDisplay)}
                                                        onChange={() => {
                                                            if (takenCourses.includes(c.courseDisplay)) {
                                                                setTakenCourses(
                                                                    takenCourses.filter(
                                                                        (x) => x !== c.courseDisplay
                                                                    )
                                                                );
                                                            } else {
                                                                setTakenCourses([
                                                                    ...takenCourses,
                                                                    c.courseDisplay,
                                                                ]);
                                                            }
                                                        }}
                                                    />
                                                    <strong>{c.courseDisplay}</strong>{" "}
                                                    <em>
                                                        ({c.credits ?? "?"} cr) — {c.majors.join(", ")}
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
                                        (c) =>
                                            (majorFilter === "All" ||
                                                c.majors.includes(majorFilter)) &&
                                            !takenCourses.includes(c.courseDisplay)
                                    ).length
                                }
                            </p>
                        </div>
                    ))}

                    {/* UPPER-YEAR COURSES */}
                    <div className="year">
                        <h3>Upper-Year Courses</h3>

                        {upperYearUniq.length === 0 ? (
                            <p>No upper-year courses.</p>
                        ) : (
                            <ul>
                                {upperYearUniq
                                    .filter(
                                        (c) => majorFilter === "All" || c.majors.includes(majorFilter)
                                    )
                                    .map((c) => (
                                        <li key={c.courseDisplay}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={takenCourses.includes(c.courseDisplay)}
                                                    onChange={() => {
                                                        if (takenCourses.includes(c.courseDisplay)) {
                                                            setTakenCourses(
                                                                takenCourses.filter(
                                                                    (x) => x !== c.courseDisplay
                                                                )
                                                            );
                                                        } else {
                                                            setTakenCourses([
                                                                ...takenCourses,
                                                                c.courseDisplay,
                                                            ]);
                                                        }
                                                    }}
                                                />
                                                <strong>{c.courseDisplay}</strong>{" "}
                                                <em>
                                                    ({c.credits ?? "?"} cr) — {c.majors.join(", ")}
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
