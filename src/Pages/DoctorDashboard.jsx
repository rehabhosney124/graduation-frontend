import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useProfile } from "../context/ProfileContext";
import hand from "../assets/Hand.png";
import projectIcon from "../assets/project.png";
import teamIcon from "../assets/team.png";
import taskIcon from "../assets/task.png";
import aiIcon from "../assets/ai.png";
import { FaPlus, FaBullhorn, FaChartBar } from "react-icons/fa";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

import { FaFileAlt, FaUsers, FaClipboardList, FaRobot } from "react-icons/fa";

import { PieChart, Pie, Cell } from "recharts";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DoctorDashboard() {
  const { name } = useProfile();

  const stats = [
    { title: "Total Projects", value: 5, icon: projectIcon },
    { title: "Active Teams", value: 4, icon: teamIcon },
    { title: "Pending Tasks", value: 3, icon: taskIcon },
    { title: "Pending AI Reviews", value: 2, icon: aiIcon },
  ];

  const proposals = [
    { name: "MediScan AI", sim: "40%", status: "Accepted", color: "green" },
    {
      name: "EcoRoute Optimizer",
      sim: "90%",
      status: "Rejected",
      color: "red",
    },
    {
      name: "SecureChain Voting",
      sim: "30%",
      status: "Accepted",
      color: "green",
    },
    {
      name: "VisionGuard for Blind",
      sim: "85%",
      status: "Rejected",
      color: "red",
    },
    {
      name: "IoT-Based Smart",
      sim: "70%",
      status: "Review Required",
      color: "orange",
    },
  ];

  const completion = [
    { name: "done", value: 28 },
    { name: "rest", value: 72 },
  ];

  const feedback = [
    { name: "done", value: 47 },
    { name: "rest", value: 53 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-8">
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Welcome Dr. {name || "Doctor"}
            <img src={hand} alt="wave" className="inline w-6 ml-2" />
          </Typography>

          {/* Top Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-start hover:shadow-lg transition"
              >
                {/* Left text */}
                <div>
                  <p className="text-gray-500 text-sm">{item.title}</p>
                  <p className="text-3xl font-bold mt-2">{item.value}</p>
                </div>

                {/* Right icon box */}
                <div className=" p-3 rounded-xl ">
                  <img
                    src={item.icon}
                    alt="icon"
                    className="w-7 h-7 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Middle */}
          <div className="flex gap-6 items-start">
            {/* Left side */}
            <div className="w-[60%] flex flex-col">
              <Card className="rounded-2xl">
                <CardContent className="flex flex-col flex-1">
                  <Typography variant="h6" mb={2}>
                    Recent Proposals
                  </Typography>

                  <table className="w-full border border-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border p-3 text-left">Project Name</th>
                        <th className="border p-3 text-left">AI Similarity</th>
                        <th className="border p-3 text-left">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {proposals.map((p, i) => (
                        <tr key={i}>
                          <td className="border p-3">{p.name}</td>
                          <td className="border p-3">{p.sim}</td>
                          <td className="border p-3">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  p.status === "Accepted"
                                    ? "bg-green-500"
                                    : p.status === "Rejected"
                                      ? "bg-red-500"
                                      : "bg-orange-400"
                                }`}
                              ></span>

                              <span
                                className={`${
                                  p.status === "Accepted"
                                    ? "text-green-500"
                                    : p.status === "Rejected"
                                      ? "text-red-500"
                                      : "text-orange-400"
                                }`}
                              >
                                {p.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-3 w-64">
                <Button variant="contained" startIcon={<FaPlus />}>
                  Add New Milestone
                </Button>

                <Button variant="contained" startIcon={<FaBullhorn />}>
                  Write Announcement
                </Button>

                <Button variant="contained" startIcon={<FaChartBar />}>
                  Export AI Report
                </Button>
              </div>
            </div>

            {/* Right side */}
            <div className="w-[50%]">
              <Card className="rounded-2xl">
                <CardContent className="flex flex-col flex-1">
                  <Typography variant="h6" className="mb-6">
                    Project Process
                  </Typography>

                  <div className="flex justify-around mb-8">
                    {/* chart 1 */}
                    <div className="relative">
                      <PieChart width={200} height={200}>
                        <Pie
                          data={completion}
                          innerRadius={70}
                          outerRadius={85}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          <Cell fill="#22c55e" />
                          <Cell fill="#e5e7eb" />
                        </Pie>
                      </PieChart>

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold">28%</p>
                        <p className="text-sm text-gray-500">
                          Project Completion
                        </p>
                      </div>
                    </div>

                    {/* chart 2 */}
                    <div className="relative">
                      <PieChart width={200} height={200}>
                        <Pie
                          data={feedback}
                          innerRadius={70}
                          outerRadius={85}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          <Cell fill="#ef4444" />
                          <Cell fill="#e5e7eb" />
                        </Pie>
                      </PieChart>

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold">47%</p>
                        <p className="text-sm text-gray-500">
                          Pending Feedback
                        </p>
                      </div>
                    </div>
                  </div>

                  <Typography variant="h6" className="mb-4">
                    Deadline Calendar
                  </Typography>

                  <Calendar />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
