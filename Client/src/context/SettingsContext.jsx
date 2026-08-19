import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

const defaultSettings = {
  language: "English",
  timezone: "Asia/Kolkata",
  systemTheme: "Dark",

  profile: {
    name: "Admin",
    email: "admin@fleetdash.com",
    phone: "+91 9876543210",
  },

  fleet: {
    speedLimit: "80 km/h",
    fuelWarning: "20%",
    maintenanceInterval: "5000 KM",
    gpsRefreshRate: "5 sec",
  },

  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    overspeedAlerts: true,
    lowFuelAlerts: true,
  },

  dashboard: {
    showLiveMap: true,
    showFleetChart: true,
    showVehicleTable: true,
    showRecentAlerts: true,
  },
};

const translations = {
  English: {
    settings: "Settings",
    settingsDescription: "Manage your FleetDash system configuration",

    profile: "Profile",
    security: "Security",
    fleetSettings: "Fleet Settings",
    notificationSettings: "Notifications",
    dashboardPreferences: "Dashboard Preferences",
    systemPreferences: "System Preferences",
    backupExport: "Backup & Export",

    adminName: "Admin Name",
    email: "Email",
    phone: "Phone",

    saveProfile: "Save Profile",

    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    twoFactor: "Enable Two-Factor Authentication",
    updatePassword: "Update Password",

    defaultSpeed: "Default Speed Limit",
    fuelWarning: "Fuel Warning Level",
    maintenance: "Maintenance Interval",
    gpsRefresh: "GPS Refresh Rate",
    saveFleet: "Save Fleet Settings",

    emailAlerts: "Email Alerts",
    smsAlerts: "SMS Alerts",
    pushNotifications: "Push Notifications",
    overspeedAlerts: "Overspeed Alerts",
    lowFuelAlerts: "Low Fuel Alerts",
    saveNotifications: "Save Notifications",

    showLiveMap: "Show Live Map",
    showFleetChart: "Show Fleet Chart",
    showVehicleTable: "Show Vehicle Table",
    showRecentAlerts: "Show Recent Alerts",
    saveDashboard: "Save Dashboard",

    language: "Language",
    timezone: "Time Zone",
    theme: "Theme",

    english: "English",
    hindi: "Hindi",
    gujarati: "Gujarati",

    dark: "Dark",
    light: "Light",

    savePreferences: "Save Preferences",

    exportVehicles: "Export Vehicles",
    exportDrivers: "Export Drivers",
    exportTrips: "Export Trips",
    backupDatabase: "Backup Database",

    profileSaved: "Profile saved successfully!",
    passwordUpdated: "Password updated successfully!",
    fleetSaved: "Fleet settings saved successfully!",
    notificationsSaved: "Notification settings saved successfully!",
    dashboardSaved: "Dashboard preferences saved successfully!",
    systemSaved: "System preferences saved successfully!",
    exported: "Data exported successfully!",
    backupStarted: "Database backup created successfully!",
  },

  Hindi: {
    settings: "सेटिंग्स",
    settingsDescription: "FleetDash सिस्टम कॉन्फ़िगरेशन प्रबंधित करें",

    profile: "प्रोफ़ाइल",
    security: "सुरक्षा",
    fleetSettings: "फ्लीट सेटिंग्स",
    notificationSettings: "सूचनाएं",
    dashboardPreferences: "डैशबोर्ड प्राथमिकताएं",
    systemPreferences: "सिस्टम प्राथमिकताएं",
    backupExport: "बैकअप और एक्सपोर्ट",

    adminName: "एडमिन नाम",
    email: "ईमेल",
    phone: "फोन",

    saveProfile: "प्रोफ़ाइल सेव करें",

    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नया पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    twoFactor: "Two-Factor Authentication सक्षम करें",
    updatePassword: "पासवर्ड अपडेट करें",

    defaultSpeed: "डिफ़ॉल्ट स्पीड लिमिट",
    fuelWarning: "फ्यूल वार्निंग लेवल",
    maintenance: "मेंटेनेंस इंटरवल",
    gpsRefresh: "GPS रिफ्रेश रेट",
    saveFleet: "फ्लीट सेटिंग्स सेव करें",

    emailAlerts: "ईमेल अलर्ट",
    smsAlerts: "SMS अलर्ट",
    pushNotifications: "पुश नोटिफिकेशन",
    overspeedAlerts: "ओवरस्पीड अलर्ट",
    lowFuelAlerts: "लो फ्यूल अलर्ट",
    saveNotifications: "नोटिफिकेशन सेव करें",

    showLiveMap: "लाइव मैप दिखाएं",
    showFleetChart: "फ्लीट चार्ट दिखाएं",
    showVehicleTable: "व्हीकल टेबल दिखाएं",
    showRecentAlerts: "हाल के अलर्ट दिखाएं",
    saveDashboard: "डैशबोर्ड सेव करें",

    language: "भाषा",
    timezone: "समय क्षेत्र",
    theme: "थीम",

    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    gujarati: "गुजराती",

    dark: "डार्क",
    light: "लाइट",

    savePreferences: "प्राथमिकताएं सेव करें",

    exportVehicles: "व्हीकल एक्सपोर्ट करें",
    exportDrivers: "ड्राइवर एक्सपोर्ट करें",
    exportTrips: "ट्रिप एक्सपोर्ट करें",
    backupDatabase: "डेटाबेस बैकअप",

    profileSaved: "प्रोफ़ाइल सफलतापूर्वक सेव हुई!",
    passwordUpdated: "पासवर्ड सफलतापूर्वक अपडेट हुआ!",
    fleetSaved: "फ्लीट सेटिंग्स सफलतापूर्वक सेव हुई!",
    notificationsSaved: "नोटिफिकेशन सेटिंग्स सफलतापूर्वक सेव हुई!",
    dashboardSaved: "डैशबोर्ड प्राथमिकताएं सफलतापूर्वक सेव हुईं!",
    systemSaved: "सिस्टम प्राथमिकताएं सफलतापूर्वक सेव हुईं!",
    exported: "डेटा सफलतापूर्वक एक्सपोर्ट हुआ!",
    backupStarted: "डेटाबेस बैकअप सफलतापूर्वक बनाया गया!",
  },

  Gujarati: {
    settings: "સેટિંગ્સ",
    settingsDescription: "FleetDash સિસ્ટમ કન્ફિગરેશન મેનેજ કરો",

    profile: "પ્રોફાઇલ",
    security: "સિક્યુરિટી",
    fleetSettings: "ફ્લીટ સેટિંગ્સ",
    notificationSettings: "નોટિફિકેશન",
    dashboardPreferences: "ડેશબોર્ડ પસંદગીઓ",
    systemPreferences: "સિસ્ટમ પસંદગીઓ",
    backupExport: "બેકઅપ અને એક્સપોર્ટ",

    adminName: "એડમિન નામ",
    email: "ઇમેઇલ",
    phone: "ફોન",

    saveProfile: "પ્રોફાઇલ સેવ કરો",

    currentPassword: "વર્તમાન પાસવર્ડ",
    newPassword: "નવો પાસવર્ડ",
    confirmPassword: "પાસવર્ડ કન્ફર્મ કરો",
    twoFactor: "Two-Factor Authentication ચાલુ કરો",
    updatePassword: "પાસવર્ડ અપડેટ કરો",

    defaultSpeed: "ડિફોલ્ટ સ્પીડ લિમિટ",
    fuelWarning: "ફ્યુઅલ વોર્નિંગ લેવલ",
    maintenance: "મેન્ટેનન્સ ઇન્ટરવલ",
    gpsRefresh: "GPS રિફ્રેશ રેટ",
    saveFleet: "ફ્લીટ સેટિંગ્સ સેવ કરો",

    emailAlerts: "ઇમેઇલ એલર્ટ",
    smsAlerts: "SMS એલર્ટ",
    pushNotifications: "પુશ નોટિફિકેશન",
    overspeedAlerts: "ઓવરસ્પીડ એલર્ટ",
    lowFuelAlerts: "લો ફ્યુઅલ એલર્ટ",
    saveNotifications: "નોટિફિકેશન સેવ કરો",

    showLiveMap: "લાઇવ મેપ બતાવો",
    showFleetChart: "ફ્લીટ ચાર્ટ બતાવો",
    showVehicleTable: "વ્હીકલ ટેબલ બતાવો",
    showRecentAlerts: "તાજેતરના એલર્ટ બતાવો",
    saveDashboard: "ડેશબોર્ડ સેવ કરો",

    language: "ભાષા",
    timezone: "ટાઇમ ઝોન",
    theme: "થીમ",

    english: "અંગ્રેજી",
    hindi: "હિન્દી",
    gujarati: "ગુજરાતી",

    dark: "ડાર્ક",
    light: "લાઇટ",

    savePreferences: "પસંદગીઓ સેવ કરો",

    exportVehicles: "વ્હીકલ એક્સપોર્ટ કરો",
    exportDrivers: "ડ્રાઇવર એક્સપોર્ટ કરો",
    exportTrips: "ટ્રિપ એક્સપોર્ટ કરો",
    backupDatabase: "ડેટાબેઝ બેકઅપ",

    profileSaved: "પ્રોફાઇલ સફળતાપૂર્વક સેવ થઈ!",
    passwordUpdated: "પાસવર્ડ સફળતાપૂર્વક અપડેટ થયો!",
    fleetSaved: "ફ્લીટ સેટિંગ્સ સફળતાપૂર્વક સેવ થઈ!",
    notificationsSaved: "નોટિફિકેશન સેટિંગ્સ સફળતાપૂર્વક સેવ થઈ!",
    dashboardSaved: "ડેશબોર્ડ પસંદગીઓ સફળતાપૂર્વક સેવ થઈ!",
    systemSaved: "સિસ્ટમ પસંદગીઓ સફળતાપૂર્વક સેવ થઈ!",
    exported: "ડેટા સફળતાપૂર્વક એક્સપોર્ટ થયો!",
    backupStarted: "ડેટાબેઝ બેકઅપ સફળતાપૂર્વક બનાવાયો!",
  },
};

