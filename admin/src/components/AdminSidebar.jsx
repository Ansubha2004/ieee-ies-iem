import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineMail,
} from "react-icons/hi";
import ieeeieslogo from "../assets/images/ieeeieslogo.png";

const links = [
  { to: "/", label: "Dashboard", icon: HiOutlineHome, end: true },
  { to: "/events", label: "Events", icon: HiOutlineCalendar },
  { to: "/cwc", label: "CWC Members", icon: HiOutlineUserGroup },
  { to: "/contacts", label: "Contact & Enquiries", icon: HiOutlineMail },
];

function AdminSidebar({ onNavigate }) {
  return (
    <aside className="admin-sidebar hide-scrollbar">
      <div className="flex flex-col items-center gap-1.5 py-4 px-3 border-b border-amber-600/30 shrink-0">
        <img
          src={ieeeieslogo}
          alt="IEEE IES IEM"
          className="h-10 sm:h-11 object-contain max-w-[90%]"
        />
        <p className="text-amber-400 font-semibold text-xs text-center">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5 min-h-0 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "admin-nav-link-active" : ""}`
            }
          >
            <Icon className="text-xl shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
