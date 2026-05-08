import { useState } from "react";
import AdminHeader from "../Components/header-admin";
import AdminSidebar from "../Components/sidebar-admin";
import { useProfile } from "../context/ProfileContext";
import { useAcademicYear } from "../context/Academicyearcontext";

/* ─── DATA ─── */
const DEFAULT_MILESTONES = [
  {
    id: 1, phase: 1,
    title: "Project Kick-off & Discovery",
    status: "Completed",
    deadline: "Submitted: Nov 30,2025",
    reqs: [
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
    ],
  },
  {
    id: 2, phase: 2,
    title: "User Interface Design & Prototyping",
    status: "On Progress",
    deadline: "Due: Jan 30,2025",
    reqs: [
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
    ],
  },
  {
    id: 3, phase: 3,
    title: "Backend Development & API Integration",
    status: "On Progress",
    deadline: "Due: Jan 30,2025",
    reqs: [
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
    ],
  },
  {
    id: 4, phase: 4,
    title: "Backend Development & API Integration",
    status: "Pending",
    deadline: "Due: Jan 30,2025",
    reqs: [
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
      "Lorem ipsum dolor sit amet consectetur",
    ],
  },
];

// Each template key maps to its own milestones array
const INIT_TEMPLATE_DATA = {
  "Milestone 2021-2022": [],
  "Milestone 2022-2023": [],
  "Milestone 2023-2024": DEFAULT_MILESTONES,
};

/* ─── STATUS BADGE ─── */
function StatusBadge({ status }) {
  const map = {
    Completed:     { bg: "#22c55e", color: "#fff" },
    "On Progress": { bg: "#f97316", color: "#fff" },
    Pending:       { bg: "#94a3b8", color: "#fff" },
  };
  const s = map[status] || map.Pending;
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "3px 14px", borderRadius: 20,
      fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
    }}>{status}</span>
  );
}

/* ─── TIMELINE DOT ─── */
function Dot({ status }) {
  const map = {
    Completed:     { border: "#22c55e", fill: "#22c55e" },
    "On Progress": { border: "#f97316", fill: "#fff"    },
    Pending:       { border: "#cbd5e1", fill: "#fff"    },
  };
  const c = map[status] || map.Pending;
  return (
    <div style={{
      width: 14, height: 14, borderRadius: "50%",
      border: `3px solid ${c.border}`, background: c.fill,
      flexShrink: 0, marginTop: 22, zIndex: 1,
    }} />
  );
}

