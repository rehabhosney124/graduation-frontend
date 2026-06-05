import AdminHeader from "../Components/header-admin";
import AdminSidebar from "../Components/sidebar-admin";
import { useState, useMemo } from "react";

const initialProjects = [
  { id: 1, title: "Smart Clinic AI System", desc: "AI-powered system for managing patient diagnosis and appointments using machine learning", tags: ["AI", "Healthcare", "Data Science"], similarity: 95, level: "High", team: "Team Alpha", members: 6, matched: "AI Medical Assistant (Team Delta)", date: "Nov 5, 2025", status: "pending", dept: "cs", track: "ai", titleSimilarity: 90, featureSimilarity: 95, keywordsMatch: 75, aiInsights: "The idea shares similar core functionality and target domain with a previously submitted project. Features, implementation approach and features show strong similarities." },
  { id: 2, title: "Smart Clinic AI System", desc: "AI-powered system for managing patient diagnosis and appointments using machine learning", tags: ["AI", "Healthcare", "Data Science"], similarity: 70, level: "Medium", team: "Team Alpha", members: 6, matched: "AI Medical Assistant (Team Delta)", date: "Nov 5, 2025", status: "pending", dept: "cs", track: "ai", titleSimilarity: 70, featureSimilarity: 68, keywordsMatch: 60, aiInsights: "Moderate overlap in features and title. Some unique implementation details exist that differentiate this project." },
  { id: 3, title: "Smart Clinic AI System", desc: "AI-powered system for managing patient diagnosis and appointments using machine learning", tags: ["AI", "Healthcare", "Data Science"], similarity: 20, level: "Low", team: "Team Alpha", members: 6, matched: "AI Medical Assistant (Team Delta)", date: "Nov 5, 2025", status: "pending", dept: "cs", track: "ai", titleSimilarity: 20, featureSimilarity: 18, keywordsMatch: 25, aiInsights: "Low similarity detected. This project has distinct features and a unique approach compared to existing submissions." },
  { id: 4, title: "E-Learning Platform", desc: "Adaptive learning system using AI to personalize education tracks for students", tags: ["AI", "Education", "Web"], similarity: 45, level: "Low", team: "Team Beta", members: 4, matched: "EduSmart (Team Gamma)", date: "Nov 8, 2025", status: "approved", dept: "cs", track: "web", titleSimilarity: 45, featureSimilarity: 40, keywordsMatch: 50, aiInsights: "Minor overlaps in learning-related keywords. The AI personalization angle is sufficiently differentiated." },
  { id: 5, title: "Smart Inventory Manager", desc: "Real-time inventory tracking system with predictive restocking using ML algorithms", tags: ["ML", "Business", "Data Science"], similarity: 60, level: "Medium", team: "Team Gamma", members: 5, matched: "StockAI (Team Zeta)", date: "Nov 10, 2025", status: "pending", dept: "eng", track: "ai", titleSimilarity: 55, featureSimilarity: 62, keywordsMatch: 58, aiInsights: "Medium overlap in inventory management concepts. Predictive restocking is a shared feature with existing projects." },
];

const SIMILARITY_STYLES = {
  High:   { bg: "#fdecea", color: "#c62828", border: "#ef9a9a" },
  Medium: { bg: "#fff8e1", color: "#e65100", border: "#ffcc80" },
  Low:    { bg: "#e8f5e9", color: "#2e7d32", border: "#a5d6a7" },
};

const TAG_COLORS = {
  AI:            { bg: "#e3f2fd", color: "#1565c0" },
  Healthcare:    { bg: "#fce4ec", color: "#880e4f" },
  "Data Science":{ bg: "#ede7f6", color: "#4527a0" },
  Education:     { bg: "#e8f5e9", color: "#2e7d32" },
  Web:           { bg: "#fff8e1", color: "#e65100" },
  ML:            { bg: "#e0f2f1", color: "#00695c" },
  Business:      { bg: "#fbe9e7", color: "#bf360c" },
};

function Avatars({ count }) {
  const colors = ["#2a5298", "#0f6e56", "#993c1d", "#993556", "#534ab7"];
  const show = Math.min(count, 3);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: show }).map((_, i) => (
        <div key={i} style={{
          width: 26, height: 26, borderRadius: "50%",
          background: colors[i % colors.length],
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: 10, fontWeight: 500,
          marginLeft: i > 0 ? -6 : 0,
          border: "2px solid white", zIndex: show - i, position: "relative"
        }}>U{i + 1}</div>
      ))}
      {count > 3 && (
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: "#eee", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 10, color: "#666",
          marginLeft: -6, border: "2px solid white", position: "relative"
        }}>+{count - 3}</div>
      )}
    </div>
  );
}

