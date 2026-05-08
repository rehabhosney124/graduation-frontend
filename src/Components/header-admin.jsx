import logo from "../assets/logo2.png";
import { useState } from "react";
import { FaRegBell, FaUserCircle, FaBars, FaSearch, FaPencilAlt } from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";
import { useAcademicYear } from "../context/AcademicYearContext";
import NotificationsPanel from "../Pages/NotificationsPanel";

// ── Edit Academic Year Modal ──────────────────────────────
function EditAcademicYearModal({ currentYear, onClose, onSave }) {
  const [startYear, setStartYear] = useState(currentYear);
  const years = Array.from({ length: 10 }, (_, i) => 2020 + i);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Edit Academic Year</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Start Year</label>
          <select
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="mb-5">
          <p className="text-xs text-gray-400">
            End Year :{" "}
            <span className="font-medium text-gray-600">{startYear + 1}</span>
            <span className="text-gray-400"> ( Start Year +1 )</span>
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(startYear)}
            className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Admin Header ──────────────────────────────────────────
function AdminHeader() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { profileImage, name } = useProfile();
  const [openNotifications, setOpenNotifications] = useState(false);

  // ✅ use shared context — any page that calls useAcademicYear() sees the same value
  const { academicYear, setAcademicYear } = useAcademicYear();

  return (
    <div>
      <nav className="bg-[#243B56]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-14 w-auto" />
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 justify-center px-6">
              <div className="relative w-full max-w-md">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Projects or Students"
                  className="w-full rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 text-white">

              {/* Academic Year */}
              <div className="hidden md:flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-gray-300"
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={1.8}
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0
                    01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0
                    01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                <span className="text-xs text-gray-300">Academic Year :</span>
                <span className="text-xs font-semibold text-blue-400">
                  {academicYear}-{academicYear + 1}
                </span>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-gray-300 hover:text-white transition-colors"
                  title="Edit Academic Year"
                >
                  <FaPencilAlt className="w-3 h-3" />
                </button>
              </div>

              {/* Bell */}
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenNotifications(true)}
              >
                <FaRegBell className="text-xl text-white hover:text-gray-300 transition" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
              </div>

              {/* Avatar */}
              {profileImage ? (
                <img
                  src={profileImage}
                  className="w-9 h-9 rounded-full object-cover"
                  alt="profile"
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-400 bg-white rounded-full" />
              )}

              <span className="font-medium hidden md:block">
                {name || "Mahmoud Fareed"}
              </span>

              {/* Mobile toggle */}
              <button
                className="md:hidden text-xl"
                onClick={() => setOpen(!open)}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden bg-[#243B56] px-4 pb-4 space-y-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Projects or Students"
                className="w-full rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 text-white pt-2">
              <span className="text-xs text-blue-400">
                {academicYear}-{academicYear + 1}
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="text-gray-300"
              >
                <FaPencilAlt className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Academic Year Modal */}
      {showModal && (
        <EditAcademicYearModal
          currentYear={academicYear}
          onClose={() => setShowModal(false)}
          onSave={(y) => { setAcademicYear(y); setShowModal(false); }}
        />
      )}

      {/* Notifications Panel */}
      <NotificationsPanel
        open={openNotifications}
        onClose={() => setOpenNotifications(false)}
      />
    </div>
  );
}

export default AdminHeader;