import AdminHeader from "../Components/header-admin";
import AdminSidebar from "../Components/sidebar-admin";
import { useState } from "react";
import { Typography } from "@mui/material";

// ── Mock Data ─────────────────────────────────────────────
const mockStudents = Array.from({ length: 10 }, (_, i) => ({
  id: 221040 + i,
  name: "Aliya Othman",
  email: `aliyaothman${i}@cs.bsu.edu.eg`,
  department: "CS",
}));

const mockDoctors = Array.from({ length: 10 }, (_, i) => ({
  id: 10200 + i,
  name: "Dr. Ahmed Sami",
  email: `ahmed.sami${i}@cs.bsu.edu.eg`,
  department: "CS",
}));

const mockAssistants = Array.from({ length: 10 }, (_, i) => ({
  id: 30100 + i,
  name: "Sara Hassan",
  email: `sara.hassan${i}@cs.bsu.edu.eg`,
  department: "CS",
}));

const dataMap = {
  Students: mockStudents,
  Doctors: mockDoctors,
  Assistants: mockAssistants,
};

// ── Table ─────────────────────────────────────────────────
function DataTable({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wide">
            <th className="py-3 px-4 font-medium">ID</th>
            <th className="py-3 px-4 font-medium">Name</th>
            <th className="py-3 px-4 font-medium">University Email</th>
            <th className="py-3 px-4 font-medium">Department</th>
            <th className="py-3 px-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id}
              className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
              }`}
            >
              <td className="py-3 px-4 text-gray-600">{row.id}</td>
              <td className="py-3 px-4 font-medium text-gray-800">{row.name}</td>
              <td className="py-3 px-4 text-gray-500">{row.email}</td>
              <td className="py-3 px-4">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-medium">
                  {row.department}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs transition-colors"
                  >
                    {/* pencil icon */}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 16H9v-3z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-red-100 text-red-500 hover:bg-red-50 text-xs transition-colors"
                  >
                    {/* trash icon */}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1H5" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────
function Pagination({ current, total, onChange }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-between pt-4 px-2">
      <span className="text-xs text-gray-400">
        Showing 1 to 10 of 380 entries
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, current - 1))}
          className="px-3 py-1.5 text-xs rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 text-xs rounded-md transition-colors ${
              p === current
                ? "bg-blue-600 text-white font-semibold"
                : "border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onChange(Math.min(total, current + 1))}
          className="px-3 py-1.5 text-xs rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ── Add Modal ─────────────────────────────────────────────
function AddModal({ tab, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", email: "", department: "CS" });
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Add New {tab.slice(0, -1)}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter full name"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">University Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@cs.bsu.edu.eg"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Department</label>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>CS</option>
              <option>IS</option>
              <option>IT</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={() => onSave(form)} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Add {tab.slice(0, -1)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
const TABS = ["Students", "Doctors", "Assistants"];
const ROWS_OPTIONS = [10, 25, 50];

export default function StudentsManagement() {
  const [activeTab, setActiveTab] = useState("Students");
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tableData, setTableData] = useState(dataMap);

  const data = tableData[activeTab].filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      String(r.id).includes(search)
  );

  const handleEdit = (row) => {
    alert(`Edit: ${row.name} (${row.id})`);
  };

  const handleDelete = (id) => {
    setTableData((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((r) => r.id !== id),
    }));
  };

  const handleAdd = (form) => {
    const newEntry = {
      id: Math.floor(Math.random() * 90000) + 10000,
      ...form,
    };
    setTableData((prev) => ({
      ...prev,
      [activeTab]: [newEntry, ...prev[activeTab]],
    }));
    setShowAddModal(false);
  };

  const handleUpload = () => alert("Upload Excel clicked");

  const handleDeleteAll = () => {
    if (window.confirm(`Delete all ${activeTab}?`)) {
      setTableData((prev) => ({ ...prev, [activeTab]: [] }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="p-8">
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Students Management
          </Typography>

          <div className="bg-white rounded-2xl shadow-md p-6">
            {/* ── Tabs ── */}
            <div className="flex gap-1 border-b border-gray-100 mb-5">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); setSearch(""); }}
                  className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ── Toolbar ── */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              {/* Search + rows */}
              <div className="flex items-center gap-3">
                {/* rows selector */}
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ROWS_OPTIONS.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>

                {/* search */}
                <div className="relative">
                  <svg
                    className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add {activeTab.slice(0, -1)}
                </button>
                <button
                  onClick={handleUpload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4-4 4M12 8v8" />
                  </svg>
                  Upload Excel
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-100 text-red-500 text-sm hover:bg-red-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1H5" />
                  </svg>
                  Delete All
                </button>
              </div>
            </div>

            {/* ── Table ── */}
            {data.length > 0 ? (
              <DataTable data={data.slice(0, rowsPerPage)} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
              <div className="py-16 text-center text-gray-400 text-sm">
                No {activeTab.toLowerCase()} found.
              </div>
            )}

            {/* ── Pagination ── */}
            <Pagination current={currentPage} total={5} onChange={setCurrentPage} />
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {showAddModal && (
        <AddModal tab={activeTab} onClose={() => setShowAddModal(false)} onSave={handleAdd} />
      )}
    </div>
  );
}