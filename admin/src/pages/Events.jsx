import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import AdminPage from "../components/AdminPage.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import { getEvents, saveEvents, resetEvents } from "../utils/storage.js";
import { successmessage, errormessage } from "../utils/notification.jsx";

const emptyEvent = () => ({
  id: String(Date.now()),
  link: "",
  name: "",
  Description: "",
  venue: "",
  date: "",
  gallery: "",
  details: "",
  poster: "",
});

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function Events() {
  const [events, setEvents] = useState(() => getEvents());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyEvent());
  const [posterFile, setPosterFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const persist = (next) => {
    setEvents(next);
    saveEvents(next);
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyEvent());
    setPosterFile(null);
    setShowForm(true);
  };

  const openEdit = (event) => {
    setEditing(event.id);
    setForm({
      id: event.id,
      link: event.link || "",
      name: event.name || "",
      Description: event.Description || "",
      venue: event.venue || "",
      date: event.date || "",
      gallery: event.gallery || "",
      details: event.details || "",
      poster: event.poster || "",
    });
    setPosterFile(null);
    setShowForm(true);
    document.getElementById("event-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyEvent());
    setPosterFile(null);
  };

  const setField = (name) => (value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files?.[0] || null;
    setPosterFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.date.trim()) {
      errormessage("Event name and date are required");
      return;
    }

    setSaving(true);
    try {
      let poster = form.poster || "";
      if (posterFile) {
        poster = await readImageAsDataUrl(posterFile);
      }

      const record = {
        id: editing ? editing : form.id,
        link: form.link.trim(),
        name: form.name.trim(),
        Description: form.Description.trim(),
        venue: form.venue.trim(),
        date: form.date.trim(),
        gallery: form.gallery.trim(),
        details: form.details.trim(),
        poster,
      };

      if (editing) {
        persist(events.map((ev) => (ev.id === editing ? record : ev)));
        successmessage("Event updated");
      } else {
        persist([...events, record]);
        successmessage("Event added");
      }
      closeForm();
    } catch {
      errormessage("Could not read poster image");
    } finally {
      setSaving(false);
    }
  };

  const clearPoster = () => {
    setPosterFile(null);
    setForm((prev) => ({ ...prev, poster: "" }));
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this event?")) return;
    persist(events.filter((ev) => ev.id !== id));
    if (editing === id) closeForm();
    successmessage("Event removed");
  };

  const handleReset = () => {
    if (!confirm("Reset all events to default client data?")) return;
    setEvents(resetEvents());
    closeForm();
    successmessage("Events reset to defaults");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.json";
    a.click();
    URL.revokeObjectURL(url);
    successmessage("Downloaded — copy to client/src/data/");
  };

  const posterPreview = posterFile ? null : form.poster;

  const toolbar = (
    <>
      <Button click={exportJson} themecss="btn3" label="Export" />
      <Button click={handleReset} themecss="btn3" label="Reset" />
      <Button
        click={openAdd}
        themecss="btn1 gap-1.5"
        label={
          <span className="flex items-center gap-1.5">
            <HiOutlinePlus className="text-lg" /> Add
          </span>
        }
      />
    </>
  );

  const pageContent = (
    <>
      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card space-y-4" id="event-form">
          <h2 className="subheading">{editing ? "Edit event" : "New event"}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Event name" value={form.name} onChange={setField("name")} required />
            <FormField label="Type" value={form.Description} onChange={setField("Description")} />
            <FormField label="Date" value={form.date} onChange={setField("date")} required />
            <FormField label="Venue" value={form.venue} onChange={setField("venue")} />
            <FormField
              label="Registration link"
              value={form.link}
              onChange={setField("link")}
              className="sm:col-span-2"
            />
            <FormField
              label="Gallery link"
              value={form.gallery}
              onChange={setField("gallery")}
              className="sm:col-span-2"
            />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 space-y-3">
            <label className="admin-label">Event poster (optional)</label>
            <p className="paratext text-xs -mt-1">
              Recommended aspect ratio 16:11 (same as the public Events page cards).
            </p>

            {(posterPreview || posterFile) && (
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                {posterPreview && !posterFile && (
                  <img
                    src={posterPreview}
                    alt="Current poster"
                    className="w-full sm:w-40 rounded-lg border border-stone-200 object-cover aspect-[16/11] bg-white"
                  />
                )}
                {posterFile && (
                  <p className="paratext text-xs sm:pt-2">
                    New poster: <span className="font-medium">{posterFile.name}</span>
                  </p>
                )}
                <button
                  type="button"
                  onClick={clearPoster}
                  className="text-xs font-medium text-red-600 hover:text-red-700"
                >
                  Remove poster
                </button>
              </div>
            )}

            <input
              type="file"
              name="poster"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handlePosterChange}
              className="inputbox h-auto py-1.5 w-full text-sm"
            />
          </div>

          <div>
            <label className="admin-label">Details</label>
            <textarea
              name="details"
              value={form.details}
              onChange={(e) => setField("details")(e.target.value)}
              rows={3}
              className="inputbox h-auto min-h-[72px] w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="submit"
              disabled={saving}
              themecss="btn1"
              label={saving ? "Saving…" : "Save"}
            />
            <Button click={closeForm} themecss="btn3" label="Cancel" />
          </div>
        </form>
      )}

      <div className="space-y-2 sm:space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="admin-card flex flex-col sm:flex-row sm:items-stretch gap-3 py-3 sm:py-4 overflow-hidden"
          >
            {event.poster ? (
              <img
                src={event.poster}
                alt=""
                className="w-full sm:w-32 md:w-36 shrink-0 rounded-lg object-cover aspect-[16/11] border border-stone-200"
              />
            ) : (
              <div className="w-full sm:w-32 md:w-36 shrink-0 rounded-lg border border-dashed border-stone-300 bg-stone-50 flex items-center justify-center aspect-[16/11]">
                <span className="text-[0.65rem] text-stone-400 text-center px-2">No poster</span>
              </div>
            )}
            <div className="flex flex-1 min-w-0 flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-zinc-800 text-sm break-words">{event.name}</p>
                <p className="paratext text-xs mt-0.5">
                  {event.date} · {event.venue} · {event.Description}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => openEdit(event)}
                  className="admin-icon-btn"
                  aria-label="Edit"
                >
                  <HiOutlinePencil />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(event.id)}
                  className="admin-icon-btn-danger"
                  aria-label="Delete"
                >
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="paratext text-center py-6">No events yet.</p>
        )}
      </div>
    </>
  );

  return (
    <AdminPage
      title="Events"
      description="Matches events.json. Optional poster per event. Stored in this browser until exported."
      actions={toolbar}
      content={pageContent}
    />
  );
}

export default Events;
