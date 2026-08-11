import { Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">

        {/* NAVBAR */}
        <div className="relative z-[99999]">
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <main className="relative z-0 p-6 flex-1 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;