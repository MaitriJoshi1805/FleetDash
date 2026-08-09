import { FaBell, FaSearch, FaMoon, FaSun} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {

  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`h-20 px-8 flex items-center justify-between border-b ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-gray-300 text-gray-900"
      }`}>

      {/* Left Side */}
      <div>
        <h1
          className={`text-3xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Fleet Dashboard
        </h1>

        <p
          className={`text-sm ${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          }`}
        >
          Monitor all fleet vehicles in real time
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div
          className={`flex items-center rounded-xl px-4 py-2 ${
            theme === "dark"
              ? "bg-slate-800"
              : "bg-gray-100 border border-gray-300"
          }`}
        >
          <FaSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className={`ml-2 bg-transparent outline-none ${
              theme === "dark"
                ? "text-white placeholder:text-slate-500"
                : "text-gray-900 placeholder:text-gray-500"
            }`}
          />
        </div>

        {/* Notification */}
        <button className={`relative p-3 rounded-xl transition ${
            theme === "dark"
              ? "bg-slate-800 hover:bg-slate-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}>
          <FaBell className="text-white text-lg" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

         {/* theme */}

        <button
          onClick={toggleTheme}
          className={`p-3 rounded-xl transition ${
            theme === "dark"
              ? "bg-slate-800 hover:bg-slate-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}>
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* User */}
        <div className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
            theme === "dark"
              ? "bg-slate-800"
              : "bg-gray-100 border border-gray-300"
          }`}>
          <MdAccountCircle size={42} className="text-blue-500" />

          <div>
            <h3
              className={`font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Admin</h3>
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