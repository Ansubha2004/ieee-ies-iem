import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "../src/components/sidebar.jsx"
import Navbar from "../src/components/navbar.jsx"
import CWCs from "./pages/cwcs.jsx"
import Contact from "./pages/contactpage.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      <Sidebar/>
      <div className="h-full relative flex-1 flex flex-col min-h-0 overflow-hidden">
        <Navbar/>
        <main className="flex-1 overflow-y-auto hide-scrollbar min-h-0 w-full">
          <Routes>
            <Route path="cwcs" element={<CWCs />}/>
            <Route path="contact" element={<Contact />}/>
          </Routes>
        </main>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