function Tag({ label }) {
  const style = TAG_COLORS[label] || { bg: "#f5f5f5", color: "#555" };
  return (
    <span style={{
      background: style.bg, color: style.color,
      borderRadius: 12, padding: "3px 10px",
      fontSize: 12, marginRight: 6, display: "inline-block"
    }}>{label}</span>
  );
}

function SimilarityBadge({ similarity, level }) {
  const s = SIMILARITY_STYLES[level] || SIMILARITY_STYLES.Low;
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: s.bg, border: `0.5px solid ${s.border}`,
      borderRadius: 8, overflow: "hidden", flexShrink: 0
    }}>
      <span style={{ padding: "5px 12px", fontSize: 14, fontWeight: 600, color: s.color }}>{similarity}%</span>
      <span style={{ padding: "5px 12px", fontSize: 12, fontWeight: 500, color: s.color, borderLeft: `0.5px solid ${s.border}` }}>{level}</span>
    </div>
  );
}

// ── Circular progress gauge ──────────────────────────────────────────────────
function CircleGauge({ value, level }) {
  const s = SIMILARITY_STYLES[level] || SIMILARITY_STYLES.Low;
  const r = 54, circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div style={{ position: "relative", width: 130, height: 130, flexShrink: 0 }}>
      <svg width="130" height="130" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="65" cy="65" r={r} fill="none" stroke="#eee" strokeWidth="10" />
        <circle cx="65" cy="65" r={r} fill="none" stroke={s.color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{value}%</span>
      </div>
    </div>
  );
}

// ── Stat bar row ─────────────────────────────────────────────────────────────
function StatBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginBottom: 3 }}>
        <span>{label}</span><span style={{ fontWeight: 600 }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.5s" }} />
      </div>
    </div>
  );
}

