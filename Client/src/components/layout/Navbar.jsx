import { FaBell, FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between">

      {/* Left Side */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Fleet Dashboard
        </h1>

        <p className="text-slate-400 text-sm">
          Monitor all fleet vehicles in real time
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2">
          <FaSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent outline-none text-white placeholder:text-slate-500"
          />
        </div>

        {/* Notification */}
        <button className="relative bg-slate-800 p-3 rounded-xl hover:bg-slate-700 transition">
          <FaBell className="text-white text-lg" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 bg-slate-800 px-3 py-2 rounded-xl">
          <MdAccountCircle size={42} className="text-blue-500" />

          <div>
            <h3 className="font-semibold text-white">Admin</h3>
            <p className="text-xs text-slate-400">
              Fleet Manager
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;