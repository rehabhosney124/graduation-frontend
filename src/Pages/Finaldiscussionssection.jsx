import AdminHeader from "../Components/header-admin";
import AdminSidebar from "../Components/sidebar-admin";
import { useState, useRef, useEffect } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PROJECTS = [
  "AI Traffic Optimization", "Blockchain-based Certificate Verification",
  "AI-based Sign Language Translator", "VR Career Simulator",
  "Smart Health Monitoring System", "E-Learning Platform",
];
const CATEGORIES = ["AI", "Web", "Blockchain", "VR", "Mobile", "Data Science"];
const HALLS = ["Hall A", "Hall B", "Hall C", "Hall D", "Hall E"];
const DOCTORS = ["Dr. Ahmed Ali", "Dr. Mona Rashed", "Dr. Noha Wael", "Dr. Khaled Hassan", "Dr. Sara Mahmoud"];
const ASSISTANTS = ["TA. Mohamed Marzouq", "TA. Ahmed Fayez", "TA. Sara Ali", "TA. Omar Hassan"];

const INITIAL_DISCUSSIONS = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  project: i < 3
    ? ["AI-Powered Exam Proctoring", "Blockchain-based Certificate Verifi...", "AI-based Sign Language Translator"][i]
    : "VR Career Simulator",
  dateTime: `Mar 21, ${(3 + Math.floor(i * 0.3)).toString().padStart(2, "0")}:${i % 2 === 0 ? "02" : "52"} AM`,
  location: ["Hall A", "Hall B", "Hall C", "Hall D", "Hall D"][i % 5],
  assistant: "TA. Mohamed Marzouq",
  doctor1: "Dr. Ahmed Ali",
  doctor2: "Dr. Ahmed Ali",
  doctor3: "Dr. Ahmed Ali",
}));

