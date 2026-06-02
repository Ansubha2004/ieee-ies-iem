import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Sidebar from "../src/components/sidebar.jsx"
import Navbar from "../src/components/navbar.jsx"

function App() {
  return (
    <div className="relative w-screen h-screen overflow-x-hidden flex ">
      <Sidebar/>
      <div className=" h-full relative flex-1 ">
        <Navbar/>
      </div>

    </div>
  );
}

export default App;
