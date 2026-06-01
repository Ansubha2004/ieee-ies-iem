import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AdminLayout from "./components/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Events from "./pages/Events.jsx";
import CWCMembers from "./pages/CWCMembers.jsx";
import Contacts from "./pages/Contacts.jsx";

const routes = [
  { path: "/", page: Dashboard },
  { path: "/events", page: Events },
  { path: "/cwc", page: CWCMembers },
  { path: "/contacts", page: Contacts },
];

function App() {
  return (
    <>
      <Routes>
        {routes.map(({ path, page }) => (
          <Route
            key={path}
            path={path}
            element={<AdminLayout page={page} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer theme="colored" autoClose={3000} />
    </>
  );
}

export default App;
