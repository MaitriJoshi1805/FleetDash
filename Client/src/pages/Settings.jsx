import {FaUser,FaLock,FaBell,FaTruck,FaChartBar,FaGlobe,FaMoon,FaDatabase,FaInfoCircle,FaSignOutAlt,FaSave,} from "react-icons/fa";

function Settings() {
  return (
    <div className="space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="text-slate-400">
          Manage your FleetDash system configuration
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        

        {/* Profile */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaUser className="text-blue-500 text-2xl" />
            <h2 className="text-xl font-semibold">
              Profile
            </h2>
          </div>

          <div className="space-y-4">

            <input
              className="w-full bg-slate-800 p-3 rounded-lg"
              placeholder="Admin Name"
              defaultValue="Admin"
            />

            <input
              className="w-full bg-slate-800 p-3 rounded-lg"
              placeholder="Email"
              defaultValue="admin@fleetdash.com"
            />

            <input
              className="w-full bg-slate-800 p-3 rounded-lg"
              placeholder="Phone"
              defaultValue="+91 9876543210"
            />

            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg flex items-center gap-2">

              <FaSave />

              Save Profile

            </button>

          </div>

        </div>

        {/* Password */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaLock className="text-red-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              Security
            </h2>
          </div>

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              className="w-full bg-slate-800 p-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-slate-800 p-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-slate-800 p-3 rounded-lg"
            />

            <label className="flex items-center justify-between bg-slate-800 p-3 rounded-lg">

              <span>Enable Two-Factor Authentication</span>

              <input type="checkbox" />

            </label>

            <button className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg flex items-center gap-2">

              <FaSave />

              Update Password

            </button>

          </div>

        </div>

        {/* Fleet Settings */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaTruck className="text-green-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              Fleet Settings
            </h2>
          </div>

          <div className="space-y-4">

            <input
              className="w-full bg-slate-800 p-3 rounded-lg"
              defaultValue="80 km/h"
              placeholder="Default Speed Limit"
            />

            <input
              className="w-full bg-slate-800 p-3 rounded-lg"
              defaultValue="20%"
              placeholder="Fuel Warning Level"
            />

            <input
              className="w-full bg-slate-800 p-3 rounded-lg"
              defaultValue="5000 KM"
              placeholder="Maintenance Interval"
            />

            <input
              className="w-full bg-slate-800 p-3 rounded-lg"
              defaultValue="5 sec"
              placeholder="GPS Refresh Rate"
            />

            <button className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg flex items-center gap-2">

              <FaSave />

              Save Fleet Settings

            </button>

          </div>

        </div>

        {/* Notifications */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaBell className="text-yellow-400 text-2xl" />

            <h2 className="text-xl font-semibold">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">

            <label className="flex justify-between bg-slate-800 p-3 rounded-lg">
              <span>Email Alerts</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between bg-slate-800 p-3 rounded-lg">
              <span>SMS Alerts</span>
              <input type="checkbox" />
            </label>

            <label className="flex justify-between bg-slate-800 p-3 rounded-lg">
              <span>Push Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between bg-slate-800 p-3 rounded-lg">
              <span>Overspeed Alerts</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between bg-slate-800 p-3 rounded-lg">
              <span>Low Fuel Alerts</span>
              <input type="checkbox" defaultChecked />
            </label>

            <button className="bg-yellow-500 hover:bg-yellow-600 px-5 py-3 rounded-lg flex items-center gap-2">

              <FaSave />

              Save Notifications

            </button>

          </div>

        </div>

        {/* Preferences */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <FaChartBar className="text-cyan-400 text-2xl" />

            <h2 className="text-xl font-semibold">
              Dashboard Preferences
            </h2>

          </div>

          <div className="space-y-4">

            <label className="flex justify-between bg-slate-800 p-3 rounded-lg">
              <span>Show Live Map</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between bg-slate-800 p-3 rounded-lg">
              <span>Show Fleet Chart</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between bg-slate-800 p-3 rounded-lg">
              <span>Show Vehicle Table</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between bg-slate-800 p-3 rounded-lg">
              <span>Show Recent Alerts</span>
              <input type="checkbox" defaultChecked />
            </label>

            <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg flex items-center gap-2">

              <FaSave />

              Save Dashboard

            </button>

          </div>

        </div>

        {/* System Preferences */}
 
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaGlobe className="text-green-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              System Preferences
            </h2>
          </div>

          <div className="space-y-4">

            <div>
              <label className="block mb-2 text-slate-400">
                Language
              </label>

              <select className="w-full bg-slate-800 p-3 rounded-lg">
                <option>English</option>
                <option>Hindi</option>
                <option>Gujarati</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-slate-400">
                Time Zone
              </label>

              <select className="w-full bg-slate-800 p-3 rounded-lg">
                <option>Asia/Kolkata</option>
                <option>UTC</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-slate-400">
                Theme
              </label>

              <select className="w-full bg-slate-800 p-3 rounded-lg">
                <option>Dark</option>
                <option>Light</option>
              </select>
            </div>

            <button className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg flex items-center gap-2">
              <FaSave />
              Save Preferences
            </button>

          </div>

        </div>

        {/* Backup & Export */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaDatabase className="text-purple-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              Backup & Export
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <button className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg">
              Export Vehicles
            </button>

            <button className="bg-green-600 hover:bg-green-700 py-3 rounded-lg">
              Export Drivers
            </button>

            <button className="bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg">
              Export Trips
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 py-3 rounded-lg">
              Backup Database
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;