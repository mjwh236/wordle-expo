import React, { useState, useEffect } from "react";

const INITIAL_SETTINGS = {
  correct: "lightgreen",
  found: "lightyellow",
  absent: "gray",
};

export const SettingsContext = React.createContext({});

const SettingsProvider = ({ children }) => {
  const [appSettings, setAppSettings] = useState(INITIAL_SETTINGS);

  const setSettings = (key, value) => {
    const mergedSettings = {
      ...appSettings,
      [key]: value,
    };

    setAppSettings(mergedSettings);
    AsyncStorage.setItem("STORAGE_KEYS", JSON.stringify(mergedSettings));
  };

  useEffect(() => {
    AsyncStorage.getItem("STORAGE_KEYS").then((data) => {
      if (data) {
        setAppSettings(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    if (appSettings !== INITIAL_SETTINGS) {
      AsyncStorage.setItem("STORAGE_KEYS", JSON.stringify(appSettings));
    }
  }, [appSettings]);

  return (
    <SettingsContext.Provider value={{ appSettings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
