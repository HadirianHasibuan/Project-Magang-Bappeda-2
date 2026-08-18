const API_BASE = 'http://localhost:5000/api'

export async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn(`[Backend API] Fallback for ${endpoint}:`, err.message)
    return null
  }
}

export const api = {
  getHealth: () => fetchApi('/health'),
  getUsers: () => fetchApi('/users'),
  login: (credentials) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getMilestones: () => fetchApi('/milestones'),
  getTasks: (params) => fetchApi(`/tasks?${new URLSearchParams(params || {}).toString()}`),
  createTask: (data) => fetchApi('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (id, patch) => fetchApi(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(patch) }),
  deleteTask: (id) => fetchApi(`/tasks/${id}`, { method: 'DELETE' }),
  delegateTask: (id, targetUserId, dariRole) =>
    fetchApi(`/tasks/${id}/delegate`, {
      method: 'POST',
      body: JSON.stringify({ target_user_id: targetUserId, dari_role: dariRole }),
    }),
  uploadFile: (id, fileData) =>
    fetchApi(`/tasks/${id}/upload`, {
      method: 'POST',
      body: JSON.stringify({ file_name: fileData.name, file_size: fileData.size }),
    }),
  reviewTask: (id, action, komentar, penilaian) =>
    fetchApi(`/tasks/${id}/review`, {
      method: 'POST',
      body: JSON.stringify({ action, komentar, penilaian }),
    }),
  getRekap: () => fetchApi('/rekap'),
}
