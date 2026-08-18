import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MyTasks from './pages/MyTasks'
import Kanban from './pages/Kanban'
import CalendarPage from './pages/Calendar'
import RekapKinerja from './pages/RekapKinerja'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import TaskFormModal from './components/TaskFormModal'
import TaskDetailModal from './components/TaskDetailModal'
import ConfirmModal from './components/ConfirmModal'
import { useTasks } from './context/TaskContext'

export default function App() {
  const { addTask, updateTask, deleteTask } = useTasks()
  const [globalQuery, setGlobalQuery] = useState('')

  const [detailTask, setDetailTask] = useState(null)
  const [formState, setFormState] = useState(null) // { mode: 'add' | 'edit', task? }
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openView = (task) => setDetailTask(task)
  const openAdd = () => setFormState({ mode: 'add' })
  const openEdit = (task) => {
    setDetailTask(null)
    setFormState({ mode: 'edit', task })
  }
  const askDelete = (task) => {
    setDetailTask(null)
    setDeleteTarget(task)
  }
  const confirmDelete = () => {
    deleteTask(deleteTarget.id)
    setDeleteTarget(null)
  }

  const submitForm = (data) => {
    if (formState.mode === 'edit') {
      updateTask(formState.task.id, data)
    } else {
      addTask(data)
    }
    setFormState(null)
  }

  const pageProps = {
    onView: openView,
    onEdit: openEdit,
    onDelete: askDelete,
    onAdd: openAdd,
    globalQuery,
    setGlobalQuery,
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout globalQuery={globalQuery} setGlobalQuery={setGlobalQuery} />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard {...pageProps} />} />
          <Route path="/tasks" element={<MyTasks {...pageProps} />} />
          <Route path="/kanban" element={<Kanban {...pageProps} />} />
          <Route path="/calendar" element={<CalendarPage {...pageProps} />} />
          <Route path="/rekap" element={<RekapKinerja {...pageProps} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>


      {detailTask && (
        <TaskDetailModal task={detailTask} onClose={() => setDetailTask(null)} onEdit={openEdit} onDelete={askDelete} />
      )}
      {formState && (
        <TaskFormModal
          initial={formState.mode === 'edit' ? formState.task : null}
          onClose={() => setFormState(null)}
          onSubmit={submitForm}
        />
      )}
      {deleteTarget && (
        <ConfirmModal
          title="Hapus Task"
          message={`Apakah Anda yakin ingin menghapus task "${deleteTarget.title}"? Tindakan ini tidak bisa dibatalkan.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}
