function StatCard({ label, value, sub, icon: Icon, accent = "amber" }) {
  const iconBg = {
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-sky-100 text-sky-700",
    emerald: "bg-emerald-100 text-emerald-700",
  }[accent];

  return (
    <div className="admin-card flex items-center gap-3 py-3 sm:py-4">
      <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
        <Icon className="text-lg" />
      </div>
      <div className="min-w-0">
        <p className="text-zinc-500 text-xs font-medium truncate">{label}</p>
        <p className="text-lg sm:text-xl font-bold text-zinc-800 leading-tight">{value}</p>
        {sub && <p className="text-[0.65rem] text-zinc-400 truncate">{sub}</p>}
      </div>
    </div>
  );
}

export default StatCard;
