import { useState } from 'react'
import { X, Calendar, User, Edit3, Trash2, Upload, CheckCircle2, XCircle, ArrowRight, FileCheck, Award, MessageSquare } from 'lucide-react'
import { StatusBadge, JenisBadge, RatingBadge } from './Badges'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'
import { RKPD_MILESTONES, USERS } from '../data/seed'

export default function TaskDetailModal({ task, onClose, onEdit, onDelete }) {
  const { user } = useAuth()
  const { uploadFile, approveTask, rejectTask, delegateTask } = useTasks()

  const [reviewComment, setReviewComment] = useState('')
  const [kualitasRating, setKualitasRating] = useState('baik')
  const [delegateTarget, setDelegateTarget] = useState(USERS[2].id)
  const [fileName, setFileName] = useState('')

  if (!task) return null

  const milestone = RKPD_MILESTONES.find((m) => m.id === task.milestone_id)
  const isPimpinan = user?.role === 'kabid' || user?.role === 'subkoor'
  const isAssignee = user?.name === task.assignee || user?.id === task.assignee_id

  const handleSimulateUpload = (e) => {
    e.preventDefault()
    if (!fileName.trim()) return
    uploadFile(task.id, { name: fileName, size: 2457600 })
    setFileName('')
  }

  const handleApprove = () => {
    approveTask(task.id, {
      komentar: reviewComment || 'Softcopy hasil kerja telah disetujui.',
      penilaian: { ketepatan: task.deadline < new Date().toISOString().slice(0,10) ? 'terlambat' : 'tepat', kualitas: kualitasRating },
    })
  }

  const handleReject = () => {
    if (!reviewComment.trim()) {
      alert('Harap berikan catatan revisi untuk pelaksana.')
      return
    }
    rejectTask(task.id, reviewComment)
  }

  const handleDelegate = () => {
    const roleTitle = user?.role === 'kabid' ? 'Kepala Bidang I' : 'Sub-Koordinator Perencanaan'
    delegateTask(task.id, delegateTarget, roleTitle)
  }

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 640 }}>
        <div className="modal-head">
          <div>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
              ID: {task.id}
            </span>
            <h3 style={{ fontSize: 18, marginTop: 2 }}>{task.title}</h3>
          </div>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Status & Badges */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <StatusBadge task={task} />
            <JenisBadge jenis={task.jenis} kategoriRutin={task.kategori_rutin} />
            {task.penilaian && <RatingBadge penilaian={task.penilaian} />}
          </div>

          {/* Description */}
          <div style={{ background: 'var(--bg-sunken)', padding: 14, borderRadius: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
              Deskripsi / Arahan Pekerjaan
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.5 }}>{task.description || 'Tidak ada deskripsi rinci.'}</p>
          </div>

          {/* Metadata Grid */}
          <div className="detail-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="detail-item">
              <div className="k">
                <Calendar size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} />
                Deadline Pekerjaan
              </div>
              <div className="v" style={{ fontWeight: 600 }}>{task.deadline}</div>
            </div>
            <div className="detail-item">
              <div className="k">
                <User size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} />
                Pelaksana (Penanggung Jawab)
              </div>
              <div className="v" style={{ fontWeight: 600 }}>{task.assignee}</div>
            </div>
            {milestone && (
              <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                <div className="k">Tahapan Dokumen RKPD</div>
                <div className="v" style={{ fontWeight: 600, color: 'var(--cobalt)' }}>
                  Bulan {milestone.bulan}: {milestone.nama}
                </div>
              </div>
            )}
          </div>

          {/* Delegasi Chain (Alur Komando Berjenjang) */}
          {task.delegasi_chain && task.delegasi_chain.length > 0 && (
            <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <ArrowRight size={14} color="var(--cobalt)" /> Alur Delegasi Berjenjang
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {task.delegasi_chain.map((c, i) => (
                  <div key={i} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-elevated)', padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--cobalt)' }}>{c.dari}</span>
                    <ArrowRight size={12} color="var(--text-faint)" />
                    <span style={{ fontWeight: 600 }}>{c.ke}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 'auto' }}>{c.waktu}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Softcopy Hasil Kerja / Upload Section */}
          <div style={{ border: '1px dashed var(--border-strong)', borderRadius: 10, padding: 14, background: 'var(--bg-elevated)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileCheck size={16} color="var(--leaf)" /> Softcopy Hasil Kerja / File Laporan
            </div>
            {task.file_upload ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--leaf-100)', padding: '10px 12px', borderRadius: 8, color: 'var(--leaf)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>📄 {task.file_upload.nama}</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>Ukuran: {task.file_upload.ukuran} • Diunggah: {task.file_upload.waktu}</div>
                </div>
                <span className="badge" style={{ background: 'var(--bg-elevated)', color: 'var(--leaf)', fontSize: 11, padding: '2px 8px' }}>
                  Softcopy Siap
                </span>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>Belum ada softcopy file yang diunggah pelaksana.</p>
                {isAssignee && task.status !== 'selesai' && (
                  <form onSubmit={handleSimulateUpload} style={{ display: 'flex', gap: 8 }}>
                    <input
                      className="input"
                      style={{ fontSize: 12 }}
                      placeholder="Nama file (cth. Laporan_Final_Musrenbang.pdf)"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                      <Upload size={14} /> Unggah Softcopy
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Approval & Review Box (Pimpinan / Kabid / Subkoor View) */}
          {isPimpinan && task.file_upload && task.status !== 'selesai' && (
            <div style={{ border: '2px solid var(--cobalt)', borderRadius: 10, padding: 14, background: 'var(--cobalt-100)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--cobalt)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <MessageSquare size={16} /> Pemeriksaan & Persetujuan Pimpinan (Kabid / Subkoor)
              </div>
              <div className="field" style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 600 }}>Catatan Evaluasi / Feedback</label>
                <textarea
                  className="textarea"
                  rows={2}
                  style={{ fontSize: 12 }}
                  placeholder="Masukkan catatan apresiasi atau arahan perbaikan jika revisi..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600 }}>Penilaian Kualitas Hasil Kerja</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  {['baik', 'cukup', 'kurang'].map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKualitasRating(k)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 16,
                        border: `1px solid ${kualitasRating === k ? 'var(--cobalt)' : 'var(--border)'}`,
                        background: kualitasRating === k ? 'var(--cobalt)' : 'var(--bg-elevated)',
                        color: kualitasRating === k ? '#fff' : 'var(--text)',
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {k.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn btn-primary" onClick={handleApprove} style={{ background: 'var(--leaf)', border: 'none' }}>
                  <CheckCircle2 size={15} /> Setujui & Selesaikan
                </button>
                <button type="button" className="btn btn-danger" onClick={handleReject}>
                  <XCircle size={15} /> Minta Revisi
                </button>
              </div>
            </div>
          )}

          {/* Delegasi Lanjutan (Jika Subkoor/Kabid ingin melimpahkan) */}
          {isPimpinan && task.status !== 'selesai' && (
            <div style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                Lanjutkan Delegasi Tugas
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <select className="select" style={{ fontSize: 12 }} value={delegateTarget} onChange={(e) => setDelegateTarget(e.target.value)}>
                  {USERS.filter((u) => u.id !== user.id).map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.jabatan})
                    </option>
                  ))}
                </select>
                <button type="button" className="btn btn-ghost" onClick={handleDelegate} style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                  <ArrowRight size={14} /> Teruskan
                </button>
              </div>
            </div>
          )}

          {/* Review Record (If already reviewed) */}
          {task.komentar_review && (
            <div style={{ background: 'var(--bg-sunken)', padding: 12, borderRadius: 8, borderLeft: '4px solid var(--cobalt)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--cobalt)' }}>Catatan Review Pimpinan:</div>
              <div style={{ fontSize: 12, marginTop: 2, fontStyle: 'italic' }}>"{task.komentar_review}"</div>
            </div>
          )}
        </div>

        <div className="modal-foot">
          <button className="btn btn-danger" onClick={() => onDelete(task)}>
            <Trash2 size={15} /> Hapus
          </button>
          <button className="btn btn-primary" onClick={() => onEdit(task)}>
            <Edit3 size={15} /> Edit Tugas
          </button>
        </div>
      </div>
    </div>
  )
}

