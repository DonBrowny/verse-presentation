import React, { useContext } from 'react';
import ColorButton from './ColorButton';
import settingsContext from '../context/settingsContext';
import './Settings.scss';
import { DISPLAY_TYPE } from '../utils/constants';

const Settings = () => {
  const { updateReceiverSettings } = useContext(settingsContext);

  function onSettingsChange(setting) {
    updateReceiverSettings(setting);
    let message = {
      type: DISPLAY_TYPE.SETTINGS,
      data: setting
    }
    window.PRESENTATION.sendMessage(JSON.stringify(message))
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
            onSettingsChange({ backgroundColor: color });
          }}
        />
      </div>
      <div className="settings-content">
        <span>Header color</span>
        <ColorButton
          onChangeCompleted={(color) => {
            onSettingsChange({ headerColor: color });
          }}
        />
      </div>
      <div className="settings-content">
        <span>Content color</span>
        <ColorButton
          onChangeCompleted={(color) => {
            onSettingsChange({ contentColor: color });
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