function loadSettings() {
  try {
    const saved = localStorage.getItem("fleetdash_settings");

    if (!saved) {
      return defaultSettings;
    }

    const parsed = JSON.parse(saved);

    return {
      ...defaultSettings,
      ...parsed,

      profile: {
        ...defaultSettings.profile,
        ...(parsed.profile || {}),
      },

      fleet: {
        ...defaultSettings.fleet,
        ...(parsed.fleet || {}),
      },

      notifications: {
        ...defaultSettings.notifications,
        ...(parsed.notifications || {}),
      },

      dashboard: {
        ...defaultSettings.dashboard,
        ...(parsed.dashboard || {}),
      },
    };
  } catch (error) {
    console.error("Could not load settings:", error);
    return defaultSettings;
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem(
      "fleetdash_settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings((previous) => ({
      ...previous,
      ...newSettings,
    }));
  };

  const updateNestedSettings = (section, values) => {
    setSettings((previous) => ({
      ...previous,
      [section]: {
        ...(previous[section] || {}),
        ...values,
      },
    }));
  };

  const t = (key) => {
    const language = settings.language || "English";

    return (
      translations[language]?.[key] ||
      translations.English?.[key] ||
      key
    );
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("fleetdash_settings");
  };

  // THIS IS THE IMPORTANT PART
  const contextValue = {
    settings,
    updateSettings,
    updateNestedSettings,
    resetSettings,
    t,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings() must be used inside <SettingsProvider>"
    );
  }

  return context;
}

export default SettingsContext;