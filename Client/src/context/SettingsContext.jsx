import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

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
    dashboard: "Dashboard",
    vehicles: "Vehicles",
    drivers: "Drivers",
    trips: "Trips",
    alerts: "Alerts",
    settings: "Settings",
    fleetDash: "FleetDash",
    fleetMonitoring: "Fleet Monitoring",
    fleetDashboard: "Fleet Dashboard",
    monitorFleet: "Monitor all fleet vehicles in real time",
    search: "Search...",
    notifications: "Notifications",
    viewAllAlerts: "View All Alerts",
    admin: "Admin",
    fleetManager: "Fleet Manager",
    logout: "Logout",
    settingsDescription: "Manage your FleetDash system configuration",

    profile: "Profile",
    adminName: "Admin Name",
    email: "Email",
    phone: "Phone",
    saveProfile: "Save Profile",

    security: "Security",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    twoFactor: "Enable Two-Factor Authentication",
    updatePassword: "Update Password",

    fleetSettings: "Fleet Settings",
    defaultSpeed: "Default Speed Limit",
    fuelWarning: "Fuel Warning Level",
    maintenance: "Maintenance Interval",
    gpsRefresh: "GPS Refresh Rate",
    saveFleet: "Save Fleet Settings",

    notificationSettings: "Notifications",
    emailAlerts: "Email Alerts",
    smsAlerts: "SMS Alerts",
    pushNotifications: "Push Notifications",
    overspeedAlerts: "Overspeed Alerts",
    lowFuelAlerts: "Low Fuel Alerts",
    saveNotifications: "Save Notifications",

    dashboardPreferences: "Dashboard Preferences",
    showLiveMap: "Show Live Map",
    showFleetChart: "Show Fleet Chart",
    showVehicleTable: "Show Vehicle Table",
    showRecentAlerts: "Show Recent Alerts",
    saveDashboard: "Save Dashboard",

    systemPreferences: "System Preferences",
    language: "Language",
    timezone: "Time Zone",
    theme: "Theme",
    savePreferences: "Save Preferences",

    backupExport: "Backup & Export",
    exportVehicles: "Export Vehicles",
    exportDrivers: "Export Drivers",
    exportTrips: "Export Trips",
    backupDatabase: "Backup Database",

    english: "English",
    hindi: "Hindi",
    gujarati: "Gujarati",
    dark: "Dark",
    light: "Light",
    utc: "UTC",
    india: "Asia/Kolkata",

    saved: "Settings saved successfully!",
    profileSaved: "Profile saved successfully!",
    fleetSaved: "Fleet settings saved successfully!",
    notificationsSaved: "Notification settings saved successfully!",
    dashboardSaved: "Dashboard preferences saved successfully!",
    passwordUpdated: "Password updated successfully!",
    exported: "Export started successfully!",
    backupStarted: "Database backup started!",
  },

  Hindi: {
    dashboard: "डैशबोर्ड",
    vehicles: "वाहन",
    drivers: "ड्राइवर",
    trips: "यात्राएँ",
    alerts: "अलर्ट",
    settings: "सेटिंग्स",
    fleetDash: "फ्लीटडैश",
    fleetMonitoring: "फ्लीट मॉनिटरिंग",
    fleetDashboard: "फ्लीट डैशबोर्ड",
    monitorFleet: "सभी फ्लीट वाहनों की रियल-टाइम निगरानी करें",
    search: "खोजें...",
    notifications: "सूचनाएँ",
    viewAllAlerts: "सभी अलर्ट देखें",
    admin: "एडमिन",
    fleetManager: "फ्लीट मैनेजर",
    logout: "लॉगआउट",
    settingsDescription: "अपने FleetDash सिस्टम की सेटिंग्स प्रबंधित करें",

    profile: "प्रोफ़ाइल",
    adminName: "एडमिन का नाम",
    email: "ईमेल",
    phone: "फ़ोन",
    saveProfile: "प्रोफ़ाइल सेव करें",

    security: "सुरक्षा",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नया पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    twoFactor: "टू-फैक्टर ऑथेंटिकेशन सक्षम करें",
    updatePassword: "पासवर्ड अपडेट करें",

    fleetSettings: "फ्लीट सेटिंग्स",
    defaultSpeed: "डिफ़ॉल्ट स्पीड लिमिट",
    fuelWarning: "ईंधन चेतावनी स्तर",
    maintenance: "मेंटेनेंस अंतराल",
    gpsRefresh: "GPS रिफ्रेश रेट",
    saveFleet: "फ्लीट सेटिंग्स सेव करें",

    notificationSettings: "सूचनाएँ",
    emailAlerts: "ईमेल अलर्ट",
    smsAlerts: "SMS अलर्ट",
    pushNotifications: "पुश नोटिफिकेशन",
    overspeedAlerts: "ओवरस्पीड अलर्ट",
    lowFuelAlerts: "कम ईंधन अलर्ट",
    saveNotifications: "नोटिफिकेशन सेव करें",

    dashboardPreferences: "डैशबोर्ड प्राथमिकताएँ",
    showLiveMap: "लाइव मैप दिखाएँ",
    showFleetChart: "फ्लीट चार्ट दिखाएँ",
    showVehicleTable: "वाहन तालिका दिखाएँ",
    showRecentAlerts: "हाल के अलर्ट दिखाएँ",
    saveDashboard: "डैशबोर्ड सेव करें",

    systemPreferences: "सिस्टम प्राथमिकताएँ",
    language: "भाषा",
    timezone: "समय क्षेत्र",
    theme: "थीम",
    savePreferences: "प्राथमिकताएँ सेव करें",

    backupExport: "बैकअप और एक्सपोर्ट",
    exportVehicles: "वाहन एक्सपोर्ट करें",
    exportDrivers: "ड्राइवर एक्सपोर्ट करें",
    exportTrips: "ट्रिप एक्सपोर्ट करें",
    backupDatabase: "डेटाबेस बैकअप",

    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    gujarati: "गुजराती",
    dark: "डार्क",
    light: "लाइट",
    utc: "UTC",
    india: "एशिया/कोलकाता",

    saved: "सेटिंग्स सफलतापूर्वक सेव हुईं!",
    profileSaved: "प्रोफ़ाइल सफलतापूर्वक सेव हुई!",
    fleetSaved: "फ्लीट सेटिंग्स सफलतापूर्वक सेव हुईं!",
    notificationsSaved: "नोटिफिकेशन सेटिंग्स सफलतापूर्वक सेव हुईं!",
    dashboardSaved: "डैशबोर्ड प्राथमिकताएँ सफलतापूर्वक सेव हुईं!",
    passwordUpdated: "पासवर्ड सफलतापूर्वक अपडेट हुआ!",
    exported: "एक्सपोर्ट शुरू हो गया!",
    backupStarted: "डेटाबेस बैकअप शुरू हो गया!",
  },

  Gujarati: {
    dashboard: "ડેશબોર્ડ",
    vehicles: "વાહનો",
    drivers: "ડ્રાઇવરો",
    trips: "ટ્રિપ્સ",
    alerts: "એલર્ટ્સ",
    settings: "સેટિંગ્સ",
    fleetDash: "ફ્લીટડેશ",
    fleetMonitoring: "ફ્લીટ મોનિટરિંગ",
    fleetDashboard: "ફ્લીટ ડેશબોર્ડ",
    monitorFleet: "બધા ફ્લીટ વાહનોનું રિયલ-ટાઇમ મોનિટરિંગ કરો",
    search: "શોધો...",
    notifications: "નોટિફિકેશન્સ",
    viewAllAlerts: "બધા એલર્ટ્સ જુઓ",
    admin: "એડમિન",
    fleetManager: "ફ્લીટ મેનેજર",
    logout: "લૉગઆઉટ",
    settingsDescription: "તમારી FleetDash સિસ્ટમ સેટિંગ્સ મેનેજ કરો",

    profile: "પ્રોફાઇલ",
    adminName: "એડમિન નામ",
    email: "ઈમેલ",
    phone: "ફોન",
    saveProfile: "પ્રોફાઇલ સેવ કરો",

    security: "સુરક્ષા",
    currentPassword: "વર્તમાન પાસવર્ડ",
    newPassword: "નવો પાસવર્ડ",
    confirmPassword: "પાસવર્ડની પુષ્ટિ કરો",
    twoFactor: "ટુ-ફેક્ટર ઓથેન્ટિકેશન સક્ષમ કરો",
    updatePassword: "પાસવર્ડ અપડેટ કરો",

    fleetSettings: "ફ્લીટ સેટિંગ્સ",
    defaultSpeed: "ડિફોલ્ટ સ્પીડ લિમિટ",
    fuelWarning: "ફ્યુઅલ વોર્નિંગ લેવલ",
    maintenance: "મેન્ટેનન્સ ઇન્ટરવલ",
    gpsRefresh: "GPS રિફ્રેશ રેટ",
    saveFleet: "ફ્લીટ સેટિંગ્સ સેવ કરો",

    notificationSettings: "નોટિફિકેશન્સ",
    emailAlerts: "ઈમેલ એલર્ટ્સ",
    smsAlerts: "SMS એલર્ટ્સ",
    pushNotifications: "પુશ નોટિફિકેશન્સ",
    overspeedAlerts: "ઓવરસ્પીડ એલર્ટ્સ",
    lowFuelAlerts: "લો ફ્યુઅલ એલર્ટ્સ",
    saveNotifications: "નોટિફિકેશન્સ સેવ કરો",

    dashboardPreferences: "ડેશબોર્ડ પસંદગીઓ",
    showLiveMap: "લાઇવ મેપ બતાવો",
    showFleetChart: "ફ્લીટ ચાર્ટ બતાવો",
    showVehicleTable: "વાહન ટેબલ બતાવો",
    showRecentAlerts: "તાજેતરના એલર્ટ્સ બતાવો",
    saveDashboard: "ડેશબોર્ડ સેવ કરો",

    systemPreferences: "સિસ્ટમ પસંદગીઓ",
    language: "ભાષા",
    timezone: "ટાઇમ ઝોન",
    theme: "થીમ",
    savePreferences: "પસંદગીઓ સેવ કરો",

    backupExport: "બેકઅપ અને એક્સપોર્ટ",
    exportVehicles: "વાહનો એક્સપોર્ટ કરો",
    exportDrivers: "ડ્રાઇવરો એક્સપોર્ટ કરો",
    exportTrips: "ટ્રિપ્સ એક્સપોર્ટ કરો",
    backupDatabase: "ડેટાબેઝ બેકઅપ",

    english: "અંગ્રેજી",
    hindi: "હિન્દી",
    gujarati: "ગુજરાતી",
    dark: "ડાર્ક",
    light: "લાઇટ",
    utc: "UTC",
    india: "Asia/Kolkata",

    saved: "સેટિંગ્સ સફળતાપૂર્વક સેવ થઈ!",
    profileSaved: "પ્રોફાઇલ સફળતાપૂર્વક સેવ થઈ!",
    fleetSaved: "ફ્લીટ સેટિંગ્સ સફળતાપૂર્વક સેવ થઈ!",
    notificationsSaved: "નોટિફિકેશન સેટિંગ્સ સફળતાપૂર્વક સેવ થઈ!",
    dashboardSaved: "ડેશબોર્ડ પસંદગીઓ સફળતાપૂર્વક સેવ થઈ!",
    passwordUpdated: "પાસવર્ડ સફળતાપૂર્વક અપડેટ થયો!",
    exported: "એક્સપોર્ટ શરૂ થયું!",
    backupStarted: "ડેટાબેઝ બેકઅપ શરૂ થયું!",
  },
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("fleetdash_settings");

      if (saved) {
        return {
          ...defaultSettings,
          ...JSON.parse(saved),
        };
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }

    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(
      "fleetdash_settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const updateSettings = (updates) => {
    setSettings((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updateNestedSettings = (section, updates) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates,
      },
    }));
  };

  const t = (key) => {
    return translations[settings.language]?.[key] || translations.English[key] || key;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        updateSettings,
        updateNestedSettings,
        t,
        translations,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}

export default SettingsContext;