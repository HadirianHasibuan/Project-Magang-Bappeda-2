import { Search, Plus } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'all', label: 'Semua Status' },
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]
const PRIORITY_OPTIONS = [
  { value: 'all', label: 'Semua Prioritas' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export default function SearchFilterBar({ query, setQuery, status, setStatus, priority, setPriority, onAdd }) {
  return (
    <div className="toolbar">
      <div className="grow search-input">
        <Search />
        <input
          className="input"
          placeholder="Cari task..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <select className="select" style={{ width: 'auto' }} value={status} onChange={(e) => setStatus(e.target.value)}>
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <select className="select" style={{ width: 'auto' }} value={priority} onChange={(e) => setPriority(e.target.value)}>
        {PRIORITY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {onAdd && (
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={16} /> Tambah Task
        </button>
      )}
    </div>
  )
}
