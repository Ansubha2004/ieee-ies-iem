import { useState } from "react";
import AdminPage from "../components/AdminPage.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import EnquiryDashboard from "../components/EnquiryDashboard.jsx";
import { getContact, saveContact, resetContact } from "../utils/storage.js";
import { successmessage, errormessage } from "../utils/notification.jsx";

function Contacts() {
  const [tab, setTab] = useState("enquiries");
  const [contact, setContact] = useState(() => getContact());

  const updateSection = (section, field, value) => {
    setContact((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSave = () => {
    const email = contact.social?.email?.trim();
    if (!email) {
      errormessage("Official email is required");
      return;
    }
    saveContact(contact);
    successmessage("Contact page content saved");
  };

  const handleReset = () => {
    if (!confirm("Reset contact page to defaults?")) return;
    setContact(resetContact());
    successmessage("Reset to defaults");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(contact, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact.json";
    a.click();
    URL.revokeObjectURL(url);
    successmessage("Downloaded — copy to client/src/data/contact.json");
  };

  const toolbar =
    tab === "content" ? (
      <>
        <Button click={exportJson} themecss="btn3" label="Export" />
        <Button click={handleReset} themecss="btn3" label="Reset" />
        <Button click={handleSave} themecss="btn1" label="Save changes" />
      </>
    ) : null;

  const tabBar = (
    <div className="flex gap-1 p-1 bg-stone-100 rounded-xl w-fit border border-stone-200">
      <button
        type="button"
        onClick={() => setTab("enquiries")}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
          tab === "enquiries"
            ? "bg-white text-amber-800 shadow-sm"
            : "text-stone-500 hover:text-stone-800"
        }`}
      >
        Enquiry inbox
      </button>
      <button
        type="button"
        onClick={() => setTab("content")}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
          tab === "content"
            ? "bg-white text-amber-800 shadow-sm"
            : "text-stone-500 hover:text-stone-800"
        }`}
      >
        Page content
      </button>
    </div>
  );

  const contentEditor = (
    <div className="space-y-4">
      <div className="admin-card space-y-3">
        <h2 className="subheading border-b border-stone-100 pb-2">
          Help section (public contact page)
        </h2>
        <FormField
          label="Email address"
          type="email"
          value={contact.social.email}
          onChange={(v) => updateSection("social", "email", v)}
        />
        <FormField
          label="Location title"
          value={contact.social.locationTitle}
          onChange={(v) => updateSection("social", "locationTitle", v)}
        />
        <FormField
          label="Address"
          value={contact.social.address}
          onChange={(v) => updateSection("social", "address", v)}
          multiline
          rows={3}
        />
        <FormField
          label="Google Maps link"
          value={contact.social.mapsLink}
          onChange={(v) => updateSection("social", "mapsLink", v)}
        />
        <FormField
          label="Map embed URL"
          value={contact.social.mapEmbedUrl}
          onChange={(v) => updateSection("social", "mapEmbedUrl", v)}
          multiline
          rows={2}
        />
      </div>

      <div className="admin-card space-y-3">
        <h2 className="subheading border-b border-stone-100 pb-2">Join banner</h2>
        <FormField
          label="Title"
          value={contact.joinBanner.title}
          onChange={(v) => updateSection("joinBanner", "title", v)}
        />
        <FormField
          label="Description"
          value={contact.joinBanner.description}
          onChange={(v) => updateSection("joinBanner", "description", v)}
          multiline
          rows={4}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField
            label="Button text"
            value={contact.joinBanner.buttonText}
            onChange={(v) => updateSection("joinBanner", "buttonText", v)}
          />
          <FormField
            label="Button link"
            value={contact.joinBanner.buttonLink}
            onChange={(v) => updateSection("joinBanner", "buttonLink", v)}
          />
        </div>
      </div>

      <div className="admin-card space-y-3">
        <h2 className="subheading border-b border-stone-100 pb-2">Social media links</h2>
        <FormField
          label="Instagram URL"
          value={contact.socialLinks.instagram}
          onChange={(v) => updateSection("socialLinks", "instagram", v)}
        />
        <FormField
          label="LinkedIn URL"
          value={contact.socialLinks.linkedin}
          onChange={(v) => updateSection("socialLinks", "linkedin", v)}
        />
        <FormField
          label="Facebook URL"
          value={contact.socialLinks.facebook}
          onChange={(v) => updateSection("socialLinks", "facebook", v)}
        />
      </div>
    </div>
  );

  const pageContent = (
    <>
      {tabBar}
      {tab === "enquiries" ? <EnquiryDashboard /> : contentEditor}
    </>
  );

  return (
    <AdminPage
      title="Contact & enquiries"
      description="Edit contact page content and manage the local enquiry inbox."
      actions={toolbar}
      content={pageContent}
    />
  );
}

export default Contacts;
