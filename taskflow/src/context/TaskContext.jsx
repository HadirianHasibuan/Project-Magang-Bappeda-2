import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readStore, writeStore } from '../utils/storage'
import { SEED_TASKS, USERS, RKPD_MILESTONES } from '../data/seed'

const TaskContext = createContext(null)

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function isOverdue(task) {
  return task.status !== 'selesai' && task.deadline < todayStr()
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => readStore('taskflow_tasks', null) ?? SEED_TASKS)

  useEffect(() => {
    writeStore('taskflow_tasks', tasks)
  }, [tasks])

  const addTask = (data) => {
    const assigneeObj = USERS.find((u) => u.id === data.assignee_id) || USERS[0]
    const milestoneObj = RKPD_MILESTONES.find((m) => m.id === data.milestone_id)
    const task = {
      id: `t${Date.now()}`,
      title: data.title,
      description: data.description || '',
      jenis: data.jenis || 'direktif',
      kategori_rutin: data.kategori_rutin || null,
      milestone_id: data.milestone_id || null,
      deadline: data.deadline || todayStr(),
      dibuat_oleh: data.dibuat_oleh || 'kabid1',
      assignee_id: data.assignee_id || 'staf_eja',
      assignee: assigneeObj.name,
      delegasi_chain: [
        { dari: 'Kepala Bidang I', ke: assigneeObj.name, waktu: new Date().toLocaleString('id-ID') },
      ],
      status: 'belum',
      file_upload: null,
      approval_status: null,
      komentar_review: '',
      penilaian: null,
      dibuat_pada: new Date().toISOString(),
      diselesaikan_pada: null,
    }
    setTasks((prev) => [task, ...prev])
    return task
  }

  const updateTask = (id, patch) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const moveTask = (id, status) => {
    updateTask(id, {
      status,
      ...(status === 'selesai' ? { diselesaikan_pada: new Date().toISOString() } : {}),
    })
  }

  const uploadFile = (id, fileObj) => {
    updateTask(id, {
      status: 'sedang',
      file_upload: {
        nama: fileObj.name || 'dokumen_hasil.pdf',
        ukuran: fileObj.size ? `${(fileObj.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
        waktu: new Date().toLocaleString('id-ID'),
      },
      approval_status: 'pending',
    })
  }

  const approveTask = (id, { komentar, penilaian }) => {
    const task = tasks.find((t) => t.id === id)
    const isLate = task ? isOverdue(task) : false
    updateTask(id, {
      status: 'selesai',
      approval_status: 'approved',
      komentar_review: komentar || 'Dokumen telah diperiksa dan disetujui.',
      penilaian: penilaian || { ketepatan: isLate ? 'terlambat' : 'tepat', kualitas: 'baik' },
      diselesaikan_pada: new Date().toISOString(),
    })
  }

  const rejectTask = (id, komentar) => {
    updateTask(id, {
      status: 'revisi',
      approval_status: 'rejected',
      komentar_review: komentar || 'Perlu perbaikan sesuai arahan.',
    })
  }

  const delegateTask = (id, targetUserId, currentUserRoleName) => {
    const targetUser = USERS.find((u) => u.id === targetUserId)
    if (!targetUser) return
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const newChain = [
          ...(t.delegasi_chain || []),
          { dari: currentUserRoleName || 'Pimpinan', ke: targetUser.name, waktu: new Date().toLocaleString('id-ID') },
        ]
        return {
          ...t,
          assignee_id: targetUser.id,
          assignee: targetUser.name,
          delegasi_chain: newChain,
        }
      })
    )
  }

  const stats = useMemo(() => {
    const total = tasks.length
    const belum = tasks.filter((t) => t.status === 'belum').length
    const sedang = tasks.filter((t) => t.status === 'sedang').length
    const selesai = tasks.filter((t) => t.status === 'selesai').length
    const revisi = tasks.filter((t) => t.status === 'revisi').length
    const overdue = tasks.filter(isOverdue).length
    return { total, belum, sedang, selesai, revisi, overdue }
  }, [tasks])

  const notifications = useMemo(() => {
    const list = []
    const today = todayStr()
    tasks.forEach((t) => {
      if (t.status === 'selesai') return
      if (t.deadline < today) {
        list.push({
          id: `ov_${t.id}`,
          type: 'overdue',
          text: `⚠️ Tugas "${t.title}" sudah melewati batas waktu (${t.deadline}).`,
          time: t.deadline,
        })
      } else if (t.deadline === today) {
        list.push({
          id: `dt_${t.id}`,
          type: 'today',
          text: `⏰ Tugas "${t.title}" jatuh tempo HARI INI!`,
          time: t.deadline,
        })
      }
      if (t.approval_status === 'pending' && t.file_upload) {
        list.push({
          id: `app_${t.id}`,
          type: 'approval',
          text: `📄 Softcopy "${t.title}" telah diunggah (${t.assignee}), menunggu persetujuan.`,
          time: t.file_upload.waktu,
        })
      }
      if (t.status === 'revisi') {
        list.push({
          id: `rev_${t.id}`,
          type: 'revisi',
          text: `🔴 Tugas "${t.title}" memerlukan revisi dari Pimpinan.`,
          time: t.deadline,
        })
      }
    })
    return list
  }, [tasks])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        uploadFile,
        approveTask,
        rejectTask,
        delegateTask,
        stats,
        notifications,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}

