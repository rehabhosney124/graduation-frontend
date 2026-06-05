import { NavLink } from "react-router-dom";
import { MdDashboard, MdForum } from "react-icons/md";
import { AiOutlineFilter } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsLightbulb } from "react-icons/bs";
import { RiFlagFill } from "react-icons/ri";

export default function AdminSidebar() {
  return (
    <aside className="w-54 min-h-screen bg-[#243B56] text-white py-8">
      <nav className="flex flex-col gap-1 px-3">
        <SidebarItem
          to="/management"
          icon={<MdDashboard />}
          label="Management"
        />
        <SidebarItem
          to="/rules"
          icon={<HiOutlineClipboardList />}
          label="Rules"
        />
        <SidebarItem
          to="/admin-ai-filter"
          icon={<AiOutlineFilter />}
          label="AI Filter"
        />
        <SidebarItem
          to="/admin-milestones"
          icon={<RiFlagFill />}
          label="Milestones Setup"
        />
        <SidebarItem
          to="/suggestions-projects"
          icon={<BsLightbulb />}
          label="Suggestions Projects"
        />
        <SidebarItem
          to="/admin-teams"
          icon={<FaUsers />}
          label="Teams"
        />
        <SidebarItem
          to="/final-discussions"
          icon={<MdForum />}
          label="Final discussions"
        />
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-left transition
         hover:bg-[#1d2f44]
         ${isActive ? "bg-[#1d2f44] font-semibold" : ""}`
      }
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}