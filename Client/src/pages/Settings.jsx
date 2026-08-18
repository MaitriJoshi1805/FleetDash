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
  const { settings, updateSettings, updateNestedSettings, t } =
    useSettings();

  const { theme, toggleTheme } = useTheme();

  const [message, setMessage] = useState("");

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // ================= PROFILE =================

  const [profile, setProfile] = useState(settings.profile);

  const saveProfile = () => {
    updateSettings({
      profile,
    });

    showMessage(t("profileSaved"));
  };

  // ================= PASSWORD =================

  const updatePassword = () => {
    if (!passwords.current || !passwords.newPassword) {
      alert("Please fill all password fields.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    showMessage(t("passwordUpdated"));
  };

  // ================= FLEET =================

  const [fleet, setFleet] = useState(settings.fleet);

  const saveFleet = () => {
    updateNestedSettings("fleet", fleet);
    showMessage(t("fleetSaved"));
  };

  // ================= NOTIFICATIONS =================

  const [notifications, setNotifications] = useState(
    settings.notifications
  );

  const saveNotifications = () => {
    updateNestedSettings("notifications", notifications);
    showMessage(t("notificationsSaved"));
  };

  // ================= DASHBOARD =================

  const [dashboard, setDashboard] = useState(
    settings.dashboard
  );

  const saveDashboard = () => {
    updateNestedSettings("dashboard", dashboard);
    showMessage(t("dashboardSaved"));
  };

  // ================= SYSTEM =================

  const [systemPreferences, setSystemPreferences] = useState({
    language: settings.language,
    timezone: settings.timezone,
    systemTheme: settings.systemTheme,
  });

  const saveSystemPreferences = () => {
    updateSettings({
      language: systemPreferences.language,
      timezone: systemPreferences.timezone,
      systemTheme: systemPreferences.systemTheme,
    });

    // Change actual application theme
    if (
      systemPreferences.systemTheme === "Dark" &&
      theme !== "dark"
    ) {
      toggleTheme();
    }

    if (
      systemPreferences.systemTheme === "Light" &&
      theme !== "light"
    ) {
      toggleTheme();
    }

    showMessage(
      systemPreferences.language === "English"
        ? "System preferences saved successfully!"
        : systemPreferences.language === "Hindi"
        ? "सिस्टम प्राथमिकताएँ सफलतापूर्वक सेव हुईं!"
        : "સિસ્ટમ પસંદગીઓ સફળતાપૂર્વક સેવ થઈ!"
    );
  };

  // ================= EXPORT =================

  const exportData = (type) => {
    const data = {
      type,
      exportedAt: new Date().toISOString(),
      settings,
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${type}-export.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showMessage(t("exported"));
  };

  const backupDatabase = () => {
    const backup = {
      createdAt: new Date().toISOString(),
      application: "FleetDash",
      settings,
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "fleetdash-backup.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showMessage(t("backupStarted"));
  };

  return (
    <div
      className={`space-y-6 ${
        theme === "dark"
          ? "text-white"
          : "text-gray-900"
      }`}
    >
      {/* ================= MESSAGE ================= */}

      {message && (
        <div className="fixed top-24 right-6 z-[99999] bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg">
          {message}
        </div>
      )}

      {/* ================= HEADING ================= */}

      <div>
        <h1 className="text-3xl font-bold">
          {t("settings")}
        </h1>

        <p
          className={
            theme === "dark"
              ? "text-slate-400"
              : "text-gray-600"
          }
        >
          {t("settingsDescription")}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ================= PROFILE ================= */}

        <div className="settings-card">
          <div className="flex items-center gap-3 mb-5">
            <FaUser className="text-blue-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("profile")}
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
              placeholder={t("adminName")}
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
              placeholder={t("email")}
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
              placeholder={t("phone")}
            />

            <button
              onClick={saveProfile}
              className="save-button bg-blue-600 hover:bg-blue-700"
            >
              <FaSave />
              {t("saveProfile")}
            </button>

          </div>
        </div>

        {/* ================= SECURITY ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">
            <FaLock className="text-red-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("security")}
            </h2>
          </div>

          <div className="space-y-4">

            <input
              type="password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  current: e.target.value,
                })
              }
              placeholder={t("currentPassword")}
              className="settings-input"
            />

            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value,
                })
              }
              placeholder={t("newPassword")}
              className="settings-input"
            />

            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirm: e.target.value,
                })
              }
              placeholder={t("confirmPassword")}
              className="settings-input"
            />

            <label className="settings-row">
              <span>{t("twoFactor")}</span>

              <input
                type="checkbox"
                defaultChecked
              />
            </label>

            <button
              onClick={updatePassword}
              className="save-button bg-red-600 hover:bg-red-700"
            >
              <FaSave />
              {t("updatePassword")}
            </button>

          </div>
        </div>

        {/* ================= FLEET ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">
            <FaTruck className="text-green-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("fleetSettings")}
            </h2>
          </div>

          <div className="space-y-4">

            <input
              value={fleet.speedLimit}
              onChange={(e) =>
                setFleet({
                  ...fleet,
                  speedLimit: e.target.value,
                })
              }
              className="settings-input"
              placeholder={t("defaultSpeed")}
            />

            <input
              value={fleet.fuelWarning}
              onChange={(e) =>
                setFleet({
                  ...fleet,
                  fuelWarning: e.target.value,
                })
              }
              className="settings-input"
              placeholder={t("fuelWarning")}
            />

            <input
              value={fleet.maintenanceInterval}
              onChange={(e) =>
                setFleet({
                  ...fleet,
                  maintenanceInterval: e.target.value,
                })
              }
              className="settings-input"
              placeholder={t("maintenance")}
            />

            <input
              value={fleet.gpsRefreshRate}
              onChange={(e) =>
                setFleet({
                  ...fleet,
                  gpsRefreshRate: e.target.value,
                })
              }
              className="settings-input"
              placeholder={t("gpsRefresh")}
            />

            <button
              onClick={saveFleet}
              className="save-button bg-green-600 hover:bg-green-700"
            >
              <FaSave />
              {t("saveFleet")}
            </button>

          </div>
        </div>

        {/* ================= NOTIFICATIONS ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">
            <FaBell className="text-yellow-400 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("notificationSettings")}
            </h2>
          </div>

          <div className="space-y-4">

            <label className="settings-row">
              <span>{t("emailAlerts")}</span>

              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    emailAlerts: e.target.checked,
                  })
                }
              />
            </label>

            <label className="settings-row">
              <span>{t("smsAlerts")}</span>

              <input
                type="checkbox"
                checked={notifications.smsAlerts}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    smsAlerts: e.target.checked,
                  })
                }
              />
            </label>

            <label className="settings-row">
              <span>{t("pushNotifications")}</span>

              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    pushNotifications: e.target.checked,
                  })
                }
              />
            </label>

            <label className="settings-row">
              <span>{t("overspeedAlerts")}</span>

              <input
                type="checkbox"
                checked={notifications.overspeedAlerts}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    overspeedAlerts: e.target.checked,
                  })
                }
              />
            </label>

            <label className="settings-row">
              <span>{t("lowFuelAlerts")}</span>

              <input
                type="checkbox"
                checked={notifications.lowFuelAlerts}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    lowFuelAlerts: e.target.checked,
                  })
                }
              />
            </label>

            <button
              onClick={saveNotifications}
              className="save-button bg-yellow-500 hover:bg-yellow-600"
            >
              <FaSave />
              {t("saveNotifications")}
            </button>

          </div>
        </div>

        {/* ================= DASHBOARD ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">

            <FaChartBar className="text-cyan-400 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("dashboardPreferences")}
            </h2>

          </div>

          <div className="space-y-4">

            <label className="settings-row">
              <span>{t("showLiveMap")}</span>

              <input
                type="checkbox"
                checked={dashboard.showLiveMap}
                onChange={(e) =>
                  setDashboard({
                    ...dashboard,
                    showLiveMap: e.target.checked,
                  })
                }
              />
            </label>

            <label className="settings-row">
              <span>{t("showFleetChart")}</span>

              <input
                type="checkbox"
                checked={dashboard.showFleetChart}
                onChange={(e) =>
                  setDashboard({
                    ...dashboard,
                    showFleetChart: e.target.checked,
                  })
                }
              />
            </label>

            <label className="settings-row">
              <span>{t("showVehicleTable")}</span>

              <input
                type="checkbox"
                checked={dashboard.showVehicleTable}
                onChange={(e) =>
                  setDashboard({
                    ...dashboard,
                    showVehicleTable: e.target.checked,
                  })
                }
              />
            </label>

            <label className="settings-row">
              <span>{t("showRecentAlerts")}</span>

              <input
                type="checkbox"
                checked={dashboard.showRecentAlerts}
                onChange={(e) =>
                  setDashboard({
                    ...dashboard,
                    showRecentAlerts: e.target.checked,
                  })
                }
              />
            </label>

            <button
              onClick={saveDashboard}
              className="save-button bg-cyan-600 hover:bg-cyan-700"
            >
              <FaSave />
              {t("saveDashboard")}
            </button>

          </div>
        </div>

        {/* ================= SYSTEM ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">

            <FaGlobe className="text-green-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("systemPreferences")}
            </h2>

          </div>

          <div className="space-y-4">

            {/* LANGUAGE */}

            <div>
              <label className="block mb-2 text-slate-400">
                {t("language")}
              </label>

              <select
                value={systemPreferences.language}
                onChange={(e) =>
                  setSystemPreferences({
                    ...systemPreferences,
                    language: e.target.value,
                  })
                }
                className="settings-input"
              >
                <option value="English">
                  {t("english")}
                </option>

                <option value="Hindi">
                  {t("hindi")}
                </option>

                <option value="Gujarati">
                  {t("gujarati")}
                </option>
              </select>
            </div>

            {/* TIMEZONE */}

            <div>
              <label className="block mb-2 text-slate-400">
                {t("timezone")}
              </label>

              <select
                value={systemPreferences.timezone}
                onChange={(e) =>
                  setSystemPreferences({
                    ...systemPreferences,
                    timezone: e.target.value,
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
                {t("theme")}
              </label>

              <select
                value={systemPreferences.systemTheme}
                onChange={(e) =>
                  setSystemPreferences({
                    ...systemPreferences,
                    systemTheme: e.target.value,
                  })
                }
                className="settings-input"
              >
                <option value="Dark">
                  {t("dark")}
                </option>

                <option value="Light">
                  {t("light")}
                </option>
              </select>
            </div>

            <button
              onClick={saveSystemPreferences}
              className="save-button bg-green-600 hover:bg-green-700"
            >
              <FaSave />
              {t("savePreferences")}
            </button>

          </div>
        </div>

        {/* ================= BACKUP ================= */}

        <div className="settings-card">

          <div className="flex items-center gap-3 mb-5">

            <FaDatabase className="text-purple-500 text-2xl" />

            <h2 className="text-xl font-semibold">
              {t("backupExport")}
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <button
              onClick={() =>
                exportData("vehicles")
              }
              className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
            >
              {t("exportVehicles")}
            </button>

            <button
              onClick={() =>
                exportData("drivers")
              }
              className="bg-green-600 hover:bg-green-700 py-3 rounded-lg"
            >
              {t("exportDrivers")}
            </button>

            <button
              onClick={() =>
                exportData("trips")
              }
              className="bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg"
            >
              {t("exportTrips")}
            </button>

            <button
              onClick={backupDatabase}
              className="bg-purple-600 hover:bg-purple-700 py-3 rounded-lg"
            >
              {t("backupDatabase")}
            </button>

          </div>
        </div>

      </div>

      {/* ================= LOCAL STYLES ================= */}

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

        .save-button {
          padding: 0.75rem 1.25rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          font-weight: 600;
          transition: 0.2s;
        }
      `}</style>
    </div>
  );
}

export default Settings;