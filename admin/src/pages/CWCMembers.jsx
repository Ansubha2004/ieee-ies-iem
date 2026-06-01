import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import AdminPage from "../components/AdminPage.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import { getCwcMembers, saveCwcMembers, resetCwcMembers } from "../utils/storage.js";
import { successmessage, errormessage } from "../utils/notification.jsx";

const emptyForm = () => ({
  localId: null,
  id: "",
  name: "",
  role: "",
  description: "",
  linkedin: "",
  email: "",
  image: null,
  existingImage: "",
});

function getSocialLink(member, type) {
  const entry = member.socialmedia?.find((s) =>
    s.platform?.toLowerCase().includes(type)
  );
  return entry?.link || "";
}

function memberToForm(member) {
  return {
    localId: member._id,
    id: String(member.id ?? ""),
    name: member.name || "",
    role: member.role || "",
    description: member.description || "",
    linkedin: getSocialLink(member, "linkedin"),
    email: getSocialLink(member, "mail"),
    image: null,
    existingImage: member.image || "",
  };
}

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function CWCMembers() {
  const [members, setMembers] = useState(() => getCwcMembers());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const isEditing = Boolean(form.localId);

  const persist = (next) => {
    const saved = saveCwcMembers(next);
    setMembers(saved);
  };

  const openAdd = () => {
    setForm(emptyForm());
    setShowForm(true);
  };

  const openEdit = (member) => {
    setForm(memberToForm(member));
    setShowForm(true);
    document.getElementById("cwc-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm());
  };

  const setField = (name) => (value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { localId, id, name, role, description, linkedin, email, image, existingImage } =
      form;

    if (!id || !name.trim() || !role.trim() || !description.trim() || !linkedin.trim() || !email.trim()) {
      errormessage("Fill all required fields");
      return;
    }

    if (!isEditing && !image) {
      errormessage("Profile photo is required for new members");
      return;
    }

    if (isEditing && !image && !existingImage) {
      errormessage("Add a profile photo or keep the existing one");
      return;
    }

    let imageUrl = existingImage;
    if (image) {
      try {
        imageUrl = await readImageAsDataUrl(image);
      } catch {
        errormessage("Could not read image file");
        return;
      }
    }

    const record = {
      _id: localId || `cwc-${Date.now()}`,
      id: Number(id),
      name: name.trim(),
      role: role.trim(),
      description: description.trim(),
      image: imageUrl,
      socialmedia: [
        { platform: "linkedin", link: linkedin.trim() },
        { platform: "email", link: email.trim() },
      ],
    };

    if (isEditing) {
      persist(members.map((m) => (m._id === localId ? record : m)));
      successmessage("Member updated");
    } else {
      persist([...members, record]);
      successmessage("Member added");
    }
    closeForm();
  };

  const handleDelete = (member) => {
    if (!confirm(`Delete ${member.name}?`)) return;
    persist(members.filter((m) => m._id !== member._id));
    if (form.localId === member._id) closeForm();
    successmessage("Member removed");
  };

  const handleReset = () => {
    if (!confirm("Clear all CWC members from browser storage?")) return;
    setMembers(resetCwcMembers());
    closeForm();
    successmessage("CWC list cleared");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(members, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cwc-members.json";
    a.click();
    URL.revokeObjectURL(url);
    successmessage("cwc-members.json downloaded");
  };

  const advisor = members[0];
  const team = members.slice(1);

  const toolbar = (
    <>
      <Button click={exportJson} themecss="btn3" label="Export" />
      <Button click={handleReset} themecss="btn3" label="Clear all" />
      <Button
        click={() => (showForm && !isEditing ? closeForm() : openAdd())}
        themecss="btn1"
        label={showForm && !isEditing ? "Close" : "Add member"}
      />
    </>
  );

  const pageContent = (
    <>
      {showForm && (
        <form onSubmit={handleSubmit} className="admin-card space-y-4" id="cwc-form">
          <h2 className="subheading">{isEditing ? "Edit member" : "Add member"}</h2>

          {(form.existingImage || form.image) && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
              {form.existingImage && !form.image && (
                <img
                  src={form.existingImage}
                  alt="Current"
                  className="w-16 h-16 rounded-md object-cover"
                />
              )}
              <p className="paratext text-xs">
                {form.image
                  ? `New photo: ${form.image.name}`
                  : "Current photo — choose a file below to replace"}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              label="Sort ID (display order)"
              type="number"
              value={form.id}
              onChange={setField("id")}
              required
            />
            <FormField label="Full name" value={form.name} onChange={setField("name")} required />
            <FormField label="Role / position" value={form.role} onChange={setField("role")} required />
            <FormField
              label="LinkedIn URL"
              type="url"
              value={form.linkedin}
              onChange={setField("linkedin")}
              required
            />
            <FormField
              label="Email"
              type="email"
              value={form.email}
              onChange={setField("email")}
              required
            />
            <div>
              <label className="admin-label">
                Profile photo {isEditing ? "(optional)" : "(required)"}
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="inputbox h-auto py-1.5 w-full text-sm"
                required={!isEditing}
              />
            </div>
          </div>

          <FormField
            label="Description"
            value={form.description}
            onChange={setField("description")}
            multiline
            rows={4}
            required
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="submit"
              themecss="btn1"
              label={isEditing ? "Update member" : "Add member"}
            />
            <Button click={closeForm} themecss="btn3" label="Cancel" />
          </div>
        </form>
      )}

      {members.length === 0 ? (
        <p className="paratext text-center py-8">
          No members yet. Add members here, then export JSON for your site.
        </p>
      ) : (
        <div className="space-y-4">
          {advisor && (
            <section>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2">
                Advisor (first by sort ID)
              </p>
              <MemberCard
                member={advisor}
                isAdvisor
                onEdit={() => openEdit(advisor)}
                onDelete={() => handleDelete(advisor)}
              />
            </section>
          )}
          {team.length > 0 && (
            <section>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2">
                Members
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {team.map((m) => (
                  <MemberCard
                    key={m._id}
                    member={m}
                    onEdit={() => openEdit(m)}
                    onDelete={() => handleDelete(m)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );

  return (
    <AdminPage
      title="CWC Members"
      description="Stored in this browser. Export JSON to sync with the public site manually."
      actions={toolbar}
      content={pageContent}
    />
  );
}

function MemberCard({ member, isAdvisor, onEdit, onDelete }) {
  const linkedin = getSocialLink(member, "linkedin");
  const mail = getSocialLink(member, "mail");

  return (
    <div
      className={`profilecard flex flex-col sm:flex-row overflow-hidden min-w-0 ${
        isAdvisor ? "ring-2 ring-amber-500/40" : ""
      }`}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full sm:w-28 h-36 sm:h-auto sm:min-h-[120px] shrink-0 object-cover"
      />
      <div className="p-3 flex-1 min-w-0 flex flex-col">
        <div className="flex justify-between gap-2 items-start">
          <div className="min-w-0">
            <p className="font-semibold text-zinc-900 text-sm break-words">{member.name}</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              ID: {member.id} · {member.role}
            </p>
          </div>
          <div className="flex gap-1 shrink-0 items-center">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-blue-600 p-1">
                <FaLinkedin size={18} />
              </a>
            )}
            {mail && (
              <a href={`mailto:${mail}`} className="text-red-700 p-1">
                <IoMdMailUnread size={20} />
              </a>
            )}
          </div>
        </div>
        <p className="paratext text-xs mt-1.5 flex-1">{member.description}</p>
        <div className="flex gap-2 mt-3 pt-2 border-t border-zinc-100">
          <button
            type="button"
            onClick={onEdit}
            className="admin-icon-btn flex-1 justify-center flex items-center gap-1 text-xs"
          >
            <HiOutlinePencil /> Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="admin-icon-btn-danger flex items-center justify-center gap-1 text-xs px-3"
            aria-label="Delete"
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CWCMembers;
