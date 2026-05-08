import AdminHeader from "../Components/header-admin";
import AdminSidebar from "../Components/sidebar-admin";
import { useState, useRef, useEffect } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const MILESTONES_LIST = [
  "Project Kick-off & Discovery",
  "User Interface Design & Prototyping",
  "Backend Development & API Integration",
  "Frontend Development",
  "Backend Development & AP Integration",
];

const TEAMS_DATA = [
  {
    id: 1,
    name: "Team A",
    title: "Blockchain-based Certificate",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
    desc: "Secure academic credential verification using blockchain technology to verify academic certificates and prevent fraud.",
    tags: ["Blockchain", "AI", "Web"],
    members: 5,
    doctor: "Ahmed El Nagger",
    teacherAssistant: "Ahmed Fayez",
    status: "On Track",
    currentMilestone: "User Interface Design & Prototyping",
    deadline: "Jan 20, 2026",
    progress: 65,
    problemStatement: "The current healthcare landscape faces challenges in continuous patient monitoring outside clinical settings, leading to delayed interventions and inefficient management.",
    milestones: [
      { name: "Project Discovery",         status: "completed",   grade: "18/20" },
      { name: "UI Design & Prototyping",   status: "delayed",     grade: "—"     },
      { name: "Backend & API Integration", status: "in_progress", grade: "—"     },
      { name: "Frontend & AP Integration", status: "locked",      grade: "—"     },
      { name: "Documentation",             status: "locked",      grade: "—"     },
    ],
    files: [
      { name: "Project Proposal",  milestone: "Project Discovery",       date: "Nov 20, 2025" },
      { name: "UI Mockup v2",      milestone: "UI Design & Prototyping", date: "Jan 10, 2026" },
    ],
  },
  {
    id: 2,
    name: "Team B",
    title: "Blockchain-based Certificate",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
    desc: "Secure academic credential verification using blockchain technology to verify academic certificates and prevent fraud.",
    tags: ["Blockchain", "AI", "Web"],
    members: 4,
    doctor: "Ahmed El Nagger",
    teacherAssistant: "Ahmed Fayez",
    status: "Delayed",
    currentMilestone: "Project Kick-off & Discovery",
    deadline: "Jan 20, 2026",
    progress: 30,
    problemStatement: "Students struggle with accessing verified academic records securely across institutions.",
    milestones: [
      { name: "Project Discovery",         status: "completed",   grade: "15/20" },
      { name: "UI Design & Prototyping",   status: "locked",      grade: "—"     },
      { name: "Backend & API Integration", status: "locked",      grade: "—"     },
      { name: "Frontend & AP Integration", status: "locked",      grade: "—"     },
      { name: "Documentation",             status: "locked",      grade: "—"     },
    ],
    files: [
      { name: "Project Proposal", milestone: "Project Discovery", date: "Nov 22, 2025" },
    ],
  },
  {
    id: 3,
    name: "Team C",
    title: "Blockchain-based Certificate",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
    desc: "Secure academic credential verification using blockchain technology to verify academic certificates and prevent fraud.",
    tags: ["Blockchain", "AI", "Web"],
    members: 6,
    doctor: "Ahmed El Nagger",
    teacherAssistant: "Ahmed Fayez",
    status: "Pending Submission",
    currentMilestone: "Backend Development & API Integration",
    deadline: "Jan 20, 2026",
    progress: 50,
    problemStatement: "Manual certificate verification is slow and prone to errors, requiring a digital solution.",
    milestones: [
      { name: "Project Discovery",         status: "completed",   grade: "17/20" },
      { name: "UI Design & Prototyping",   status: "completed",   grade: "16/20" },
      { name: "Backend & API Integration", status: "in_progress", grade: "—"     },
      { name: "Frontend & AP Integration", status: "locked",      grade: "—"     },
      { name: "Documentation",             status: "locked",      grade: "—"     },
    ],
    files: [
      { name: "Project Proposal",  milestone: "Project Discovery",         date: "Nov 18, 2025" },
      { name: "Design Mockups",    milestone: "UI Design & Prototyping",   date: "Dec 5, 2025"  },
    ],
  },
  {
    id: 4,
    name: "Team D",
    title: "Blockchain-based Certificate",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
    desc: "Secure academic credential verification using blockchain technology to verify academic certificates and prevent fraud.",
    tags: ["Blockchain", "AI", "Web"],
    members: 5,
    doctor: "Ahmed El Nagger",
    teacherAssistant: "Ahmed Fayez",
    status: "On Track",
    currentMilestone: "Frontend Development",
    deadline: "Jan 20, 2026",
    progress: 80,
    problemStatement: "There is a lack of a unified platform for managing and verifying academic achievements digitally.",
    milestones: [
      { name: "Project Discovery",         status: "completed",   grade: "19/20" },
      { name: "UI Design & Prototyping",   status: "completed",   grade: "18/20" },
      { name: "Backend & API Integration", status: "completed",   grade: "17/20" },
      { name: "Frontend & AP Integration", status: "in_progress", grade: "—"     },
      { name: "Documentation",             status: "locked",      grade: "—"     },
    ],
    files: [
      { name: "Project Proposal",  milestone: "Project Discovery",              date: "Nov 15, 2025" },
      { name: "UI Mockup Final",   milestone: "UI Design & Prototyping",        date: "Dec 1, 2025"  },
      { name: "API Docs",          milestone: "Backend & API Integration",      date: "Jan 3, 2026"  },
    ],
  },
];

