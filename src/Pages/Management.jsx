import AdminHeader from "../Components/header-admin";
import AdminSidebar from "../Components/sidebar-admin";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { submitRequestAsync } from "../Services/ApiServices";

// ── API calls ─────────────────────────────────────────────
const API = {
  // Students
  getStudents:          (page = 1, per = 10) => submitRequestAsync(`admin/student?page=${page}&per_page=${per}`, "GET"),
  addStudent:           (data)               => submitRequestAsync("admin/student/add", "POST", data),
  updateStudent:        (id, data)           => submitRequestAsync(`admin/student/${id}`, "PUT", data),
  deactivateAllStudents: ()                  => submitRequestAsync("admin/student/deactivate-all", "POST"),
  importStudents:       (file)               => submitRequestAsync("admin/student/import", "POST", file),

  // Doctors
  getDoctors:           (page = 1, per = 10) => submitRequestAsync(`admin/doctor?page=${page}&per_page=${per}`, "GET"),
  addDoctor:            (data)               => submitRequestAsync("admin/doctor/add", "POST", data),
  deactivateAllDoctors: ()                   => submitRequestAsync("admin/doctor/deactivate-all", "POST"),
  importDoctors:        (file)               => submitRequestAsync("admin/doctor/import", "POST", file),

  // TAs
  getTAs:               (page = 1, per = 10) => submitRequestAsync(`admin/ta?page=${page}&per_page=${per}`, "GET"),
  addTA:                (data)               => submitRequestAsync("admin/ta/add", "POST", data),
  updateTA:             (id, data)           => submitRequestAsync(`admin/ta/${id}`, "PUT", data),
  deactivateAllTAs:     ()                   => submitRequestAsync("admin/ta/deactivate-all", "POST"),
  importTAs:            (file)               => submitRequestAsync("admin/ta/import", "POST", file),
};

// ── DataTable ─────────────────────────────────────────────
function DataTable({ data, columns, onEdit, onToggleStatus }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide border-r border-gray-200 last:border-r-0"
              >
                {col.label}
              </th>
            ))}
            <th className="py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="py-3 px-4 border-r border-gray-200 last:border-r-0"
                >
                  {col.render ? (
                    col.render(row[col.key], row)
                  ) : (
                    <span
                      className={
                        col.key === "full_name"
                          ? "font-medium text-gray-800"
                          : "text-gray-600"
                      }
                    >
                      {row[col.key] ?? "—"}
                    </span>
                  )}
                </td>
              ))}
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 16H9v-3z"
                      />
                    </svg>
                    Edit
                  </button>
                  {row.is_active ? (
                    <button
                      onClick={() => onToggleStatus(row.id, true)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-red-100 text-red-500 hover:bg-red-50 text-xs transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => onToggleStatus(row.id, false)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-green-200 text-green-600 hover:bg-green-50 text-xs transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Activate
                    </button>
                  )}
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
function Pagination({ current, total, onChange, from, to, totalEntries }) {
  const getPages = () => {
    const pages = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex items-center justify-between pt-4 px-1 border-t border-gray-200 mt-2">
      <span className="text-xs text-gray-500">
        Showing {from ?? 0} to {to ?? 0} of {totalEntries ?? 0} entries
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, current - 1))}
          disabled={current === 1}
          className="px-3 py-1.5 text-xs rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
        >
          Previous
        </button>
        {getPages().map((p) => (
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
        {current + 2 < total && (
          <>
            <span className="text-gray-400 text-xs">...</span>
            <button
              onClick={() => onChange(total)}
              className="w-8 h-8 text-xs rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              {total}
            </button>
          </>
        )}
        <button
          onClick={() => onChange(Math.min(total, current + 1))}
          disabled={current === total || total === 0}
          className="px-3 py-1.5 text-xs rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ── Modal Base ────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Field Input ───────────────────────────────────────────
function FormField({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600 mb-1 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// ── Add Student Modal ─────────────────────────────────────
function AddStudentModal({ onClose, onSave, loading }) {
  const [form, setForm] = useState({
    full_name: "",
    national_id: "",
    email: "",
    phone: "",
    password: "",
  });
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <Modal title="Add New Student" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <FormField label="Full Name"   value={form.full_name}   onChange={set("full_name")}   placeholder="Enter full name" />
        <FormField label="National ID" value={form.national_id} onChange={set("national_id")} placeholder="Enter national ID" />
        <FormField label="Email"       value={form.email}       onChange={set("email")}       type="email" placeholder="email@example.com" />
        <FormField label="Phone"       value={form.phone}       onChange={set("phone")}       placeholder="010XXXXXXXX" />
        <FormField label="Password"    value={form.password}    onChange={set("password")}    type="password" placeholder="••••••••" />
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Add Student"}
        </button>
      </div>
    </Modal>
  );
}

// ── Add Doctor Modal ──────────────────────────────────────
function AddDoctorModal({ onClose, onSave, loading }) {
  const [form, setForm] = useState({
    full_name: "",
    national_id: "",
    email: "",
    phone: "",
    password: "",
  });
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <Modal title="Add New Doctor" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <FormField label="Full Name"   value={form.full_name}   onChange={set("full_name")}   placeholder="Enter full name" />
        <FormField label="National ID" value={form.national_id} onChange={set("national_id")} placeholder="Enter national ID" />
        <FormField label="Email"       value={form.email}       onChange={set("email")}       type="email" placeholder="email@example.com" />
        <FormField label="Phone"       value={form.phone}       onChange={set("phone")}       placeholder="010XXXXXXXX" />
        <FormField label="Password"    value={form.password}    onChange={set("password")}    type="password" placeholder="••••••••" />
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Add Doctor"}
        </button>
      </div>
    </Modal>
  );
}

// ── Add TA Modal ──────────────────────────────────────────
function AddTAModal({ onClose, onSave, loading }) {
  const [form, setForm] = useState({
    full_name: "",
    national_id: "",
    email: "",
    phone: "",
    password: "",
  });
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <Modal title="Add New Assistant" onClose={onClose}>
      <div className="flex flex-col gap-3">
        <FormField label="Full Name"   value={form.full_name}   onChange={set("full_name")}   placeholder="Enter full name" />
        <FormField label="National ID" value={form.national_id} onChange={set("national_id")} placeholder="Enter national ID" />
        <FormField label="Email"       value={form.email}       onChange={set("email")}       type="email" placeholder="email@example.com" />
        <FormField label="Phone"       value={form.phone}       onChange={set("phone")}       placeholder="010XXXXXXXX" />
        <FormField label="Password"    value={form.password}    onChange={set("password")}    type="password" placeholder="••••••••" />
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Add Assistant"}
        </button>
      </div>
    </Modal>
  );
}

// ── Edit Modal ────────────────────────────────────────────
function EditModal({ row, type, onClose, onSave, loading }) {
  const [form, setForm] = useState({
    full_name:   row.full_name   ?? "",
    national_id: row.national_id ?? "",
    email:       row.email       ?? "",
    phone:       row.phone       ?? "",
  });
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <Modal title={`Edit ${type}`} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <FormField label="Full Name"   value={form.full_name}   onChange={set("full_name")} />
        <FormField label="National ID" value={form.national_id} onChange={set("national_id")} />
        <FormField label="Email"       value={form.email}       onChange={set("email")} type="email" />
        <FormField label="Phone"       value={form.phone}       onChange={set("phone")} />
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(row.id, form)}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </Modal>
  );
}

