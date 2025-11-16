import React from 'react'


export default function MajorSelector({ majors, selected, setSelected }) {
const toggle = (name) => {
if (selected.includes(name)) setSelected(selected.filter(s => s !== name))
else setSelected([...selected, name])
}


return (
<section className="major-selector">
<h2>Choose majors</h2>
<div className="majors-grid">
{majors.map(m => (
<label key={m.major} className={selected.includes(m.major) ? 'checked' : ''}>
<input
type="checkbox"
checked={selected.includes(m.major)}
onChange={() => toggle(m.major)}
/>
<div className="major-card">
<strong>{m.major}</strong>
<div className="meta">Min avg: {m.min_average ?? 'N/A'}</div>
</div>
</label>
))}
</div>
</section>
)
}