// ─── Shared Styles & Helpers ──────────────────────────────────────────────────
const STATUS_STYLE = {
  "On Track":           { bg: "#e8f5e9", color: "#2e7d32", dot: "#43a047" },
  "Delayed":            { bg: "#fdecea", color: "#c62828", dot: "#e53935" },
  "Pending Submission": { bg: "#fff8e1", color: "#e65100", dot: "#fb8c00" },
};

const MS_STATUS = {
  completed:   { label: "Completed",   color: "#2e7d32", bg: "#e8f5e9", icon: "✓" },
  delayed:     { label: "Delayed",     color: "#c62828", bg: "#fdecea", icon: "✕" },
  in_progress: { label: "In Progress", color: "#1565c0", bg: "#e3f2fd", icon: "⏳" },
  locked:      { label: "Locked",      color: "#888",    bg: "#f5f5f5", icon: "🔒" },
};

const PROGRESS_STEPS = [
  "Initial Proposal",
  "Requirements & Planning",
  "Design & Development",
  "Internal Defense",
  "Final Defense",
];

// ─── Milestone Dropdown ───────────────────────────────────────────────────────
function MilestoneDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "7px 14px", background: "white",
        border: "1px solid #ddd", borderRadius: 8,
        fontSize: 13, color: "#1a1a2e", cursor: "pointer", minWidth: 260
      }}>
        <span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value ? `Milestones: ${value}` : "Milestones: All"}
        </span>
        <span style={{ fontSize: 10, color: "#aaa", flexShrink: 0 }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", right: 0,
          background: "white", border: "1px solid #ddd", borderRadius: 10,
          boxShadow: "0 6px 24px rgba(0,0,0,0.12)", zIndex: 300,
          minWidth: 280, overflow: "hidden"
        }}>
          {["", ...MILESTONES_LIST].map((m, i) => (
            <div key={i} onClick={() => { onChange(m); setOpen(false); }} style={{
              padding: "10px 16px", fontSize: 13, cursor: "pointer",
              background: value === m ? "#e3f2fd" : "white",
              color: value === m ? "#1565c0" : "#333",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderTop: i > 0 ? "1px solid #f5f5f5" : "none"
            }}>
              {m || "All Milestones"}
              {value === m && <span style={{ color: "#1565c0" }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Avatars ──────────────────────────────────────────────────────────────────
function Avatars({ count }) {
  const colors = ["#2a5298", "#0f6e56", "#993c1d", "#534ab7"];
  const show = Math.min(count, 4);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: show }).map((_, i) => (
        <div key={i} style={{
          width: 24, height: 24, borderRadius: "50%",
          background: colors[i % colors.length],
          border: "2px solid white", marginLeft: i > 0 ? -8 : 0,
          position: "relative", zIndex: show - i
        }} />
      ))}
      {count > 4 && (
        <span style={{ fontSize: 11, color: "#888", marginLeft: 4 }}>+{count - 4}</span>
      )}
    </div>
  );
}

// ─── Team Card ────────────────────────────────────────────────────────────────
function TeamCard({ team, onView }) {
  const st = STATUS_STYLE[team.status] || STATUS_STYLE["On Track"];
  return (
    <div style={{
      background: "white", border: "1px solid #e0e0e0",
      borderRadius: 12, overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "box-shadow 0.2s"
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Image with overlay */}
      <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
        <img src={team.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,15,35,0.1), rgba(10,15,35,0.72))" }} />
        <div style={{ position: "absolute", bottom: 12, left: 14, right: 14 }}>
          <h3 style={{ color: "white", fontSize: 14, fontWeight: 700, margin: "0 0 4px", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{team.title}</h3>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 11, margin: 0, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{team.desc}</p>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {team.tags.map(t => (
            <span key={t} style={{ background: "#e3f2fd", color: "#1565c0", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>{t}</span>
          ))}
        </div>

        {/* Members */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatars count={team.members} />
          <span style={{ fontSize: 12, color: "#555" }}>Members: <strong style={{ color: "#1a1a2e" }}>{team.members}</strong></span>
        </div>

        {/* Doctor / TA */}
        <div style={{ fontSize: 12, color: "#666", lineHeight: 1.7 }}>
          <div>Doctor: <span style={{ color: "#e53935", fontWeight: 500 }}>{team.doctor}</span></div>
          <div>Teacher Assistant: <span style={{ color: "#e53935", fontWeight: 500 }}>{team.teacherAssistant}</span></div>
        </div>

        {/* Status */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: st.dot, display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: st.color, fontWeight: 500 }}>{team.status}</span>
        </div>

        {/* View button */}
        <button onClick={() => onView(team)} style={{
          marginTop: "auto", width: "100%", padding: "9px 0",
          background: "#1e2a3a", color: "white", border: "none",
          borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer"
        }}>View Team</button>
      </div>
    </div>
  );
}

// ─── Progress Timeline ────────────────────────────────────────────────────────
function ProgressTimeline({ percent }) {
  const steps = PROGRESS_STEPS.length;
  const active = Math.round((percent / 100) * (steps - 1));
  return (
    <div>
      <div style={{ position: "relative", height: 8, background: "#e0e0e0", borderRadius: 4, margin: "8px 0 14px" }}>
        <div style={{ width: `${percent}%`, height: "100%", background: "#2e7d32", borderRadius: 4 }} />
        {PROGRESS_STEPS.map((_, i) => {
          const done = i <= active;
          const cur  = i === active;
          return (
            <div key={i} style={{
              position: "absolute", top: "50%",
              left: `${(i / (steps - 1)) * 100}%`,
              transform: "translate(-50%, -50%)",
              width: cur ? 18 : 13, height: cur ? 18 : 13,
              borderRadius: "50%",
              background: cur ? "#fb8c00" : done ? "#2e7d32" : "#bdbdbd",
              border: "2px solid white", zIndex: 2
            }} />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {PROGRESS_STEPS.map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 10, color: i <= active ? "#333" : "#aaa", fontWeight: i === active ? 700 : 400, padding: "0 2px" }}>{s}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        {[{ dot: "#2e7d32", label: "Completed" }, { dot: "#fb8c00", label: "In Progress" }, { dot: "#bdbdbd", label: "Locked" }].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#555" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: l.dot, display: "inline-block" }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ALL TEAMS VIEW ───────────────────────────────────────────────────────────
function AllTeamsView({ onViewTeam }) {
  const [search,    setSearch]    = useState("");
  const [dept,      setDept]      = useState("all");
  const [status,    setStatus]    = useState("all");
  const [doctor,    setDoctor]    = useState("all");
  const [milestone, setMilestone] = useState("");

  const filtered = TEAMS_DATA.filter(t => {
    const q = search.toLowerCase();
    return (
      (!q || t.title.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)) &&
      (status === "all" || t.status === status)
    );
  });

  const sel = { padding: "6px 10px", fontSize: 13, borderRadius: 8, border: "0.5px solid #ccc", background: "white", color: "#333", cursor: "pointer" };

  return (
    <div style={{ padding: 28, background: "#f5f6fa", flex: 1 }}>
      {/* Title row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: "0 0 2px" }}>All Teams</h1>
          <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Academic Year: 2025-2026</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <MilestoneDropdown value={milestone} onChange={setMilestone} />
          <div style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 5 }}>
            📅 Deadline: <strong>Jun 20, 2026</strong>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, margin: "12px 0 18px" }}>
        <span style={{ fontSize: 13, color: "#2e7d32", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ background: "#e8f5e9", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✓</span>
          <strong>{TEAMS_DATA.length}</strong> Teams On Track
        </span>
        <span style={{ fontSize: 13, color: "#c62828", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ background: "#fdecea", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>⚠</span>
          <strong>{TEAMS_DATA.filter(t => t.status === "Delayed").length}</strong> Teams At Risk
        </span>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap", alignItems: "center" }}>
        <input type="text" placeholder="Search by team, project, or student..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, maxWidth: 280, padding: "7px 12px", fontSize: 13, border: "0.5px solid #ccc", borderRadius: 8 }} />
        <select value={dept}   onChange={e => setDept(e.target.value)}   style={sel}>
          <option value="all">Department: All</option>
          <option value="cs">CS</option>
          <option value="is">IS</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} style={sel}>
          <option value="all">Status: All</option>
          <option value="On Track">On Track</option>
          <option value="Delayed">Delayed</option>
          <option value="Pending Submission">Pending Submission</option>
        </select>
        <select value={doctor} onChange={e => setDoctor(e.target.value)} style={sel}>
          <option value="all">Doctor: All</option>
          <option value="ahmed">Ahmed El Nagger</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
        {filtered.map(t => <TeamCard key={t.id} team={t} onView={onViewTeam} />)}
      </div>
    </div>
  );
}

// ─── VIEW TEAM DETAIL ─────────────────────────────────────────────────────────
function ViewTeamDetail({ team, onBack }) {
  const st = STATUS_STYLE[team.status] || STATUS_STYLE["On Track"];
  return (
    <div style={{ padding: 28, background: "#f5f6fa", flex: 1, overflowY: "auto" }}>

      {/* Back */}
      <button onClick={onBack} style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        marginBottom: 18, background: "none", border: "none",
        color: "#1565c0", fontSize: 13, cursor: "pointer", padding: 0, fontWeight: 500
      }}>← Back to All Teams</button>

      {/* Hero card */}
      <div style={{ background: "white", borderRadius: 14, overflow: "hidden", border: "2px solid #4a9eff", marginBottom: 20 }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ width: 280, minHeight: 190, flexShrink: 0 }}>
            <img src={team.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ flex: 1, padding: "22px 24px", minWidth: 240 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{team.title}</h2>
              <span style={{ fontSize: 13, color: "#555" }}>{team.name}</span>
              <span style={{ background: st.bg, color: st.color, borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>{team.status}</span>
            </div>
            <p style={{ fontSize: 13, color: "#666", margin: "0 0 16px", lineHeight: 1.7 }}>{team.desc}</p>
            <div style={{ fontSize: 13, color: "#444", lineHeight: 1.9 }}>
              <div><strong>Current Milestone:</strong> <span style={{ color: "#1565c0" }}>{team.currentMilestone}</span></div>
              <div><strong>Deadline:</strong> {team.deadline}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div style={{ background: "white", borderRadius: 12, padding: "18px 20px", border: "1px solid #e0e0e0", marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#e53935", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
          🔴 Problem Statement
        </h3>
        <p style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.8 }}>{team.problemStatement}</p>
      </div>

      {/* Team Progress */}
      <div style={{ background: "white", borderRadius: 12, padding: "18px 22px", border: "1px solid #e0e0e0", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Team Progress</h3>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#2e7d32" }}>{team.progress}% Complete</span>
        </div>
        <ProgressTimeline percent={team.progress} />
      </div>

      {/* Milestone Progress */}
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e0e0e0", marginBottom: 20, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Milestone Progress</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f9f9f9" }}>
              {["Milestone", "Status", "Grade"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #eee" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {team.milestones.map((m, i) => {
              const s = MS_STATUS[m.status] || MS_STATUS.locked;
              return (
                <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ padding: "11px 16px", color: "#1a1a2e" }}>{m.name}</td>
                  <td style={{ padding: "11px 16px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: s.bg, color: s.color, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 500 }}>
                      {s.icon} {s.label}
                    </span>
                  </td>
                  <td style={{ padding: "11px 16px", color: m.grade === "—" ? "#bbb" : "#1a1a2e", fontWeight: m.grade !== "—" ? 600 : 400 }}>
                    {m.grade}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Submitted Files */}
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e0e0e0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Submitted Files</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f9f9f9" }}>
              {["File Name", "Milestone", "Date"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #eee" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {team.files.map((f, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "11px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>📄</span>
                    <span style={{ color: "#1565c0", cursor: "pointer", textDecoration: "underline" }}>{f.name}</span>
                  </div>
                </td>
                <td style={{ padding: "11px 16px", color: "#555" }}>{f.milestone}</td>
                <td style={{ padding: "11px 16px", color: "#888" }}>{f.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
export default function TeamsSection() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AdminHeader />
        <div style={{ flex: 1, overflowY: "auto" }}>
          {selectedTeam
            ? <ViewTeamDetail team={selectedTeam} onBack={() => setSelectedTeam(null)} />
            : <AllTeamsView onViewTeam={setSelectedTeam} />
          }
        </div>
      </div>
    </div>
  );
}