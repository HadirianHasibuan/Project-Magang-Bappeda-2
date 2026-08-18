const SEGMENTS = [
  { key: 'todo', label: 'To Do', color: 'var(--slate)' },
  { key: 'inprogress', label: 'In Progress', color: 'var(--cobalt)' },
  { key: 'done', label: 'Done', color: 'var(--leaf)' },
]

export default function ProgressChart({ stats }) {
  const { todo, inprogress, done, total } = stats
  const size = 168
  const stroke = 20
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r

  const values = { todo, inprogress, done }
  let offset = 0
  const safeTotal = total || 1
  const donePct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-sunken)" strokeWidth={stroke} />
        {SEGMENTS.map((seg) => {
          const value = values[seg.key]
          const frac = value / safeTotal
          const dash = frac * c
          const circle = (
            <circle
              key={seg.key}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeLinecap="butt"
            />
          )
          offset += dash
          return circle
        })}
        <text x="50%" y="47%" textAnchor="middle" fontFamily="Sora, sans-serif" fontWeight="800" fontSize="26" fill="var(--text)">
          {donePct}%
        </text>
        <text x="50%" y="62%" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="var(--text-faint)">
          Selesai
        </text>
      </svg>
      <div className="donut-legend">
        {SEGMENTS.map((seg) => (
          <div className="legend-row" key={seg.key}>
            <span className="l">
              <span className="swatch" style={{ background: seg.color }} /> {seg.label}
            </span>
            <span className="v">{values[seg.key]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
