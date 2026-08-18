export const formatDateTime = (
  date,
  timezone = "Asia/Kolkata",
  language = "English"
) => {
  if (!date) return "-";

  const localeMap = {
    English: "en-IN",
    Hindi: "hi-IN",
    Gujarati: "gu-IN",
  };

  try {
    return new Intl.DateTimeFormat(
      localeMap[language] || "en-IN",
      {
        timeZone: timezone,
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(new Date(date));
  } catch (error) {
    console.error("Date formatting error:", error);
    return new Date(date).toLocaleString();
  }
};

export const formatTime = (
  date,
  timezone = "Asia/Kolkata",
  language = "English"
) => {
  if (!date) return "-";

  const localeMap = {
    English: "en-IN",
    Hindi: "hi-IN",
    Gujarati: "gu-IN",
  };

  try {
    return new Intl.DateTimeFormat(
      localeMap[language] || "en-IN",
      {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    ).format(new Date(date));
  } catch (error) {
    console.error("Time formatting error:", error);
    return new Date(date).toLocaleTimeString();
  }
};

export const formatDate = (
  date,
  timezone = "Asia/Kolkata",
  language = "English"
) => {
  if (!date) return "-";

  const localeMap = {
    English: "en-IN",
    Hindi: "hi-IN",
    Gujarati: "gu-IN",
  };

  try {
    return new Intl.DateTimeFormat(
      localeMap[language] || "en-IN",
      {
        timeZone: timezone,
        dateStyle: "medium",
      }
    ).format(new Date(date));
  } catch (error) {
    console.error("Date formatting error:", error);
    return new Date(date).toLocaleDateString();
  }
};