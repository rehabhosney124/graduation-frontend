import AdminHeader from "../Components/header-admin";
import AdminSidebar from "../Components/sidebar-admin";
import { useState, useRef, useEffect } from "react";

// ─── Initial Data ────────────────────────────────────────────────────────────
const DEPARTMENTS = ["CS", "IS", "IT", "AI", "Cyber Security", "Data Science"];
const ALL_TRACKS  = ["VR", "AI", "Web", "Mobile", "Cyber Security", "Computer Vision", "Data Science", "Blockchain"];

const initialProjects = [
  { id: 1, title: "VR Career Simulator",       dept: "IS", desc: "A secure system built on blockchain technology to verify academic certificates and prevent fraud.", tracks: ["IS", "VR"] },
  { id: 2, title: "VR Career Simulator",       dept: "IS", desc: "A secure system built on blockchain technology to verify academic certificates and prevent fraud.", tracks: ["IS", "VR"] },
  { id: 3, title: "VR Career Simulator",       dept: "IS", desc: "A secure system built on blockchain technology to verify academic certificates and prevent fraud.", tracks: ["IS", "VR"] },
  { id: 4, title: "VR Career Simulator",       dept: "IS", desc: "A secure system built on blockchain technology to verify academic certificates and prevent fraud.", tracks: ["IS", "VR"] },
  { id: 5, title: "VR Career Simulator",       dept: "IS", desc: "A secure system built on blockchain technology to verify academic certificates and prevent fraud.", tracks: ["IS", "VR"] },
  { id: 6, title: "VR Career Simulator",       dept: "IS", desc: "A secure system built on blockchain technology to verify academic certificates and prevent fraud.", tracks: ["IS", "VR"] },
];

// ─── Track Tag ───────────────────────────────────────────────────────────────
function TrackTag({ label, onRemove }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: "#e3f2fd", color: "#1565c0",
      borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 500
    }}>
      {label}
      {onRemove && (
        <span onClick={onRemove} style={{ cursor: "pointer", fontSize: 14, lineHeight: 1, color: "#1565c0" }}>×</span>
      )}
    </span>
  );
}

