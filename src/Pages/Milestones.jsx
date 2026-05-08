import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { useState } from "react";
import { FaRegCalendarAlt, FaTimes, FaEdit } from "react-icons/fa";

export default function Milestones() {
  const [activeTab, setActiveTab] = useState("All");
  const [openTableIndex, setOpenTableIndex] = useState(null);

  const milestones = [
    {
      title: "Phase 1 : Project Kick-off & Discovery",
      status: "Completed",
      submitted: "Nov 30, 2025",
      late: 3,
      tasks: [
        "Lorem ipsum dolor sit amet, consectetur",
        "Lorem ipsum dolor sit amet, consectetur",
        "Lorem ipsum dolor sit amet, consectetur",
        "Lorem ipsum dolor sit amet, consectetur",
      ],
    },
    {
      title: "Phase 2 : User Interface Design & Prototyping",
      status: "On Progress",
      due: "Jan 30, 2025",
      tasks: [
        "Lorem ipsum dolor sit amet, consectetur",
        "Lorem ipsum dolor sit amet, consectetur",
        "Lorem ipsum dolor sit amet, consectetur",
      ],
    },
    {
      title: "Phase 3 : Backend Development & API Integration",
      status: "On Progress",
      due: "Jan 30, 2025",
      tasks: [
        "Lorem ipsum dolor sit amet, consectetur",
        "Lorem ipsum dolor sit amet, consectetur",
      ],
    },
    {
      title: "Phase 4 : Backend Development & API Integration",
      status: "Pending",
      due: "Jan 30, 2025",
      tasks: ["Lorem ipsum dolor sit amet, consectetur"],
    },
    {
      title: "Phase 5 : Final Submission & Deployment",
      status: "Overdue",
      due: "Jan 10, 2025",
      tasks: ["Lorem ipsum dolor sit amet, consectetur"],
    },
  ];

  const filtered =
    activeTab === "All"
      ? milestones
      : milestones.filter((m) => m.status === activeTab);

  const count = (status) =>
    milestones.filter((m) => m.status === status).length;

  const badgeColors = {
    Completed: "bg-green-500 text-white",
    "On Progress": "bg-orange-500 text-white",
    Pending: "bg-gray-400 text-white",
    Overdue: "bg-red-500 text-white",
  };

  const borderColors = {
    Completed: "border-green-500",
    "On Progress": "border-orange-500",
    Pending: "border-gray-400",
    Overdue: "border-red-500",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-8">
          {/* Tabs */}
          <div className="flex gap-3 mb-8">
            {["All", "On Progress", "Completed", "Pending", "Overdue"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setOpenTableIndex(null);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tab} ({tab === "All" ? milestones.length : count(tab)})
                </button>
              ),
            )}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gray-300"></div>

            <div className="space-y-10">
              {filtered.map((m, i) => (
                <div key={i} className="relative flex">
                  {/* Circle */}
                  <div className="absolute left-8 top-6 -translate-x-1/2">
                    <div
                      className={`w-6 h-6 rounded-full border-[3px] bg-gray-100 ${borderColors[m.status]}`}
                    ></div>
                  </div>

                  {/* Card */}
                  <div className="ml-16 w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {/* Top */}
                    <div className="px-6 py-5">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-[15px] text-gray-800">
                          {m.title}
                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${badgeColors[m.status]}`}
                        >
                          {m.status}
                        </span>
                      </div>

                      {/* Tasks */}
                      {m.status === "Overdue" ? (
  <>
    {/* Deadline */}
    <p className="text-red-600 text-sm font-semibold mb-1">
      Deadline was: {m.due} (Missed)
    </p>

    <p className="text-xs text-gray-500 mb-3">
      Teams missed the deadline: 1
    </p>

    {/* Teams + Button */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">
          Teams Submitted :{" "}
          <span className="text-green-600">4/5</span>
        </span>

        <button
          onClick={() =>
            setOpenTableIndex(openTableIndex === i ? null : i)
          }
          className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
        >
          View Late Teams
        </button>
      </div>

      <button className="border border-red-500 text-red-500 text-xs px-3 py-1 rounded-md">
        Remind All
      </button>
    </div>

    {/* Input */}
    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 w-full">
      <FaEdit className="text-gray-500 text-xs" />
      <input
        type="text"
        placeholder="Add urgent instructions or penalty notes for late teams..."
        className="text-xs outline-none w-full bg-transparent"
      />
    </div>
  </>
) : (
  <ul className="text-xs text-gray-500 space-y-2 mb-4">
    {m.tasks.map((t, idx) => (
      <li key={idx} className="flex items-center gap-2">
        <div
          className={`w-4 h-4 flex items-center justify-center rounded-sm ${
            m.status === "Completed"
              ? "bg-green-500"
              : "bg-gray-600"
          }`}
        >
          <span className="text-white text-[10px]">✓</span>
        </div>
        {t}
      </li>
    ))}
  </ul>
)}
 {/* Date + Set */}
                      <div className="flex justify-end items-center gap-2 mt-3">
                        <div className="flex items-center gap-2 text-xs border px-3 py-1 rounded-md text-gray-500 bg-white">
                          <FaRegCalendarAlt />
                          <span>
                            {m.submitted
                              ? `Submitted: ${m.submitted}`
                              : `Due: ${m.due}`}
                          </span>
                        </div>

                        {m.status === "Pending" && (
                          <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md">
                            Set
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="bg-gray-50 px-6 py-3 flex flex-col gap-3">
                      {activeTab !== "All" &&
(m.status === "On Progress" || activeTab === "Completed")&& (
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs text-gray-500">
                            Teams Submitted :{" "}
                            <span className="text-green-600">3/5</span>
                          </span>

                          <button
                            onClick={() =>
                              setOpenTableIndex(openTableIndex === i ? null : i)
                            }
                            className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
                          >
                            View Teams
                          </button>
                        </div>
                      )}
                      {/* Table */}
                     {openTableIndex === i && (
  <div className="ml-16 mt-2 relative">
    <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t rotate-45"></div>

    <div className="border-2 border-blue-500 rounded-md overflow-hidden bg-white">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-300 text-gray-700">
                              <tr>
                                <th className="p-2 text-left">Team</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-left">
                                  Submission Date
                                </th>
                                <th className="p-2 text-left">Action</th>

                                {activeTab === "Completed" && (
                                  <th className="p-2 text-left">Grades</th>
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {[
                                {
                                  name: "Team A",
                                  status: "On Time",
                                  date: "10 Jan 2025",
                                  grade: "8/10",
                                },
                                {
                                  name: "Team B",
                                  status: "Late",
                                  date: "10 Jan 2025",
                                  grade: "6/10",
                                },
                                {
                                  name: "Team C",
                                  status: "On Time",
                                  date: "15 Jan 2025",
                                  grade: "4/10",
                                },
                                {
                                  name: "Team D",
                                  status: "Late",
                                  date: "-",
                                  grade: null,
                                },
                                {
                                  name: "Team E",
                                  status: "Late",
                                  date: "20 Jan 2025",
                                  grade: "7/10",
                                },
                              ].map((team, idx) => (
                                <tr
                                  key={idx}
                                  className={`border-t ${
                                    activeTab === "Completed" &&
                                    team.name === "Team D"
                                      ? "bg-red-500 text-white"
                                      : ""
                                  }`}
                                >
                                  <td className="p-2">{team.name}</td>

                                  <td className="p-2">
                                    <span>{team.status}</span>
                                  </td>

                                  <td className="p-2">
                                    {team.date === "-" ? "—" : team.date}
                                  </td>

                                  <td className="p-2">
                                    {team.status === "On Time" ? (
                                      <button className="font-medium">
                                        View
                                      </button>
                                    ) : (
                                      <button
                                        className={`font-medium ${
                                          activeTab === "Completed"
                                            ? "text-white"
                                            : "text-red-500"
                                        }`}
                                      >
                                        Remind
                                      </button>
                                    )}
                                  </td>

                                  {activeTab === "Completed" && (
                                    <td className="p-2">
                                      {team.grade ? (
                                        <span
                                          className={`${
                                            team.grade.startsWith("8") ||
                                            team.grade.startsWith("7")
                                              ? "text-green-600"
                                              : team.grade.startsWith("6")
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                          }`}
                                        >
                                          {team.grade}
                                        </span>
                                      ) : (
                                        <span className="text-blue-200">
                                          Add Grade / 10
                                        </span>
                                      )}
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        </div>
                     )}
                      {/* NOTES FULL WIDTH */}
                      {m.status !== "Completed" && (
                        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 w-full">
                          <FaEdit className="text-gray-500 text-xs" />
                          <input
                            type="text"
                            placeholder="Add notes for students"
                            className="text-xs outline-none w-full bg-transparent"
                          />
                        </div>
                      )}

                      {/* LATE RIGHT (ONLY ALL) */}
                      {activeTab === "All" && m.late && (
                        <div className="flex justify-end text-gray-500 text-xs items-center gap-1">
                          <FaTimes className="text-red-500" />
                          <span>Late: {m.late}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
