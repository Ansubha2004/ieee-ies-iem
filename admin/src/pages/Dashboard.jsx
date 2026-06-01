import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineDocument,
  HiOutlineArrowRight,
} from "react-icons/hi";
import AdminPage from "../components/AdminPage.jsx";
import StatCard from "../components/StatCard.jsx";
import { getEvents, getCwcMembers, getEnquiries } from "../utils/storage.js";

const quickLinks = [
  {
    to: "/events",
    title: "Manage Events",
    desc: "Add, edit, or export events.",
    icon: HiOutlineCalendar,
  },
  {
    to: "/cwc",
    title: "CWC Members",
    desc: "Add, edit, or export members.",
    icon: HiOutlineUserGroup,
  },
  {
    to: "/contacts",
    title: "Contacts",
    desc: "Inbox & page content.",
    icon: HiOutlineDocument,
  },
];

function Dashboard() {
  const eventCount = useMemo(() => getEvents().length, []);
  const cwcCount = useMemo(() => getCwcMembers().length, []);
  const enquiryCount = useMemo(() => getEnquiries().length, []);
  const newEnquiries = useMemo(
    () => getEnquiries().filter((e) => e.status === "new").length,
    []
  );

  const pageContent = (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          label="Events"
          value={eventCount}
          sub="Local storage"
          icon={HiOutlineCalendar}
          accent="amber"
        />
        <StatCard
          label="CWC members"
          value={cwcCount}
          sub="Local storage"
          icon={HiOutlineUserGroup}
          accent="blue"
        />
        <StatCard
          label="Enquiries"
          value={enquiryCount}
          sub={newEnquiries > 0 ? `${newEnquiries} new` : "Local inbox"}
          icon={HiOutlineDocument}
          accent="emerald"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {quickLinks.map(({ to, title, desc, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="admin-card group flex items-center gap-3 hover:border-amber-400/60 transition-colors min-w-0"
          >
            <div className="w-9 h-9 shrink-0 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Icon className="text-lg" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-zinc-800 text-sm truncate">{title}</h2>
              <p className="paratext text-xs mt-0.5 line-clamp-1">{desc}</p>
            </div>
            <HiOutlineArrowRight className="shrink-0 text-zinc-300 group-hover:text-amber-600" />
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <AdminPage
      title="Dashboard"
      description="Frontend-only admin — all data is saved in this browser until you export JSON."
      content={pageContent}
    />
  );
}

export default Dashboard;
