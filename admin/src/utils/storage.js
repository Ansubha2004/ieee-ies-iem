import defaultEvents from "../data/events.json";
import defaultContact from "../data/contact.json";

const EVENTS_KEY = "ieee-ies-admin-events";
const CWC_KEY = "ieee-ies-admin-cwc";
const CONTACT_KEY = "ieee-ies-admin-contact";

export function getEvents() {
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* use defaults */
  }
  return [...defaultEvents];
}

export function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function resetEvents() {
  localStorage.removeItem(EVENTS_KEY);
  return [...defaultEvents];
}

export function getCwcMembers() {
  try {
    const stored = localStorage.getItem(CWC_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    /* empty */
  }
  return [];
}

export function saveCwcMembers(members) {
  const sorted = [...members].sort((a, b) => Number(a.id) - Number(b.id));
  localStorage.setItem(CWC_KEY, JSON.stringify(sorted));
  return sorted;
}

export function resetCwcMembers() {
  localStorage.removeItem(CWC_KEY);
  return [];
}

export function getContact() {
  try {
    const stored = localStorage.getItem(CONTACT_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* use defaults */
  }
  return structuredClone(defaultContact);
}

export function saveContact(contact) {
  localStorage.setItem(CONTACT_KEY, JSON.stringify(contact));
  return contact;
}

export function resetContact() {
  localStorage.removeItem(CONTACT_KEY);
  return structuredClone(defaultContact);
}

const ENQUIRIES_KEY = "ieee-ies-admin-enquiries";

export function getEnquiries() {
  try {
    const stored = localStorage.getItem(ENQUIRIES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    /* empty */
  }
  return [];
}

export function saveEnquiries(enquiries) {
  const sorted = [...enquiries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(sorted));
  return sorted;
}

export function resetEnquiries() {
  localStorage.removeItem(ENQUIRIES_KEY);
  return [];
}