const TEAM_DETAIL = {
  title: "AI Mental Health Companion",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  desc: "The 'Smart Health Monitoring System' project focuses on developing an innovative solution for real-time tracking and analysis of vital health parameters. This system aims to provide individuals with comprehensive insights into their well-being, enabling proactive health management and timely interventions. It incorporates advanced sensor technology and data.",
  problemStatement: "The current healthcare landscape faces challenges in continuous patient monitoring outside clinical settings, leading to delayed interventions and inefficient management.",
  severity: "Critical",
  members: [
    { name: "Mohamed Ali",    color: "#2a5298" },
    { name: "Yara Tarek",     color: "#0f6e56" },
    { name: "Farida Khaled",  color: "#993c1d" },
    { name: "Shahd Mostafa",  color: "#993556" },
    { name: "Ahmed Kamal",    color: "#534ab7" },
    { name: "Rania Salah",    color: "#1565c0" },
  ],
  supervision: [
    { name: "Ahmed El-Nagar", color: "#2a5298" },
    { name: "Ahmed Fayez",    color: "#0f6e56" },
    { name: "Mohamed Qayem",  color: "#993c1d" },
  ],
  techStack: [
    { label: "Hardware", value: "ESP32, Heart Rate & Temp Sensors" },
    { label: "Mobile App", value: "Flutter (for iOS & Android)" },
    { label: "Database", value: "Firebase (Real-time data)" },
    { label: "Cloud", value: "Google Cloud (Storage & Hosting)" },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Avatar({ name, color, size = 40 }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div title={name} style={{
      width: size, height: size, borderRadius: "50%", background: color,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "white", fontSize: size * 0.28, fontWeight: 600, flexShrink: 0,
      cursor: "default"
    }}>{initials}</div>
  );
}

function Select({ value, onChange, options, placeholder, style }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      padding: "9px 12px", fontSize: 13, border: "1px solid #ddd",
      borderRadius: 8, background: "white", color: value ? "#1a1a2e" : "#aaa",
      cursor: "pointer", width: "100%", ...style
    }}>
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ─── VIEW 1: Final Discussion Committee Form ──────────────────────────────────
function FinalDiscussionForm({ onViewAll }) {
  const [project,   setProject]   = useState("Ai Traffic Optimization");
  const [category,  setCategory]  = useState("AI");
  const [date,      setDate]      = useState("2026-05-25");
  const [time,      setTime]      = useState("10:00");
  const [hall,      setHall]      = useState("Hall A");
  const [doctors,   setDoctors]   = useState(["Dr. Ahmed Ali", "Dr. Mona Rashed", "Dr. Noha Wael"]);
  const [assistant, setAssistant] = useState("TA. Mohamed Marzouq");

  function setDoctor(i, val) {
    const arr = [...doctors]; arr[i] = val; setDoctors(arr);
  }

  const card = { background: "white", border: "1px solid #e0e0e0", borderRadius: 12, padding: "22px 24px", marginBottom: 18 };
  const label = { fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 8, display: "block" };

  return (
    <div style={{ padding: 28, background: "#f5f6fa", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Final Discussion Committee</h1>
        <button onClick={onViewAll} style={{
          padding: "9px 18px", background: "white", border: "1px solid #ccc",
          borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#333"
        }}>View Final Discussions</button>
      </div>

      {/* Select Project */}
      <div style={card}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 16px" }}>Select Project</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <Select value={project} onChange={setProject} options={PROJECTS} placeholder="Select Project" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>Category</span>
            <div style={{ display: "flex", gap: 6 }}>
              {CATEGORIES.slice(0, 4).map(c => (
                <span key={c} onClick={() => setCategory(c)} style={{
                  padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  background: category === c ? "#1565c0" : "#e3f2fd",
                  color: category === c ? "white" : "#1565c0",
                  border: `1px solid ${category === c ? "#1565c0" : "#90caf9"}`
                }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Committee Details */}
      <div style={card}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 16px" }}>Committee Details</h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          {/* Date */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f5f6fa", border: "1px solid #ddd", borderRadius: 8, padding: "8px 14px" }}>
            <span>📅</span>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              style={{ border: "none", background: "transparent", fontSize: 13, color: "#1a1a2e", outline: "none" }} />
          </div>
          {/* Time */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f5f6fa", border: "1px solid #ddd", borderRadius: 8, padding: "8px 14px" }}>
            <span>🕐</span>
            <input type="time" value={time} onChange={e => setTime(e.target.value)}
              style={{ border: "none", background: "transparent", fontSize: 13, color: "#1a1a2e", outline: "none" }} />
          </div>
          {/* Hall */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f5f6fa", border: "1px solid #ddd", borderRadius: 8, padding: "6px 12px", minWidth: 130 }}>
            <span>📍</span>
            <select value={hall} onChange={e => setHall(e.target.value)}
              style={{ border: "none", background: "transparent", fontSize: 13, color: "#1a1a2e", outline: "none", cursor: "pointer" }}>
              {HALLS.map(h => <option key={h}>{h}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Assign Committee */}
      <div style={card}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 18px" }}>Assign Final Discussion Committee</h3>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {/* Doctors */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={label}>Doctors</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {doctors.map((d, i) => (
                <Select key={i} value={d} onChange={v => setDoctor(i, v)}
                  options={DOCTORS} placeholder="Select Doctor" />
              ))}
            </div>
          </div>
          {/* Assistant */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={label}>Assistant</label>
            <Select value={assistant} onChange={setAssistant} options={ASSISTANTS} placeholder="Select Assistant" />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <button style={{
          padding: "12px 40px", background: "#1e2a3a", color: "white",
          border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer"
        }}>Schedule Discussion</button>
      </div>
    </div>
  );
}

// ─── VIEW 2: All Final Discussions Table ──────────────────────────────────────
function AllDiscussionsView({ onBack, onViewTeam }) {
  const [discussions, setDiscussions] = useState(INITIAL_DISCUSSIONS);

  function handleDelete(id) {
    if (window.confirm("Delete this discussion?"))
      setDiscussions(prev => prev.filter(d => d.id !== id));
  }

  return (
    <div style={{ padding: 28, background: "#f5f6fa", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "#1565c0", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 6 }}>← Back</button>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>All Final Discussions</h1>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "9px 18px", background: "#1e2a3a", color: "white",
          border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer"
        }}>Download ↓</button>
      </div>

      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e0e0e0", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9f9f9", borderBottom: "1px solid #eee" }}>
                <th style={{ padding: "11px 14px", textAlign: "left", color: "#666", fontWeight: 600, width: 36 }}>#</th>
                {["Project", "Date and Time", "Location", "Assistant", "Doctor 1", "Doctor 2", "Doctor 3", ""].map((h, i) => (
                  <th key={i} style={{ padding: "11px 14px", textAlign: "left", color: "#666", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {discussions.map((d, i) => (
                <tr key={d.id} style={{ borderBottom: "1px solid #f5f5f5" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = "white"}
                >
                  <td style={{ padding: "10px 14px", color: "#888", fontSize: 12 }}>{i + 1}-</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span onClick={() => onViewTeam(d)} style={{ color: "#1565c0", cursor: "pointer", fontWeight: 500 }}>{d.project}</span>
                  </td>
                  <td style={{ padding: "10px 14px", color: "#555", whiteSpace: "nowrap" }}>{d.dateTime}</td>
                  <td style={{ padding: "10px 14px", color: "#555" }}>{d.location}</td>
                  <td style={{ padding: "10px 14px", color: "#555" }}>{d.assistant}</td>
                  <td style={{ padding: "10px 14px", color: "#555" }}>{d.doctor1}</td>
                  <td style={{ padding: "10px 14px", color: "#555" }}>{d.doctor2}</td>
                  <td style={{ padding: "10px 14px", color: "#555" }}>{d.doctor3}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#555", fontSize: 13 }}>✏</button>
                      <button onClick={() => handleDelete(d.id)} style={{ background: "none", border: "1px solid #ffcdd2", borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "#e53935", fontSize: 13 }}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── VIEW 3: Team Detail ──────────────────────────────────────────────────────
function TeamDetailView({ onBack }) {
  const t = TEAM_DETAIL;
  return (
    <div style={{ padding: 28, background: "#f5f6fa", flex: 1 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#1565c0", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 16 }}>← Back to Discussions</button>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* Left: project card */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{
            background: "white", borderRadius: 14, overflow: "hidden",
            border: "2px solid #4a9eff"
          }}>
            {/* Image */}
            <div style={{ height: 200, overflow: "hidden" }}>
              <img src={t.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            {/* Title & desc */}
            <div style={{ padding: "18px 20px" }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", margin: "0 0 10px" }}>{t.title}</h2>
              <p style={{ fontSize: 13, color: "#666", margin: "0 0 18px", lineHeight: 1.7 }}>{t.desc}</p>

              {/* Problem Statement */}
              <div style={{ background: "#fdecea", border: "1px solid #ef9a9a", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ color: "#e53935", fontSize: 16 }}>🔴</span>
                  <strong style={{ fontSize: 14, color: "#c62828" }}>Problem Statement</strong>
                </div>
                <p style={{ fontSize: 13, color: "#555", margin: "0 0 10px", lineHeight: 1.6 }}>{t.problemStatement}</p>
                <span style={{ background: "#e53935", color: "white", borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>{t.severity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: members, supervision, tech stack */}
        <div style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Members */}
          <div style={{ background: "white", borderRadius: 12, padding: "18px 18px", border: "1px solid #e0e0e0" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", margin: "0 0 14px" }}>Members</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              {t.members.map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 60 }}>
                  <Avatar name={m.name} color={m.color} size={42} />
                  <span style={{ fontSize: 10, color: "#555", textAlign: "center", lineHeight: 1.3 }}>{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supervision */}
          <div style={{ background: "white", borderRadius: 12, padding: "18px 18px", border: "1px solid #e0e0e0" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", margin: "0 0 14px" }}>Supervision</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {t.supervision.map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <Avatar name={s.name} color={s.color} size={42} />
                  <span style={{ fontSize: 10, color: "#1565c0", textAlign: "center", fontWeight: 500 }}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ background: "white", borderRadius: 12, padding: "18px 18px", border: "1px solid #e0e0e0" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", margin: "0 0 12px" }}>Tech Stack</h3>
            <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 12, color: "#555", lineHeight: 2 }}>
              {t.techStack.map((s, i) => (
                <li key={i}><strong style={{ color: "#1a1a2e" }}>{s.label}:</strong> {s.value}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function FinalDiscussionsSection() {
  // view: "form" | "all" | "team"
  const [view, setView] = useState("form");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AdminHeader />
        <div style={{ flex: 1, overflowY: "auto" }}>
          {view === "form" && <FinalDiscussionForm onViewAll={() => setView("all")} />}
          {view === "all"  && <AllDiscussionsView  onBack={() => setView("form")} onViewTeam={() => setView("team")} />}
          {view === "team" && <TeamDetailView onBack={() => setView("all")} />}
        </div>
      </div>
    </div>
  );
}