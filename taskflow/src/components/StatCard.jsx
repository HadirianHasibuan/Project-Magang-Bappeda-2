export default function StatCard({ label, value, Icon, tone = 'cobalt' }) {
  return (
    <div className="card stat-card">
      <div className="top">
        <div
          className="icon-wrap"
          style={{ background: `var(--${tone}-100)`, color: `var(--${tone})` }}
        >
          <Icon />
        </div>
      </div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  )
}
