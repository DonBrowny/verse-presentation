import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.scss';
import { removeLeadingSlash } from '../utils/utils.js';

const VISIBLE_ROUTES = ['verse', 'lyrics'];
const DEFAULT_LANG = 'en';
const playIcon = '/icons/play-circle.svg'
const pauseIcon = '/icons/pause-circle.svg'
const STATUS = { OPEN: 'open', CLOSE: 'close', PAUSE: 'pause' }

const Header = () => {
  const { i18n } = useTranslation();
  const history = useHistory();

  const initialLocation = removeLeadingSlash(window.location.pathname);
  const checkVisibility = (pathName) => VISIBLE_ROUTES.includes(pathName);

  const [pathName, setPathName] = useState(initialLocation);
  const [isVisible, setVisibility] = useState(checkVisibility(initialLocation));
  const [selectedLang, setLang] = useState(DEFAULT_LANG);
  const [presentationStatus, setPresentationStatus] = useState(STATUS.CLOSE);

  const changeLanguage = (lang) => {
    if (selectedLang === lang) return;
    setLang(lang);
    i18n.changeLanguage(lang);
  };

  function startOrPausePresentation() {
    if (presentationStatus === STATUS.CLOSE) {
      window.PRESENTATION.startPresentation();
      setPresentationStatus(STATUS.OPEN);
      return;
    }
    else if (presentationStatus === STATUS.PAUSE) {
      window.PRESENTATION.reconnectPresentation();
      setPresentationStatus(STATUS.OPEN);
      return;
    }
    window.PRESENTATION.closePresentation();
    setPresentationStatus(STATUS.PAUSE);
  }

  function terminatePresentation() {
    if (presentationStatus === STATUS.OPEN) {
      window.PRESENTATION.terminatePresentation();
      setPresentationStatus(STATUS.CLOSE);
    }
  }

  useEffect(() => {
    return history.listen((location) => {
      const pathname = removeLeadingSlash(location.pathname);
      setPathName(pathname);
      setVisibility(() => {
        return checkVisibility(pathname);
      });
    });
  }, [history]);

  return (
    isVisible && (
      <header className="header">
        <h3>{pathName.toUpperCase()}</h3>
        <span>Language:</span>
        <button
          onClick={() => {
            changeLanguage('en');
          }}
          className={
            'trans-button ripple ' + (selectedLang === 'en' ? 'active' : '')
          }
        >
          Eng
        </button>
        <button
          onClick={() => {
            changeLanguage('ta');
          }}
          className={
            'trans-button ripple ' + (selectedLang === 'ta' ? 'active' : '')
          }
        >
          தமிழ்
        </button>

        <img src={presentationStatus === STATUS.OPEN ? pauseIcon : playIcon} alt="Play Icon" onClick={startOrPausePresentation} />
        <img src="/icons/stop-circle.svg" alt="Play Icon" onClick={terminatePresentation} />
      </header>
    )
  );
};

export default Header;
