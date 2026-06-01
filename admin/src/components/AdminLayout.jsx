import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import AdminSidebar from "./AdminSidebar.jsx";

function AdminLayout({ page: Page }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="admin-shell">
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`admin-sidebar-wrap ${
          mobileOpen ? "admin-sidebar-open" : "admin-sidebar-closed"
        }`}
        aria-label="Admin navigation"
      >
        <AdminSidebar onNavigate={closeMobile} />
      </aside>

      <div className="admin-content">
        <header className="admin-header flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="lg:hidden shrink-0 text-amber-400 p-1.5 rounded-md hover:bg-white/10"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <HiOutlineX className="text-xl sm:text-2xl" />
            ) : (
              <HiOutlineMenu className="text-xl sm:text-2xl" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-white/90 font-semibold text-[1.4rem] leading-tight truncate">
              IEEE IES IEM — Admin
            </p>
            <p className="text-amber-500/75 text-[0.7rem] sm:text-[1rem] truncate hidden sm:block">
              Chapter content management
            </p>
          </div>
          <a
            href="https://ieee-ies-iem-sbc.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-[0.65rem] sm:text-[1.2rem] text-amber-400 font-semibold border border-amber-600/40 px-2 sm:px-3 py-1 rounded hover:bg-white/5 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Live site</span>
            <span className="sm:hidden">Site</span>
          </a>
        </header>

        <main className="admin-main">
          <Page />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
