import React from 'react';
import './Settings.scss';

const Settings = () => {
  return (
    <div className="settings">
      <h3 className="settings-header">Verse Settings</h3>
      <div className="settings-content">
        <span>Default Language</span>
        <select>
          <option>English</option>
          <option>தமிழ்</option>
        </select>
      </div>
      <h3 className="settings-header">Lyrics Settings</h3>
      <div className="settings-content">
        <span>Default Language</span>
        <select>
          <option>English</option>
          <option>தமிழ்</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
