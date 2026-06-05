import AdminHeader from "../Components/header-admin";
import AdminSidebar from "../Components/sidebar-admin";
import { useState } from "react";
import { Typography } from "@mui/material";

// ── Counter ──────────────────────────────────────────────
function Counter({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-sm font-semibold bg-white">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 font-bold text-lg leading-none"
      >
        −
      </button>
      <button
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 font-bold text-lg leading-none"
      >
        +
      </button>
    </div>
  );
}

// ── Checkbox ─────────────────────────────────────────────
function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={onChange}
        className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
          checked ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white"
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

// ── Save Button ───────────────────────────────────────────
function SaveButton() {
  const [saved, setSaved] = useState(false);
  const handleClick = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <button
      onClick={handleClick}
      className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all ${
        saved ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {saved ? "✓ Saved!" : "Save Changes"}
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function TeamProjectRules() {
  // Team Formation state
  const [minSize, setMinSize] = useState(4);
  const [maxSize, setMaxSize] = useState(6);
  const [deadline, setDeadline] = useState("2024-05-15");

  // Graduation Project state
  const [types, setTypes] = useState({
    software: true,
    aiml: true,
    hardware: true,
  });
  const [rules1, setRules1] = useState(
    "Each project must clearly define its technical scope, tools, and technologies before approval",
  );
  const [rules2, setRules2] = useState(
    "The project idea must be original and not previously submitted or approved by another team.",
  );

  const toggleType = (key) =>
    setTypes((prev) => ({ ...prev, [key]: !prev[key] }));

  const ideaCriteria = [
    "The idea should be original and innovative.",
    "The project must address a real-world problem.",
    "Project ideas from previous years cannot be repeated.",
  ];

  return (
    <div className="flex min-h-screen bg-gray-200">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="p-8">
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Team &amp; Project Rules
          </Typography>

          <div className="flex flex-col gap-6">
            {/* ── Team Formation Rules ── */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Team Formation Rules
                </h2>
              </div>

              {/* Size Counters */}
              <div className="flex flex-wrap gap-10 mb-5">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Minimum Team Size
                  </p>
                  <Counter value={minSize} onChange={setMinSize} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Maximum Team Size
                  </p>
                  <Counter value={maxSize} onChange={setMaxSize} />
                </div>
              </div>

              {/* Deadline */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Team Formation Deadline
                </p>
                <div className="relative inline-block">
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-gray-500 max-w-sm">
                  Teams should be multidisciplinary and consist of students from
                  the same department.
                </p>
                <SaveButton />
              </div>
            </div>

            {/* ── Graduation Project Rules ── */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Graduation Project Rules
                </h2>
              </div>

              {/* Two Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                {/* Project Type */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Project Type Requirements
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <Checkbox
                      label="Software Application"
                      checked={types.software}
                      onChange={() => toggleType("software")}
                    />
                    <Checkbox
                      label="AI/ML Project"
                      checked={types.aiml}
                      onChange={() => toggleType("aiml")}
                    />
                    <Checkbox
                      label="Hardware + Software Integration"
                      checked={types.hardware}
                      onChange={() => toggleType("hardware")}
                    />
                  </div>
                </div>

                {/* Idea Selection */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Idea Selection Criteria
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {ideaCriteria.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Additional Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Additional Rules
                  </p>
                  <textarea
                    value={rules1}
                    onChange={(e) => setRules1(e.target.value)}
                    rows={3}
                    className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Additional Rules
                  </p>
                  <textarea
                    value={rules2}
                    onChange={(e) => setRules2(e.target.value)}
                    rows={3}
                    className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <SaveButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