// ── Column Definitions ────────────────────────────────────
const STUDENT_COLUMNS = [
  { key: "national_id", label: "ID" },
  { key: "full_name",   label: "Name" },
  { key: "email",       label: "University Email" },
  { key: "department",  label: "Department" },
  { key: "gpa",         label: "Grades" },
];

const DOCTOR_COLUMNS = [
  { key: "national_id", label: "ID" },
  { key: "full_name",   label: "Name" },
  { key: "email",       label: "University Email" },
  { key: "department",  label: "Department" },
];

const TA_COLUMNS = [
  { key: "national_id", label: "ID" },
  { key: "full_name",   label: "Name" },
  { key: "email",       label: "University Email" },
  { key: "department",  label: "Department" },
];

// ── Tab Config ────────────────────────────────────────────
const TABS = [
  { key: "students1",  label: "Project 1 Students" },
  { key: "students2",  label: "Project 2 Students" },
  { key: "doctors",    label: "Doctors" },
  { key: "assistants", label: "Assistants" },
];

const ROWS_OPTIONS = [10, 25, 50];

// ── Main Page ─────────────────────────────────────────────
export default function StudentsManagement() {
  const [activeTab, setActiveTab]       = useState("students1");
  const [search, setSearch]             = useState("");
  const [rowsPerPage, setRowsPerPage]   = useState(10);
  const [currentPage, setCurrentPage]   = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editRow, setEditRow]           = useState(null);
  const [savingEdit, setSavingEdit]     = useState(false);
  const [savingAdd, setSavingAdd]       = useState(false);

  const [rows, setRows]             = useState([]);
  const [pagination, setPagination] = useState({ lastPage: 1, from: 0, to: 0, total: 0 });
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  const pageTitle = {
    students1:  "Students Management",
    students2:  "Students Management",
    doctors:    "Doctors Management",
    assistants: "Assistants Management",
  }[activeTab];

  const columns = activeTab.startsWith("students")
    ? STUDENT_COLUMNS
    : activeTab === "doctors"
    ? DOCTOR_COLUMNS
    : TA_COLUMNS;

  const addLabel = activeTab.startsWith("students")
    ? "Add Student"
    : activeTab === "doctors"
    ? "Add Doctor"
    : "Add Assistant";

  const shareLabel = TABS.find((t) => t.key === activeTab)?.label ?? "";

  // ── Fetch ──
  useEffect(() => {
    fetchData(currentPage);
  }, [activeTab, currentPage, rowsPerPage]);

  const fetchData = async (page = 1) => {
    setLoading(true);
    setError(null);
    setRows([]);
    try {
      let res;
      if (activeTab === "students1" || activeTab === "students2") {
        res = await API.getStudents(page, rowsPerPage);
      } else if (activeTab === "doctors") {
        res = await API.getDoctors(page, rowsPerPage);
      } else {
        res = await API.getTAs(page, rowsPerPage);
      }
      // submitRequestAsync already unwraps one "data" layer
      // Backend returns: { data: { data: [...], last_page, from, to, total } }
      // After unwrap: { data: [...], last_page, from, to, total }
      const pageData = res;
      const data     = pageData?.data;
      setRows(Array.isArray(data) ? data : []);
      setPagination({
        lastPage: pageData?.last_page ?? 1,
        from:     pageData?.from      ?? 0,
        to:       pageData?.to        ?? 0,
        total:    pageData?.total     ?? 0,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load data. Please try again.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // ── Client-side search filter ──
  const filteredRows = rows.filter(
    (r) =>
      r.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase()) ||
      String(r.national_id ?? "").includes(search)
  );

  // ── Edit ──
  const handleEdit = (row) => setEditRow(row);

  const handleEditSave = async (id, form) => {
    setSavingEdit(true);
    try {
      if (activeTab.startsWith("students")) {
        await API.updateStudent(id, form);
      } else {
        await API.updateTA(id, form);
      }
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...form } : r)));
      setEditRow(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update. Please try again.");
    } finally {
      setSavingEdit(false);
    }
  };

  // ── Toggle Status ──
  const handleToggleStatus = (id, currentActive) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_active: currentActive ? 0 : 1 } : r))
    );
    // TODO: call activate/deactivate single-record API when available
  };

  // ── Add ──
  const handleAdd = async (form) => {
    setSavingAdd(true);
    try {
      if (activeTab.startsWith("students")) {
        await API.addStudent(form);
      } else if (activeTab === "doctors") {
        await API.addDoctor(form);
      } else {
        await API.addTA(form);
      }
      setShowAddModal(false);
      fetchData(1);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      alert(`Failed to add: ${err.message}`);
    } finally {
      setSavingAdd(false);
    }
  };

  // ── Upload Excel ──
  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls,.csv";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      try {
        if (activeTab.startsWith("students")) {
          await API.importStudents(formData);
        } else if (activeTab === "doctors") {
          await API.importDoctors(formData);
        } else {
          await API.importTAs(formData);
        }
        fetchData(1);
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
        alert(`Import failed: ${err.message}`);
      }
    };
    input.click();
  };

  // ── Share ──
  const handleShare = () => alert(`Share ${shareLabel} List`);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="p-6 md:p-8">
          <Typography variant="h5" fontWeight="bold" mb={3}>
            {pageTitle}
          </Typography>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

            {/* ── Tabs ── */}
            <div className="flex gap-0 border-b border-gray-200 mb-5 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setCurrentPage(1);
                    setSearch("");
                  }}
                  className={`px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50/50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Toolbar ── */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              {/* Search */}
              <div className="relative">
                <svg
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Add */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  {addLabel}
                </button>

                {/* Upload Excel */}
                <button
                  onClick={handleUpload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4-4 4M12 8v8"
                    />
                  </svg>
                  Upload Excel
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share {shareLabel} List
                </button>
              </div>
            </div>

            {/* Rows per page */}
            <div className="flex items-center gap-2 mb-4">
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ROWS_OPTIONS.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              <span className="text-xs text-gray-400">entries per page</span>
            </div>

            {/* ── Table / Loading / Error / Empty ── */}
            {loading ? (
              <div className="py-16 text-center">
                <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-gray-400 text-sm">Loading...</p>
              </div>
            ) : error ? (
              <div className="py-16 text-center">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={() => fetchData(currentPage)}
                  className="mt-2 text-blue-600 text-xs underline"
                >
                  Retry
                </button>
              </div>
            ) : filteredRows.length > 0 ? (
              <DataTable
                data={filteredRows}
                columns={columns}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
              />
            ) : (
              <div className="py-16 text-center text-gray-400 text-sm">
                No data found.
              </div>
            )}

            {/* ── Pagination ── */}
            {!loading && !error && (
              <Pagination
                current={currentPage}
                total={pagination.lastPage}
                onChange={setCurrentPage}
                from={pagination.from}
                to={pagination.to}
                totalEntries={pagination.total}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Add Modals ── */}
      {showAddModal && activeTab.startsWith("students") && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
          loading={savingAdd}
        />
      )}
      {showAddModal && activeTab === "doctors" && (
        <AddDoctorModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
          loading={savingAdd}
        />
      )}
      {showAddModal && activeTab === "assistants" && (
        <AddTAModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
          loading={savingAdd}
        />
      )}

      {/* ── Edit Modal ── */}
      {editRow && (
        <EditModal
          row={editRow}
          type={
            activeTab.startsWith("students")
              ? "Student"
              : activeTab === "doctors"
              ? "Doctor"
              : "Assistant"
          }
          onClose={() => setEditRow(null)}
          onSave={handleEditSave}
          loading={savingEdit}
        />
      )}
    </div>
  );
}