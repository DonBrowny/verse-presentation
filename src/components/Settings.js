import React from 'react';
import ColorButton from './ColorButton';
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

      <h3 className="settings-header">Presentation Settings</h3>
      <div className="settings-content">
        <span>Minimum Font Size</span>
        <input type="number" defaultValue="40" step="1" />
      </div>
      <div className="settings-content">
        <span>Maximum Font Size</span>
        <input type="number" defaultValue="60" step="1" />
      </div>
      <div className="settings-content">
        <span>Background color</span>
        <ColorButton
          onChangeCompleted={(color) => {
            console.log(color);
          }}
        />
      </div>
      <div className="settings-content">
        <span>Header color</span>
        <ColorButton
          onChangeCompleted={(color) => {
            console.log(color);
          }}
        />
      </div>
      <div className="settings-content">
        <span>Content color</span>
        <ColorButton
          onChangeCompleted={(color) => {
            console.log(color);
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