// ─── Tracks Input with dropdown ──────────────────────────────────────────────
function TracksInput({ tracks, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function toggle(t) {
    if (tracks.includes(t)) onChange(tracks.filter(x => x !== t));
    else onChange([...tracks, t]);
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{
        border: "1px solid #ddd", borderRadius: 8, padding: "6px 10px",
        display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
        minHeight: 38, cursor: "pointer", background: "white"
      }} onClick={() => setOpen(o => !o)}>
        {tracks.length === 0 && <span style={{ color: "#aaa", fontSize: 13 }}>Add Required Tracks</span>}
        {tracks.map(t => (
          <TrackTag key={t} label={t} onRemove={e => { e.stopPropagation(); toggle(t); }} />
        ))}
        <span style={{ marginLeft: "auto", color: "#aaa", fontSize: 16 }}>+</span>
      </div>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "white", border: "1px solid #ddd", borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 200, overflow: "hidden"
        }}>
          {ALL_TRACKS.map(t => (
            <div key={t} onClick={() => toggle(t)} style={{
              padding: "9px 14px", fontSize: 13, cursor: "pointer",
              background: tracks.includes(t) ? "#e3f2fd" : "white",
              color: tracks.includes(t) ? "#1565c0" : "#333",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              {t}
              {tracks.includes(t) && <span style={{ color: "#1565c0" }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Project Modal (Add / Edit) ──────────────────────────────────────────────
function ProjectModal({ mode, project, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(
    isEdit
      ? { title: project.title, dept: project.dept, desc: project.desc, tracks: [...project.tracks] }
      : { title: "", dept: "", desc: "", tracks: [] }
  );

  function set(field, val) { setForm(f => ({ ...f, [field]: val })); }

  function handleSave() {
    if (!form.title.trim() || !form.dept) return;
    onSave({ ...form });
  }

  const labelStyle = { fontSize: 13, fontWeight: 600, color: "#1a1a2e", marginBottom: 5, display: "block" };
  const inputStyle = {
    width: "100%", padding: "9px 12px", fontSize: 13,
    border: "1px solid #ddd", borderRadius: 8,
    boxSizing: "border-box", outline: "none", color: "#333"
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "white", borderRadius: 12, padding: 28,
        width: 420, boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        maxHeight: "90vh", overflowY: "auto"
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1a1a2e" }}>
            {isEdit ? "Edit Project" : "Add Proposed Project"}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa" }}>✕</button>
        </div>

        {/* Project Title */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Project Title</label>
          <input
            value={form.title}
            onChange={e => set("title", e.target.value)}
            placeholder="Enter Project Title"
            style={inputStyle}
          />
        </div>

        {/* Department */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Department</label>
          <select
            value={form.dept}
            onChange={e => set("dept", e.target.value)}
            style={{ ...inputStyle, background: "white", cursor: "pointer" }}
          >
            <option value="">Choose Department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Description</label>
          <textarea
            value={form.desc}
            onChange={e => set("desc", e.target.value)}
            placeholder="Write Description..."
            rows={5}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "sans-serif" }}
          />
        </div>

        {/* Recommended Tracks */}
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Recommended Tracks</label>
          <TracksInput tracks={form.tracks} onChange={t => set("tracks", t)} />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleSave} style={{
            flex: 1, padding: "10px 0", background: "#1e2a3a",
            color: "white", border: "none", borderRadius: 8,
            fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>
            {isEdit ? "Save Changes" : "Save"}
          </button>
          <button onClick={onClose} style={{
            flex: 1, padding: "10px 0", background: "white",
            border: "1px solid #ccc", borderRadius: 8,
            fontSize: 14, color: "#555", cursor: "pointer"
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div style={{
      background: "white", border: "1px solid #e0e0e0",
      borderRadius: 12, padding: "18px 16px",
      display: "flex", flexDirection: "column", gap: 10
    }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{project.title}</h3>

      <span style={{
        display: "inline-block", background: "#e3f2fd", color: "#1565c0",
        borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 500, alignSelf: "flex-start"
      }}>{project.dept} Department</span>

      <p style={{ fontSize: 13, color: "#666", margin: 0, lineHeight: 1.6, flex: 1 }}>{project.desc}</p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {project.tracks.map(t => <TrackTag key={t} label={t} />)}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button onClick={() => onEdit(project)} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          padding: "7px 0", border: "1px solid #ccc", borderRadius: 8,
          background: "white", color: "#333", fontSize: 13, cursor: "pointer"
        }}>
          ✏ Edit
        </button>
        <button onClick={() => onDelete(project.id)} style={{
          width: 38, display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid #e53935", borderRadius: 8,
          background: "white", color: "#e53935", fontSize: 16, cursor: "pointer"
        }}>
          🗑
        </button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function SuggestionsProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [modal, setModal]       = useState(null); // null | { mode: "add" } | { mode: "edit", project }
  let nextId = useRef(initialProjects.length + 1);

  function handleSave(form) {
    if (modal.mode === "add") {
      setProjects(prev => [...prev, { id: nextId.current++, ...form }]);
    } else {
      setProjects(prev => prev.map(p => p.id === modal.project.id ? { ...p, ...form } : p));
    }
    setModal(null);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this project?")) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <AdminSidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminHeader />

        <div style={{ padding: 28, background: "#f5f6fa", flex: 1 }}>
          {/* Page title */}
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", margin: "0 0 4px" }}>
            Proposed Projects
          </h1>
          <p style={{ fontSize: 14, color: "#888", margin: "0 0 20px" }}>
            Create and manage suggested graduation projects for students to choose from
          </p>

          {/* Add button */}
          <button onClick={() => setModal({ mode: "add" })} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "10px 20px", background: "#1e2a3a",
            color: "white", border: "none", borderRadius: 8,
            fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 24
          }}>
            + Add New Project
          </button>

          {/* Grid */}
          {projects.length === 0 ? (
            <div style={{ textAlign: "center", color: "#aaa", padding: 60, fontSize: 15 }}>
              No projects yet. Click "+ Add New Project" to get started.
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 18
            }}>
              {projects.map(p => (
                <ProjectCard
                  key={p.id} project={p}
                  onEdit={proj => setModal({ mode: "edit", project: proj })}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <ProjectModal
          mode={modal.mode}
          project={modal.project}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}