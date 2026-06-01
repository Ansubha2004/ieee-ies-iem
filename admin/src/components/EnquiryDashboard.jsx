import { useMemo, useState } from "react";
import { HiOutlineRefresh, HiOutlineTrash, HiOutlineMail, HiOutlinePlus } from "react-icons/hi";
import Button from "./Button.jsx";
import { getEnquiries, saveEnquiries, resetEnquiries } from "../utils/storage.js";
import { successmessage, errormessage } from "../utils/notification.jsx";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function EnquiryDashboard() {
  const [enquiries, setEnquiries] = useState(() => getEnquiries());
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [manual, setManual] = useState({ name: "", email: "", message: "" });

  const refresh = () => setEnquiries(getEnquiries());

  const filtered = useMemo(() => {
    if (filter === "all") return enquiries;
    return enquiries.filter((e) => e.status === filter);
  }, [enquiries, filter]);

  const selected = enquiries.find((e) => e._id === selectedId) || null;
  const newCount = enquiries.filter((e) => e.status === "new").length;

  const handleSelect = (id) => {
    setSelectedId(id);
    const item = enquiries.find((e) => e._id === id);
    setReplyText(item?.replyMessage || "");
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (!selected || !replyText.trim()) {
      errormessage("Write a reply message");
      return;
    }

    const now = new Date().toISOString();
    const updated = enquiries.map((item) =>
      item._id === selected._id
        ? {
            ...item,
            status: "replied",
            replyMessage: replyText.trim(),
            repliedAt: now,
          }
        : item
    );
    const saved = saveEnquiries(updated);
    setEnquiries(saved);

    const subject = encodeURIComponent("Re: Your enquiry — IEEE IES IEM");
    const body = encodeURIComponent(
      `Dear ${selected.name},\n\n${replyText.trim()}\n\n—\nIEEE IES IEM Student Chapter`
    );
    window.open(`mailto:${selected.email}?subject=${subject}&body=${body}`, "_blank");

    successmessage("Reply saved locally — email client opened to send");
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    const saved = saveEnquiries(enquiries.filter((e) => e._id !== id));
    setEnquiries(saved);
    if (selectedId === id) setSelectedId(null);
    successmessage("Enquiry removed");
  };

  const handleManualAdd = (e) => {
    e.preventDefault();
    if (!manual.name.trim() || !manual.email.trim() || !manual.message.trim()) {
      errormessage("Fill name, email, and message");
      return;
    }
    const entry = {
      _id: `enq-${Date.now()}`,
      name: manual.name.trim(),
      email: manual.email.trim(),
      message: manual.message.trim(),
      status: "new",
      replyMessage: "",
      repliedAt: null,
      createdAt: new Date().toISOString(),
    };
    const saved = saveEnquiries([entry, ...enquiries]);
    setEnquiries(saved);
    setManual({ name: "", email: "", message: "" });
    setShowManual(false);
    successmessage("Enquiry logged locally");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(enquiries, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enquiries.json";
    a.click();
    URL.revokeObjectURL(url);
    successmessage("enquiries.json downloaded");
  };

  const handleClearAll = () => {
    if (!confirm("Clear all enquiries from this browser?")) return;
    setEnquiries(resetEnquiries());
    setSelectedId(null);
    successmessage("Inbox cleared");
  };

  return (
    <div className="space-y-4">
      <div className="admin-card bg-stone-50 border-stone-200 py-3">
        <p className="text-xs text-stone-600 leading-relaxed">
          Enquiries are saved in this browser. Use <strong>Log enquiry</strong> to add entries, or{" "}
          <strong>Export</strong> to download JSON.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {["all", "new", "replied"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-colors ${
                filter === f
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-white text-slate-600 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {f}
              {f === "new" && newCount > 0 && (
                <span className="ml-1.5 inline-flex min-w-[1.1rem] justify-center rounded-full bg-red-500 text-white text-[0.65rem] px-1">
                  {newCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowManual((s) => !s)}
            className="admin-icon-btn flex items-center gap-1 text-xs"
          >
            <HiOutlinePlus /> Log enquiry
          </button>
          <button type="button" onClick={refresh} className="admin-icon-btn flex items-center gap-1 text-xs">
            <HiOutlineRefresh /> Refresh
          </button>
          <button type="button" onClick={exportJson} className="btn3 text-xs py-2 px-3">
            Export
          </button>
          <button type="button" onClick={handleClearAll} className="btn3 text-xs py-2 px-3">
            Clear all
          </button>
        </div>
      </div>

      {showManual && (
        <form onSubmit={handleManualAdd} className="admin-card space-y-3">
          <h3 className="subheading">Log enquiry manually</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="inputbox"
              placeholder="Name"
              value={manual.name}
              onChange={(e) => setManual((m) => ({ ...m, name: e.target.value }))}
              required
            />
            <input
              className="inputbox"
              type="email"
              placeholder="Email"
              value={manual.email}
              onChange={(e) => setManual((m) => ({ ...m, email: e.target.value }))}
              required
            />
          </div>
          <textarea
            className="inputbox h-auto min-h-[72px] w-full"
            placeholder="Message"
            value={manual.message}
            onChange={(e) => setManual((m) => ({ ...m, message: e.target.value }))}
            required
          />
          <Button type="submit" themecss="btn1" label="Add to inbox" />
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[320px]">
        <div className="lg:col-span-2 admin-card p-0 overflow-hidden flex flex-col max-h-[min(70vh,520px)]">
          <p className="px-4 py-2.5 text-xs font-semibold text-stone-500 border-b border-stone-100 bg-stone-50">
            Inbox ({filtered.length})
          </p>
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {filtered.length === 0 ? (
              <p className="paratext text-center py-8 px-4">No enquiries in this view.</p>
            ) : (
              filtered.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => handleSelect(item._id)}
                  className={`w-full text-left px-4 py-3 hover:bg-amber-50/50 transition-colors ${
                    selectedId === item._id ? "bg-amber-50 border-l-[3px] border-l-amber-600" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm text-slate-800 truncate">{item.name}</p>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-xs text-stone-500 truncate">{item.email}</p>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">{item.message}</p>
                  <p className="text-[0.65rem] text-stone-400 mt-1">{formatDate(item.createdAt)}</p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-3 admin-card flex flex-col min-h-[280px]">
          {!selected ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
              <HiOutlineMail className="text-4xl text-stone-300 mb-3" />
              <p className="font-medium text-slate-600">Select an enquiry</p>
              <p className="paratext text-xs mt-1">Read messages and save replies locally.</p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{selected.name}</p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm text-amber-700 hover:underline break-all"
                  >
                    {selected.email}
                  </a>
                  <p className="text-xs text-stone-400 mt-1">Received {formatDate(selected.createdAt)}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <StatusBadge status={selected.status} />
                  <button
                    type="button"
                    onClick={() => handleDelete(selected._id)}
                    className="admin-icon-btn-danger p-1.5"
                    aria-label="Delete"
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>

              <div className="py-3 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">
                  Message
                </p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed bg-stone-50 rounded-lg p-3 border border-stone-100">
                  {selected.message}
                </p>
                {selected.status === "replied" && selected.replyMessage && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">
                      Saved reply · {formatDate(selected.repliedAt)}
                    </p>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed bg-emerald-50/80 rounded-lg p-3 border border-emerald-100">
                      {selected.replyMessage}
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleReply} className="border-t border-stone-100 pt-3 space-y-2">
                <label className="admin-label">Reply (opens email client)</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder="Draft your response…"
                  className="inputbox h-auto min-h-[88px] w-full"
                  required
                />
                <Button
                  type="submit"
                  themecss="btn1 w-full sm:w-auto justify-center"
                  label={
                    selected.status === "replied"
                      ? "Update & open email"
                      : "Save reply & open email"
                  }
                />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const isNew = status === "new";
  return (
    <span
      className={`shrink-0 text-[0.65rem] font-bold uppercase px-2 py-0.5 rounded-full ${
        isNew ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
      }`}
    >
      {isNew ? "New" : "Replied"}
    </span>
  );
}

export default EnquiryDashboard;
