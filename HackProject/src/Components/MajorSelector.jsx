import React, { useState, useRef, useEffect } from 'react'

import './MajorSelectorStyle.css' // import the CSS file

export default function MajorSelector({ majors, selected, setSelected }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    const toggle = (name) => {
        if (selected.includes(name)) {
            setSelected(selected.filter(s => s !== name))
        } else {
            setSelected([...selected, name])
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <section className="major-selector">
            <h2>Choose majors</h2>

            <div
                className="dropdown-header"
                onClick={() => setOpen(!open)}
            >
                {selected.length > 0 ? selected.join(', ') : 'Select majors...'}
            </div>

            {open && (
                <div className="dropdown-list" ref={dropdownRef}>
                    {majors.map((m) => (
                        <label key={m.major} className="dropdown-item">
                            <input
                                type="checkbox"
                                checked={selected.includes(m.major)}
                                onChange={() => toggle(m.major)}
                            />
                            <div className="major-info">
                                <strong>{m.major}</strong>
                                <div className="meta">Min avg: {m.min_average ?? 'N/A'}</div>
                            </div>
                        </label>
                    ))}
                </div>
            )}
        </section>
    )
}