// ── Detail Panel (right side) ────────────────────────────────────────────────
function DetailPanel({ project, onClose, onApprove, onReject, onSendForEdit }) {
  if (!project) return null;
  const s = SIMILARITY_STYLES[project.level] || SIMILARITY_STYLES.Low;

  return (
    <div style={{
      width: 300, flexShrink: 0,
      background: "white", borderLeft: "1px solid #e0e0e0",
      display: "flex", flexDirection: "column",
      overflowY: "auto", position: "relative"
    }}>
      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: 10, right: 12,
        background: "none", border: "none", fontSize: 18,
        cursor: "pointer", color: "#aaa", lineHeight: 1
      }}>✕</button>

      <div style={{ padding: "20px 18px 16px" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 4px", paddingRight: 20 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{project.team}</p>
      </div>

      {/* Circle gauge */}
      <div style={{ display: "flex", justifyContent: "center", padding: "0 18px 16px" }}>
        <CircleGauge value={project.similarity} level={project.level} />
      </div>

      {/* Status */}
      <div style={{ padding: "0 18px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
          <span style={{ color: "#555" }}>Status:</span>
          <span style={{
            background: project.level === "High" ? "#fdecea" : project.level === "Medium" ? "#fff8e1" : "#e8f5e9",
            color: s.color, padding: "2px 10px", borderRadius: 10, fontSize: 12, fontWeight: 600
          }}>{project.level} Risk</span>
        </div>

        <StatBar label="Title Similarity"   value={project.titleSimilarity}   color={s.color} />
        <StatBar label="Feature Similarity" value={project.featureSimilarity} color={s.color} />
        <StatBar label="Keywords Match"     value={project.keywordsMatch}     color={s.color} />

        <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
          Similar To: <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{project.matched}</span>
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ margin: "0 18px 16px", background: "#f0f4ff", borderRadius: 10, padding: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 6 }}>🤖 AI Insights</div>
        <p style={{ fontSize: 12, color: "#555", margin: 0, lineHeight: 1.6 }}>{project.aiInsights}</p>
      </div>

      {/* Actions */}
      <div style={{ padding: "0 18px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onApprove(project.id)}
            disabled={project.status === "approved"}
            style={{
              flex: 1, padding: "8px 0", background: project.status === "approved" ? "#c8e6c9" : "#e8f5e9",
              border: "1px solid #43a047", borderRadius: 8, color: "#2e7d32",
              fontSize: 13, fontWeight: 600, cursor: project.status === "approved" ? "default" : "pointer"
            }}
          >{project.status === "approved" ? "✓ Approved" : "Approve Idea"}</button>

          <button
            onClick={() => onReject(project.id)}
            disabled={project.status === "rejected"}
            style={{
              flex: 1, padding: "8px 0", background: "#fdecea",
              border: "1px solid #e53935", borderRadius: 8, color: "#c62828",
              fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}
          >Reject Idea</button>
        </div>

        <button
          onClick={() => onSendForEdit(project)}
          style={{
            width: "100%", padding: "8px 0", background: "white",
            border: "1px solid #ccc", borderRadius: 8, color: "#333",
            fontSize: 13, fontWeight: 500, cursor: "pointer"
          }}
        >Send For Edit</button>
      </div>
    </div>
  );
}

// ── Send For Edit Modal ──────────────────────────────────────────────────────
function SendForEditModal({ project, onClose, onSend }) {
  const [feedback, setFeedback] = useState("");

  function handleSend() {
    if (!feedback.trim()) return;
    onSend(project.id, feedback);
    setFeedback("");
  }

  if (!project) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "white", borderRadius: 12, padding: 24,
        width: 420, boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#1a1a2e" }}>Send Idea For Edit</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#aaa" }}>✕</button>
        </div>

        <div style={{ fontSize: 13, color: "#555", marginBottom: 14 }}>
          <div>Project: <strong style={{ color: "#1a1a2e" }}>{project.title}</strong></div>
          <div>Team: <strong style={{ color: "#1a1a2e" }}>{project.team}</strong></div>
        </div>

        <textarea
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          placeholder="Write your feedback for the team... Explain what should be changed before resubmission."
          rows={5}
          style={{
            width: "100%", padding: "10px 12px",
            border: "1px solid #ddd", borderRadius: 8,
            fontSize: 13, color: "#333", resize: "vertical",
            boxSizing: "border-box", outline: "none", fontFamily: "sans-serif"
          }}
        />

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <button onClick={onClose} style={{
            padding: "8px 20px", border: "1px solid #ccc", borderRadius: 8,
            background: "white", color: "#555", fontSize: 13, cursor: "pointer"
          }}>Cancel</button>
          <button onClick={handleSend} style={{
            padding: "8px 20px", border: "none", borderRadius: 8,
            background: "#1e2a3a", color: "white", fontSize: 13,
            fontWeight: 600, cursor: "pointer"
          }}>Send for Edit ✓</button>
        </div>
      </div>
    </div>
  );
}

// ── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, isSelected, onViewDetails }) {
  return (
    <div style={{
      background: isSelected ? "#f0f4ff" : "white",
      border: `1px solid ${isSelected ? "#4a9eff" : "#e0e0e0"}`,
      borderRadius: 12, padding: "16px 18px", marginBottom: 12,
      cursor: "pointer", transition: "all 0.15s"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e", margin: "0 0 4px" }}>{project.title}</h3>
          <p style={{ fontSize: 12, color: "#666", margin: "0 0 10px", lineHeight: 1.5 }}>{project.desc}</p>
          <div style={{ marginBottom: 10 }}>
            {project.tags.map(t => <Tag key={t} label={t} />)}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatars count={project.members} />
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#1a1a2e" }}>{project.team}</span>
                <span style={{ fontSize: 12, color: "#888", marginLeft: 4 }}>
                  Members: <span style={{ color: "#2a5298", fontWeight: 600 }}>{project.members}</span>
                </span>
                <div style={{ fontSize: 11, color: "#aaa" }}>{project.date}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: "#888" }}>
                Matched with: <span style={{ color: "#333", fontWeight: 500 }}>{project.matched}</span>
              </span>
              <button
                onClick={() => onViewDetails(project)}
                style={{
                  padding: "5px 14px", background: "#1e2a3a",
                  color: "white", border: "none", borderRadius: 8,
                  fontSize: 12, cursor: "pointer"
                }}
              >View Details</button>
            </div>
          </div>
        </div>
        <SimilarityBadge similarity={project.similarity} level={project.level} />
      </div>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AIFilterPage_admin() {
  const [projects, setProjects]       = useState(initialProjects);
  const [search, setSearch]           = useState("");
  const [dept, setDept]               = useState("all");
  const [track, setTrack]             = useState("all");
  const [sim, setSim]                 = useState("all");
  const [status, setStatus]           = useState("pending");
  const [selectedProject, setSelectedProject] = useState(null);
  const [editProject, setEditProject] = useState(null);

  const stats = useMemo(() => ({
    pending:  projects.filter(p => p.status === "pending").length,
    high:     projects.filter(p => p.level === "High").length,
    approved: projects.filter(p => p.status === "approved").length,
  }), [projects]);

  const filtered = useMemo(() => projects.filter(p => {
    const q = search.toLowerCase();
    return (
      (!q || p.title.toLowerCase().includes(q) || p.team.toLowerCase().includes(q)) &&
      (dept   === "all" || p.dept  === dept)   &&
      (track  === "all" || p.track === track)  &&
      (sim    === "all" || p.level.toLowerCase() === sim) &&
      (status === "all" || p.status === status)
    );
  }), [projects, search, dept, track, sim, status]);

  function handleApprove(id) {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: "approved" } : p));
    setSelectedProject(prev => prev?.id === id ? { ...prev, status: "approved" } : prev);
  }

  function handleReject(id) {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: "rejected" } : p));
    setSelectedProject(prev => prev?.id === id ? { ...prev, status: "rejected" } : prev);
  }

  function handleSendForEdit(id, feedback) {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: "edit_requested", feedback } : p));
    setSelectedProject(prev => prev?.id === id ? { ...prev, status: "edit_requested", feedback } : prev);
    setEditProject(null);
  }

  const selectStyle = {
    padding: "6px 10px", fontSize: 13,
    borderRadius: 8, border: "0.5px solid #ccc",
    background: "white", color: "#333", cursor: "pointer"
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <AdminSidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AdminHeader />

        {/* body: list + detail panel side by side */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Left: project list */}
          <div style={{ flex: 1, padding: 24, background: "#f5f6fa", overflowY: "auto" }}>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a2e", margin: "0 0 16px" }}>
              AI Project Ideas Filter
            </h1>

            {/* Stats */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ background: "#fff8e1", border: "0.5px solid #f9a825", borderRadius: 20, padding: "5px 14px", fontSize: 13, color: "#e65100", display: "flex", alignItems: "center", gap: 6 }}>
                ⏳ <strong>{stats.pending}</strong> Pending Reviews
              </div>
              <div style={{ background: "#fdecea", border: "0.5px solid #e53935", borderRadius: 20, padding: "5px 14px", fontSize: 13, color: "#c62828", display: "flex", alignItems: "center", gap: 6 }}>
                ✕ <strong>{stats.high}</strong> High Similarity
              </div>
              <div style={{ background: "#e8f5e9", border: "0.5px solid #43a047", borderRadius: 20, padding: "5px 14px", fontSize: 13, color: "#2e7d32", display: "flex", alignItems: "center", gap: 6 }}>
                ✓ <strong>{stats.approved}</strong> Approved
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
              <input
                type="text" placeholder="Search by team, project, or student..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, minWidth: 180, maxWidth: 280, padding: "7px 12px", fontSize: 13, border: "0.5px solid #ccc", borderRadius: 8 }}
              />
              <select value={dept}   onChange={e => setDept(e.target.value)}   style={selectStyle}>
                <option value="all">Department: All</option>
                <option value="cs">Computer Science</option>
                <option value="eng">Engineering</option>
              </select>
              <select value={track}  onChange={e => setTrack(e.target.value)}  style={selectStyle}>
                <option value="all">Track: All</option>
                <option value="ai">AI</option>
                <option value="web">Web</option>
              </select>
              <select value={sim}    onChange={e => setSim(e.target.value)}    style={selectStyle}>
                <option value="all">Similarity: All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                <option value="pending">Status: Pending</option>
                <option value="approved">Approved</option>
                <option value="all">All</option>
              </select>
            </div>

            {/* Cards */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", color: "#aaa", padding: 40 }}>No projects match your filters.</div>
            ) : (
              filtered.map(p => (
                <ProjectCard
                  key={p.id} project={p}
                  isSelected={selectedProject?.id === p.id}
                  onViewDetails={setSelectedProject}
                />
              ))
            )}
          </div>

          {/* Right: detail panel */}
          {selectedProject && (
            <DetailPanel
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onApprove={handleApprove}
              onReject={handleReject}
              onSendForEdit={setEditProject}
            />
          )}
        </div>
      </div>

      {/* Send For Edit Modal */}
      {editProject && (
        <SendForEditModal
          project={editProject}
          onClose={() => setEditProject(null)}
          onSend={handleSendForEdit}
        />
      )}
    </div>
  );
}