/* ─── MINI CALENDAR ─── */
function MiniCalendar({ label, selected, onChange }) {
  const now = new Date();
  const [yr, setYr] = useState(now.getFullYear());
  const [mo, setMo] = useState(now.getMonth());
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAYS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  const dim   = new Date(yr, mo + 1, 0).getDate();
  const first = (() => { const d = new Date(yr, mo, 1).getDay(); return d === 0 ? 6 : d - 1; })();
  const cells = [...Array(first).fill(null), ...Array.from({length: dim}, (_, i) => i + 1)];

  const isSel = d => {
    if (!selected || !d) return false;
    const s = new Date(selected);
    return s.getFullYear() === yr && s.getMonth() === mo && s.getDate() === d;
  };
  const isTod = d => d && now.getFullYear() === yr && now.getMonth() === mo && now.getDate() === d;

  const prev = () => mo === 0 ? (setMo(11), setYr(y => y-1)) : setMo(m => m-1);
  const next = () => mo === 11? (setMo(0),  setYr(y => y+1)) : setMo(m => m+1);

  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 13, color: "#1e293b", marginBottom: 8 }}>{label}</div>
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 12, background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <button onClick={prev} style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#64748b" }}>‹</button>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{MONTHS[mo]} {yr}</span>
          <button onClick={next} style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#64748b" }}>›</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1, marginBottom:4 }}>
          {DAYS.map(d => <div key={d} style={{ textAlign:"center", fontSize:10, color:"#94a3b8", fontWeight:600 }}>{d}</div>)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1 }}>
          {cells.map((d, i) => (
            <div key={i} onClick={() => d && onChange(`${yr}-${String(mo+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`)}
              style={{
                textAlign:"center", fontSize:11, padding:"4px 2px", borderRadius:"50%",
                cursor: d ? "pointer" : "default",
                background: isSel(d) ? "#1d4ed8" : isTod(d) ? "#dbeafe" : "transparent",
                color: isSel(d) ? "#fff" : isTod(d) ? "#1d4ed8" : d ? "#334155" : "transparent",
                fontWeight: isSel(d) || isTod(d) ? 700 : 400,
              }}>{d || ""}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ADD MILESTONE MODAL ─── */
function AddMilestoneModal({ onClose, onSave, nextPhase }) {
  const [name, setName]     = useState("");
  const [desc, setDesc]     = useState("");
  const [reqs, setReqs]     = useState(["UI Wireframes", "UI Wireframes"]);
  const [newReq, setNewReq] = useState("");
  const [startDate, setSD]  = useState("");
  const [deadline, setDL]   = useState("");
  const { profileImage } = useProfile();

  const addReq = () => { if (newReq.trim()) { setReqs(r => [...r, newReq.trim()]); setNewReq(""); } };
  const delReq = i => setReqs(r => r.filter((_,idx) => idx !== i));

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(15,23,42,0.5)",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000,
    }}>
      <div style={{
        background:"#fff", borderRadius:12, width:540,
        maxHeight:"92vh", overflowY:"auto",
        boxShadow:"0 24px 64px rgba(0,0,0,0.22)",
        fontFamily:"'Segoe UI',sans-serif",
      }}>
        {/* dark header bar like sidebar */}
        <div style={{
          background:"#1e293b", borderRadius:"12px 12px 0 0",
          padding:"13px 20px",
        }}>
          <span style={{ color:"#fff", fontSize:15, fontWeight:700 }}>Add New Milestone</span>
        </div>

        <div style={{ padding:"22px 24px" }}>

          {/* Milestone Order */}
          <DashedSection>
            <div style={{ fontWeight:700, fontSize:13, color:"#1e293b", marginBottom:10 }}>Milestone Order</div>
            <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, color:"#64748b" }}>Position:</span>
                <select style={SEL}>
                  <option>Select previous</option>
                </select>
                {/* profile avatar - same as header */}
                {profileImage ? (
                  <img src={profileImage} alt="profile"
                    style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", flexShrink:0, border:"2px solid #e2e8f0" }} />
                ) : (
                  <div style={{
                    width:36, height:36, borderRadius:"50%",
                    background:"#e2e8f0", flexShrink:0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:18, color:"#94a3b8",
                  }}>👤</div>
                )}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, color:"#64748b" }}>This will be phase:</span>
                <div style={{
                  background:"#1d4ed8", color:"#fff",
                  borderRadius:6, width:26, height:26,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontWeight:700, fontSize:13,
                }}>{nextPhase}</div>
              </div>
            </div>
          </DashedSection>

          {/* Milestone Name */}
          <DashedSection>
            <div style={{ fontWeight:700, fontSize:13, color:"#1e293b", marginBottom:8 }}>Milestone Name</div>
            <input style={FI} placeholder="Enter Milestone Name" value={name} onChange={e=>setName(e.target.value)} />
          </DashedSection>

          {/* Description */}
          <DashedSection>
            <div style={{ fontWeight:700, fontSize:13, color:"#1e293b", marginBottom:8 }}>Description</div>
            <textarea style={{...FI, height:80, resize:"vertical"}} placeholder="Describe The Milestone..." value={desc} onChange={e=>setDesc(e.target.value)} />
          </DashedSection>

          {/* Requirements */}
          <DashedSection>
            <div style={{ fontWeight:700, fontSize:13, color:"#1e293b", marginBottom:10 }}>Requirements</div>
            {reqs.map((r,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                <span style={{ color:"#1d4ed8", fontSize:18 }}>•</span>
                <span style={{ flex:1, fontSize:13, color:"#334155" }}>{r}</span>
                <button onClick={()=>delReq(i)} style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8", fontSize:14 }}>🗑</button>
              </div>
            ))}
            <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6 }}>
              <span style={{ color:"#1d4ed8", fontWeight:700, fontSize:16 }}>+</span>
              <input style={{...FI, flex:1, padding:"6px 10px", fontSize:12}}
                placeholder="Add a requirement" value={newReq}
                onChange={e=>setNewReq(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&addReq()} />
            </div>
          </DashedSection>

          {/* Calendars */}
          <div style={{ display:"flex", gap:16, marginTop:8, marginBottom:22 }}>
            <MiniCalendar label="Start" selected={startDate} onChange={setSD} />
            <MiniCalendar label="Deadline" selected={deadline} onChange={setDL} />
          </div>

          {/* Buttons */}
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <button onClick={()=>onSave({name,desc,reqs,startDate,deadline})} style={{
              background:"#1d4ed8", color:"#fff", border:"none",
              borderRadius:8, padding:"9px 24px", fontSize:13, fontWeight:600, cursor:"pointer",
            }}>Save Milestone</button>
            <button onClick={onClose} style={{
              background:"#fff", color:"#64748b", border:"1px solid #e2e8f0",
              borderRadius:8, padding:"9px 20px", fontSize:13, cursor:"pointer",
            }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashedSection({ children }) {
  return (
    <div style={{
      border:"1.5px dashed #93c5fd", borderRadius:8,
      padding:"12px 14px", marginBottom:14,
    }}>{children}</div>
  );
}

/* ─── MILESTONE CARD ─── */
function MilestoneCard({ m, onDelete }) {
  const [note, setNote] = useState("");
  const done = m.status === "Completed";

  return (
    <div style={{
      background:"#fff", borderRadius:10,
      border:"1px solid #e9eef5",
      boxShadow:"0 1px 3px rgba(0,0,0,0.06)",
      padding:"16px 18px", flex:1,
    }}>
      {/* Title + badge */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
        <div>
          <span style={{ fontSize:12, color:"#94a3b8", fontWeight:500 }}>Phase {m.phase} : </span>
          <span style={{ fontSize:14, fontWeight:700, color:"#1e293b" }}>{m.title}</span>
        </div>
        <StatusBadge status={m.status} />
      </div>

      {/* Reqs */}
      {m.reqs.map((r,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
          <input type="checkbox" defaultChecked={done} readOnly style={{ accentColor:"#1d4ed8", width:12, height:12 }} />
          <span style={{ fontSize:12, color:"#64748b" }}>{r}</span>
        </div>
      ))}

      {/* Deadline row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:12 }}>
        <span style={{ fontSize:12, color:"#94a3b8", display:"flex", alignItems:"center", gap:5 }}>
          📅 {m.deadline}
        </span>
        {done
          ? <button style={{ background:"none", border:"1px solid #94a3b8", color:"#64748b", borderRadius:6, padding:"3px 12px", fontSize:12, cursor:"pointer" }}>🔒 Reopen</button>
          : <button style={{ background:"#1d4ed8", color:"#fff", border:"none", borderRadius:6, padding:"4px 16px", fontSize:12, fontWeight:600, cursor:"pointer" }}>
              {m.status==="Pending" ? "Set" : "Update"}
            </button>
        }
      </div>

      {/* Notes + actions — only for non-completed */}
      {!done && (
        <>
          <div style={{ borderTop:"1px solid #f1f5f9", marginTop:12, paddingTop:10 }}>
            <div style={{
              display:"flex", alignItems:"center", gap:6,
              border:"1px solid #e2e8f0", borderRadius:6, padding:"5px 10px",
            }}>
              <span style={{ fontSize:16, color:"#94a3b8" }}>☰</span>
              <input placeholder="Add notes for students" value={note}
                onChange={e=>setNote(e.target.value)}
                style={{ border:"none", outline:"none", flex:1, fontSize:12, color:"#64748b", background:"transparent" }} />
            </div>
          </div>
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <CardBtn color="#1d4ed8" border="#bfdbfe">✏ Edit</CardBtn>
            <CardBtn color="#dc2626" border="#fecaca" onClick={()=>onDelete(m.id)}>🗑 Delete</CardBtn>
            <CardBtn color="#ea580c" border="#fed7aa">🔒 Close Submissions</CardBtn>
          </div>
        </>
      )}
    </div>
  );
}

function CardBtn({ color, border, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background:"none", border:`1px solid ${border}`, color,
      borderRadius:6, padding:"4px 12px", fontSize:12, fontWeight:500, cursor:"pointer",
    }}>{children}</button>
  );
}

/* ─── TEMPLATE DROPDOWN ─── */
function TemplateDropdown({ selected, templates, onChange, onAddNew }) {
  const [open, setOpen] = useState(false);
  // label shown in trigger: if selected is "Add New" show that style
  const isNew = selected === "Add New";
  return (
    <div style={{ position:"relative" }}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        background:"none", border:"none", cursor:"pointer",
        fontSize:13, color:"#334155", display:"flex", alignItems:"center", gap:4,
      }}>
        Milestone Template:{" "}
        <span style={{ color:"#1d4ed8", fontWeight:600 }}>{selected}</span> ▾
      </button>
      {open && (
        <div style={{
          position:"absolute", right:0, top:"calc(100% + 4px)", background:"#fff",
          border:"1px solid #e2e8f0", borderRadius:8,
          boxShadow:"0 8px 24px rgba(0,0,0,0.12)", zIndex:200, minWidth:210,
        }}>
          {templates.map(t => (
            <div key={t} onClick={()=>{onChange(t);setOpen(false);}} style={{
              padding:"9px 16px", fontSize:13, cursor:"pointer",
              background: t===selected ? "#eff6ff" : "#fff",
              color: t===selected ? "#1d4ed8" : "#334155",
              fontWeight: t===selected ? 600 : 400,
              display:"flex", alignItems:"center", gap:8,
            }}>
              {t===selected && <span style={{color:"#1d4ed8"}}>✓</span>} {t}
            </div>
          ))}
          <div
            onClick={()=>{ onAddNew(); setOpen(false); }}
            style={{ padding:"9px 16px", fontSize:13, color:"#1d4ed8", cursor:"pointer", borderTop:"1px solid #f1f5f9", fontWeight:500 }}
          >
            Add New
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── FILTER TABS ─── */
function FilterTabs({ milestones, active, setActive }) {
  const tabs = [
    { k:"All",         l:`All (${milestones.length})` },
    { k:"On Progress", l:`On Progress (${milestones.filter(m=>m.status==="On Progress").length})` },
    { k:"Completed",   l:`Completed (${milestones.filter(m=>m.status==="Completed").length})` },
    { k:"Pending",     l:`Pending (${milestones.filter(m=>m.status==="Pending").length})` },
  ];
  return (
    <div style={{ display:"flex", gap:6, marginBottom:20 }}>
      {tabs.map(t => (
        <button key={t.k} onClick={()=>setActive(t.k)} style={{
          padding:"5px 16px", borderRadius:20, border:"none", cursor:"pointer",
          fontSize:13, fontWeight:500,
          background: active===t.k ? "#1d4ed8" : "#f1f5f9",
          color: active===t.k ? "#fff" : "#64748b",
          transition:"all .15s",
        }}>{t.l}</button>
      ))}
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function MilestonesSetup() {
  // templateData: { [templateName]: milestone[] }
  const [templateData, setTemplateData] = useState(INIT_TEMPLATE_DATA);
  // ordered list of template names
  const [templates, setTemplates]       = useState(Object.keys(INIT_TEMPLATE_DATA));
  const [template, setTemplate]         = useState("Milestone 2023-2024");
  const [active, setActive]             = useState("All");
  const [showModal, setShowModal]       = useState(false);

  // pull live academic year from the same context the header uses
  const { academicYear } = useAcademicYear();

  // milestones for current template
  const milestones = templateData[template] || [];

  const filtered = active==="All" ? milestones : milestones.filter(m=>m.status===active);

  // update milestones for current template
  const setMilestones = updater => {
    setTemplateData(prev => ({
      ...prev,
      [template]: typeof updater === "function" ? updater(prev[template] || []) : updater,
    }));
  };

  const handleSave = ({ name, reqs, deadline }) => {
    setMilestones(prev => [...prev, {
      id: Date.now(),
      phase: prev.length + 1,
      title: name || "New Milestone",
      status: "Pending",
      deadline: deadline ? `Due: ${deadline}` : "TBD",
      reqs,
    }]);
    setShowModal(false);
  };

  const handleDelete = id => setMilestones(prev => prev.filter(m => m.id !== id));

  // "Add New" in dropdown → create a fresh template with auto-generated name
  const handleAddNewTemplate = () => {
    const newName = `Milestone ${new Date().getFullYear()}-${new Date().getFullYear()+1} (${templates.length + 1})`;
    setTemplates(prev => [...prev, newName]);
    setTemplateData(prev => ({ ...prev, [newName]: [] }));
    setTemplate(newName);
    setActive("All");
  };

  return (
    <div style={{
      display:"flex", flexDirection:"column", height:"100vh",
      background:"#f1f5f9", fontFamily:"'Segoe UI',Tahoma,sans-serif",
    }}>
      <AdminHeader />

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        <AdminSidebar activeItem="Milestones Setup" />

        <main style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>

          {/* Header row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <h1 style={{ margin:0, fontSize:22, fontWeight:700, color:"#1e293b" }}>Milestones Setup</h1>
            <TemplateDropdown
              selected={template}
              templates={templates}
              onChange={t => { setTemplate(t); setActive("All"); }}
              onAddNew={handleAddNewTemplate}
            />
          </div>

          {/* Info bar */}
          <div style={{
            background:"#fff", border:"1px solid #e2e8f0", borderRadius:10,
            padding:"12px 18px", marginBottom:18, fontSize:13,
          }}>
            <div style={{ fontWeight:700, color:"#1e293b", marginBottom:4 }}>Graduation Project Standard Milestones</div>
            <div style={{ display:"flex", gap:24, color:"#94a3b8" }}>
              <span>Academic Year: {academicYear}-{academicYear + 1}</span>
              <span>Applied To: All Teams</span>
              <span>Last Updated: Jan 2</span>
            </div>
          </div>

          {/* Filter tabs */}
          <FilterTabs milestones={milestones} active={active} setActive={setActive} />

          {/* Timeline */}
          <div style={{ position:"relative", paddingLeft:6 }}>
            {milestones.length > 0 && (
              <div style={{
                position:"absolute", left:13, top:28, bottom:50,
                width:2, background:"#e2e8f0",
              }} />
            )}
            {filtered.map(m => (
              <div key={m.id} style={{ display:"flex", gap:18, marginBottom:14, alignItems:"flex-start" }}>
                <Dot status={m.status} />
                <MilestoneCard m={m} onDelete={handleDelete} />
              </div>
            ))}
          </div>

          {/* Add button */}
          <div style={{ display:"flex", justifyContent:"center", marginTop:10 }}>
            <button onClick={()=>setShowModal(true)} style={{
              background:"#1d4ed8", color:"#fff", border:"none",
              borderRadius:28, padding:"11px 30px", fontSize:14,
              fontWeight:600, cursor:"pointer",
              boxShadow:"0 4px 14px rgba(29,78,216,0.35)",
              display:"flex", alignItems:"center", gap:8,
            }}>
              + Add New Milestone
            </button>
          </div>
        </main>
      </div>

      {showModal && (
        <AddMilestoneModal
          onClose={()=>setShowModal(false)}
          onSave={handleSave}
          nextPhase={milestones.length + 1}
        />
      )}
    </div>
  );
}

/* ─── SHARED STYLE ATOMS ─── */
const FI = {
  width:"100%", border:"1px solid #e2e8f0", borderRadius:7,
  padding:"8px 12px", fontSize:13, color:"#334155",
  outline:"none", boxSizing:"border-box", fontFamily:"inherit", background:"#fff",
};

const SEL = {
  border:"1px solid #e2e8f0", borderRadius:6,
  padding:"5px 24px 5px 10px", fontSize:13, color:"#334155",
  outline:"none", background:"#fff", cursor:"pointer",
};