import React, { useState } from 'react';

const settingsContext = React.createContext();

export const SettingsProvider = (props) => {
  let settingsInitialState = {
    contentMinSize: 40,
    contentMaxSize: 60,
    contentColor: { r: 255, g: 255, b: 255, a: 1 },
    headerColor: { r: 255, g: 255, b: 255, a: 1 },
    backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
  };
  const [receiverSettings, setReceiverSettings] =
    useState(settingsInitialState);

  function updateReceiverSettings(value) {
    setReceiverSettings({ ...receiverSettings, ...value });
  }

  return (
    <settingsContext.Provider
      value={{ receiverSettings, updateReceiverSettings }}
    >
      {props.children}
    </settingsContext.Provider>
  );
};

export default settingsContext;
