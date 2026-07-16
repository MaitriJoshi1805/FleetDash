import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;