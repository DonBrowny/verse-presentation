import React, { useState } from 'react';
import { getFromStorage, saveToStorage } from '../utils/utils';
import ColorButton from './ColorButton';
import './Settings.scss';

const Settings = () => {
  const [receiverSettings, setReceiverSettings] = useState(
    getFromStorage('receiverSettings')
  );

  function onSettingsChange(setting) {
    setReceiverSettings({ ...receiverSettings, ...setting });
  }

  function saveChanges() {
    saveToStorage('receiverSettings', receiverSettings);
  }

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
        <input
          type="number"
          value={receiverSettings.contentMinSize}
          step="1"
          onChange={(event) => {
            onSettingsChange({ contentMinSize: parseInt(event.target.value) });
          }}
        />
      </div>
      <div className="settings-content">
        <span>Maximum Font Size</span>
        <input
          type="number"
          value={receiverSettings.contentMaxSize}
          step="1"
          onChange={(event) => {
            onSettingsChange({ contentMaxSize: parseInt(event.target.value) });
          }}
        />
      </div>
      <div className="settings-content">
        <span>Background color</span>
        <ColorButton
          selectedColor={receiverSettings.backgroundColor}
          onChangeCompleted={(color) => {
            onSettingsChange({ backgroundColor: color });
          }}
        />
      </div>
      <div className="settings-content">
        <span>Header color</span>
        <ColorButton
          selectedColor={receiverSettings.headerColor}
          onChangeCompleted={(color) => {
            onSettingsChange({ headerColor: color });
          }}
        />
      </div>
      <div className="settings-content">
        <span>Content color</span>
        <ColorButton
          selectedColor={receiverSettings.contentColor}
          onChangeCompleted={(color) => {
            onSettingsChange({ contentColor: color });
          }}
        />
      </div>
      <div className="settings-header">
        <button onClick={saveChanges}>Save</button>
      </div>
    </div>
  );
};

export default Settings;
