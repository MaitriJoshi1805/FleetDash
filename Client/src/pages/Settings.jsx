import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaTruck,
  FaChartBar,
  FaGlobe,
  FaDatabase,
  FaSave,
} from "react-icons/fa";

import { useSettings } from "../context/SettingsContext";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const {
    settings,
    updateSettings,
    updateNestedSettings,
    t,
  } = useSettings();

  const { theme, toggleTheme } = useTheme();

  const [message, setMessage] = useState("");

  // ================= PROFILE =================

  const [profile, setProfile] = useState({
    name: settings?.profile?.name || "Admin",
    email: settings?.profile?.email || "admin@fleetdash.com",
    phone: settings?.profile?.phone || "+91 9876543210",
  });

  // ================= PASSWORD =================

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  // ================= FLEET =================

  const [fleet, setFleet] = useState({
    speedLimit: settings?.fleet?.speedLimit || "80 km/h",
    fuelWarning: settings?.fleet?.fuelWarning || "20%",
    maintenanceInterval:
      settings?.fleet?.maintenanceInterval || "5000 KM",
    gpsRefreshRate:
      settings?.fleet?.gpsRefreshRate || "5 sec",
  });

  // ================= NOTIFICATIONS =================

  const [notifications, setNotifications] = useState({
    emailAlerts:
      settings?.notifications?.emailAlerts ?? true,

    smsAlerts:
      settings?.notifications?.smsAlerts ?? false,

    pushNotifications:
      settings?.notifications?.pushNotifications ?? true,

    overspeedAlerts:
      settings?.notifications?.overspeedAlerts ?? true,

    lowFuelAlerts:
      settings?.notifications?.lowFuelAlerts ?? true,
  });

  // ================= DASHBOARD =================

  const [dashboard, setDashboard] = useState({
    showLiveMap:
      settings?.dashboard?.showLiveMap ?? true,

    showFleetChart:
      settings?.dashboard?.showFleetChart ?? true,

    showVehicleTable:
      settings?.dashboard?.showVehicleTable ?? true,

    showRecentAlerts:
      settings?.dashboard?.showRecentAlerts ?? true,
  });

  // ================= SYSTEM =================

  const [systemPreferences, setSystemPreferences] =
    useState({
      language: settings?.language || "English",

      timezone:
        settings?.timezone || "Asia/Kolkata",

      systemTheme:
        settings?.systemTheme || "Dark",
    });

  // ================= MESSAGE =================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // ================= PROFILE SAVE =================

  const saveProfile = () => {
    updateSettings({
      profile,
    });

    showMessage(
      t("profileSaved") ||
        "Profile saved successfully!"
    );
  };

  // ================= PASSWORD =================

  const updatePassword = () => {
    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirm
    ) {
      alert("Please fill all password fields.");
      return;
    }

    if (
      passwords.newPassword !==
      passwords.confirm
    ) {
      alert(
        "New password and confirm password do not match."
      );
      return;
    }

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    showMessage(
      t("passwordUpdated") ||
        "Password updated successfully!"
    );
  };

  // ================= FLEET SAVE =================

  const saveFleet = () => {
    updateNestedSettings("fleet", fleet);

    showMessage(
      t("fleetSaved") ||
        "Fleet settings saved successfully!"
    );
  };

  // ================= NOTIFICATION SAVE =================

  const saveNotifications = () => {
    updateNestedSettings(
      "notifications",
      notifications
    );

    showMessage(
      t("notificationsSaved") ||
        "Notification settings saved successfully!"
    );
  };

  // ================= DASHBOARD SAVE =================

  const saveDashboard = () => {
    updateNestedSettings(
      "dashboard",
      dashboard
    );

    showMessage(
      t("dashboardSaved") ||
        "Dashboard preferences saved successfully!"
    );
  };

  // ================= SYSTEM SAVE =================

  const saveSystemPreferences = () => {
    updateSettings({
      language: systemPreferences.language,
      timezone: systemPreferences.timezone,
      systemTheme:
        systemPreferences.systemTheme,
    });

    // Change actual application theme
    const selectedTheme =
      systemPreferences.systemTheme.toLowerCase();

    if (selectedTheme !== theme) {
      toggleTheme();
    }

    let successMessage =
      "System preferences saved successfully!";

    if (
      systemPreferences.language === "Hindi"
    ) {
      successMessage =
        "सिस्टम प्राथमिकताएँ सफलतापूर्वक सेव हुईं!";
    }

    if (
      systemPreferences.language === "Gujarati"
    ) {
      successMessage =
        "સિસ્ટમ પસંદગીઓ સફળતાપૂર્વક સેવ થઈ!";
    }

    showMessage(successMessage);
  };

  // ================= EXPORT =================

  const exportData = (type) => {
    const data = {
      type,
      exportedAt:
        new Date().toISOString(),
      settings,
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      `${type}-export.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showMessage(
      t("exported") ||
        `${type} exported successfully!`
    );
  };

  // ================= BACKUP =================

  const backupDatabase = () => {
    const backup = {
      createdAt:
        new Date().toISOString(),

      application: "FleetDash",

      settings,
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "fleetdash-backup.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showMessage(
      t("backupStarted") ||
        "Backup created successfully!"
    );
  };

  return (
    <div
      className={`space-y-6 ${
        theme === "dark"
          ? "text-white"
          : "text-gray-900"
      }`}
    >
      {/* ================= SUCCESS MESSAGE ================= */}

      {message && (
        <div className="fixed top-24 right-6 z-[99999] bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg">
          {message}
        </div>
      )}

      {/* ================= HEADING ================= */}

      <div>
        <h1 className="text-3xl font-bold">
          {t("settings") || "Settings"}
        </h1>

        <p
          className={
            theme === "dark"
              ? "text-slate-400"
              : "text-gray-600"
          }
        >
          {t("settingsDescription") ||
            "Manage your FleetDash system configuration"}
        </p>
      </div>

      {/* ================= GRID ================= */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ================= PROFILE ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">
            <FaUser className="text-blue-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("profile") || "Profile"}
            </h2>
          </div>

          <div className="space-y-4">

            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className="settings-input"
              placeholder="Admin Name"
            />

            <input
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
              className="settings-input"
              placeholder="Email"
            />

            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
              className="settings-input"
              placeholder="Phone"
            />

            <button
              type="button"
              onClick={saveProfile}
              className="save-button bg-blue-600 hover:bg-blue-700"
            >
              <FaSave />
              {t("saveProfile") ||
                "Save Profile"}
            </button>

          </div>
        </div>

        {/* ================= SECURITY ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">

            <FaLock className="text-red-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("security") ||
                "Security"}
            </h2>

          </div>

          <div className="space-y-4">

            <input
              type="password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  current:
                    e.target.value,
                })
              }
              placeholder="Current Password"
              className="settings-input"
            />

            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword:
                    e.target.value,
                })
              }
              placeholder="New Password"
              className="settings-input"
            />

            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirm:
                    e.target.value,
                })
              }
              placeholder="Confirm Password"
              className="settings-input"
            />

            <label className="settings-row">

              <span>
                Enable Two-Factor Authentication
              </span>

              <input
                type="checkbox"
                defaultChecked
              />

            </label>

            <button
              type="button"
              onClick={updatePassword}
              className="save-button bg-red-600 hover:bg-red-700"
            >
              <FaSave />
              Update Password
            </button>

          </div>
        </div>

        {/* ================= FLEET ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">

            <FaTruck className="text-green-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("fleetSettings") ||
                "Fleet Settings"}
            </h2>

          </div>

          <div className="space-y-4">

            <input
              value={fleet.speedLimit}
              onChange={(e) =>
                setFleet({
                  ...fleet,
                  speedLimit:
                    e.target.value,
                })
              }
              className="settings-input"
              placeholder="Default Speed Limit"
            />

            <input
              value={fleet.fuelWarning}
              onChange={(e) =>
                setFleet({
                  ...fleet,
                  fuelWarning:
                    e.target.value,
                })
              }
              className="settings-input"
              placeholder="Fuel Warning Level"
            />

            <input
              value={
                fleet.maintenanceInterval
              }
              onChange={(e) =>
                setFleet({
                  ...fleet,
                  maintenanceInterval:
                    e.target.value,
                })
              }
              className="settings-input"
              placeholder="Maintenance Interval"
            />

            <input
              value={fleet.gpsRefreshRate}
              onChange={(e) =>
                setFleet({
                  ...fleet,
                  gpsRefreshRate:
                    e.target.value,
                })
              }
              className="settings-input"
              placeholder="GPS Refresh Rate"
            />

            <button
              type="button"
              onClick={saveFleet}
              className="save-button bg-green-600 hover:bg-green-700"
            >
              <FaSave />
              Save Fleet Settings
            </button>

          </div>
        </div>

        {/* ================= NOTIFICATIONS ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">

            <FaBell className="text-yellow-400 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("notificationSettings") ||
                "Notifications"}
            </h2>

          </div>

          <div className="space-y-4">

            <label className="settings-row">

              <span>Email Alerts</span>

              <input
                type="checkbox"
                checked={
                  notifications.emailAlerts
                }
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    emailAlerts:
                      e.target.checked,
                  })
                }
              />

            </label>

            <label className="settings-row">

              <span>SMS Alerts</span>

              <input
                type="checkbox"
                checked={
                  notifications.smsAlerts
                }
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    smsAlerts:
                      e.target.checked,
                  })
                }
              />

            </label>

            <label className="settings-row">

              <span>
                Push Notifications
              </span>

              <input
                type="checkbox"
                checked={
                  notifications.pushNotifications
                }
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    pushNotifications:
                      e.target.checked,
                  })
                }
              />

            </label>

            <label className="settings-row">

              <span>
                Overspeed Alerts
              </span>

              <input
                type="checkbox"
                checked={
                  notifications.overspeedAlerts
                }
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    overspeedAlerts:
                      e.target.checked,
                  })
                }
              />

            </label>

            <label className="settings-row">

              <span>
                Low Fuel Alerts
              </span>

              <input
                type="checkbox"
                checked={
                  notifications.lowFuelAlerts
                }
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    lowFuelAlerts:
                      e.target.checked,
                  })
                }
              />

            </label>

            <button
              type="button"
              onClick={saveNotifications}
              className="save-button bg-yellow-500 hover:bg-yellow-600"
            >
              <FaSave />
              Save Notifications
            </button>

          </div>
        </div>

        {/* ================= DASHBOARD ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">

            <FaChartBar className="text-cyan-400 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("dashboardPreferences") ||
                "Dashboard Preferences"}
            </h2>

          </div>

          <div className="space-y-4">

            <label className="settings-row">

              <span>Show Live Map</span>

              <input
                type="checkbox"
                checked={
                  dashboard.showLiveMap
                }
                onChange={(e) =>
                  setDashboard({
                    ...dashboard,
                    showLiveMap:
                      e.target.checked,
                  })
                }
              />

            </label>

            <label className="settings-row">

              <span>
                Show Fleet Chart
              </span>

              <input
                type="checkbox"
                checked={
                  dashboard.showFleetChart
                }
                onChange={(e) =>
                  setDashboard({
                    ...dashboard,
                    showFleetChart:
                      e.target.checked,
                  })
                }
              />

            </label>

            <label className="settings-row">

              <span>
                Show Vehicle Table
              </span>

              <input
                type="checkbox"
                checked={
                  dashboard.showVehicleTable
                }
                onChange={(e) =>
                  setDashboard({
                    ...dashboard,
                    showVehicleTable:
                      e.target.checked,
                  })
                }
              />

            </label>

            <label className="settings-row">

              <span>
                Show Recent Alerts
              </span>

              <input
                type="checkbox"
                checked={
                  dashboard.showRecentAlerts
                }
                onChange={(e) =>
                  setDashboard({
                    ...dashboard,
                    showRecentAlerts:
                      e.target.checked,
                  })
                }
              />

            </label>

            <button
              type="button"
              onClick={saveDashboard}
              className="save-button bg-cyan-600 hover:bg-cyan-700"
            >
              <FaSave />
              Save Dashboard
            </button>

          </div>
        </div>

        {/* ================= SYSTEM ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">

            <FaGlobe className="text-green-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("systemPreferences") ||
                "System Preferences"}
            </h2>

          </div>

          <div className="space-y-4">

            {/* LANGUAGE */}

            <div>

              <label className="block mb-2 text-slate-400">
                Language
              </label>

              <select
                value={
                  systemPreferences.language
                }
                onChange={(e) =>
                  setSystemPreferences({
                    ...systemPreferences,
                    language:
                      e.target.value,
                  })
                }
                className="settings-input"
              >

                <option value="English">
                  English
                </option>

                <option value="Hindi">
                  Hindi
                </option>

                <option value="Gujarati">
                  Gujarati
                </option>

              </select>

            </div>

            {/* TIMEZONE */}

            <div>

              <label className="block mb-2 text-slate-400">
                Time Zone
              </label>

              <select
                value={
                  systemPreferences.timezone
                }
                onChange={(e) =>
                  setSystemPreferences({
                    ...systemPreferences,
                    timezone:
                      e.target.value,
                  })
                }
                className="settings-input"
              >

                <option value="Asia/Kolkata">
                  Asia/Kolkata
                </option>

                <option value="UTC">
                  UTC
                </option>

              </select>

            </div>

            {/* THEME */}

            <div>

              <label className="block mb-2 text-slate-400">
                Theme
              </label>

              <select
                value={
                  systemPreferences.systemTheme
                }
                onChange={(e) =>
                  setSystemPreferences({
                    ...systemPreferences,
                    systemTheme:
                      e.target.value,
                  })
                }
                className="settings-input"
              >

                <option value="Dark">
                  Dark
                </option>

                <option value="Light">
                  Light
                </option>

              </select>

            </div>

            <button
              type="button"
              onClick={
                saveSystemPreferences
              }
              className="save-button bg-green-600 hover:bg-green-700"
            >
              <FaSave />
              Save Preferences
            </button>

          </div>
        </div>

        {/* ================= BACKUP ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">

            <FaDatabase className="text-purple-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              Backup & Export
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <button
              type="button"
              onClick={() =>
                exportData("vehicles")
              }
              className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white"
            >
              Export Vehicles
            </button>

            <button
              type="button"
              onClick={() =>
                exportData("drivers")
              }
              className="bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white"
            >
              Export Drivers
            </button>

            <button
              type="button"
              onClick={() =>
                exportData("trips")
              }
              className="bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg text-white"
            >
              Export Trips
            </button>

            <button
              type="button"
              onClick={backupDatabase}
              className="bg-purple-600 hover:bg-purple-700 py-3 rounded-lg text-white"
            >
              Backup Database
            </button>

          </div>
        </div>

      </div>

      {/* ================= STYLES ================= */}

      <style>{`

        .settings-card {
          background: ${
            theme === "dark"
              ? "#0f172a"
              : "#ffffff"
          };

          border: 1px solid ${
            theme === "dark"
              ? "#1e293b"
              : "#d1d5db"
          };

          border-radius: 1rem;

          padding: 1.5rem;
        }

        .settings-input {
          width: 100%;

          padding: 0.75rem;

          border-radius: 0.5rem;

          outline: none;

          background: ${
            theme === "dark"
              ? "#1e293b"
              : "#f3f4f6"
          };

          color: ${
            theme === "dark"
              ? "#ffffff"
              : "#111827"
          };

          border: 1px solid ${
            theme === "dark"
              ? "#334155"
              : "#d1d5db"
          };
        }

        .settings-row {
          display: flex;

          align-items: center;

          justify-content: space-between;

          padding: 0.75rem;

          border-radius: 0.5rem;

          background: ${
            theme === "dark"
              ? "#1e293b"
              : "#f3f4f6"
          };
        }

        .settings-row input {
          cursor: pointer;

          width: 18px;

          height: 18px;
        }

        .save-button {
          padding: 0.75rem 1.25rem;

          border-radius: 0.5rem;

          display: flex;

          align-items: center;

          gap: 0.5rem;

          color: white;

          font-weight: 600;

          transition: 0.2s;

          cursor: pointer;
        }

      `}</style>

    </div>
  );
}

export default Settings;