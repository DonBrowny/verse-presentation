import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PresentationContext } from '../context/PresentationContext';
import './Header.scss';
import { removeLeadingSlash } from '../utils/utils';
import {
  VISIBLE_ROUTES,
  DEFAULT_LANG,
  PLAY_ICON,
  PAUSE_ICON,
  STATUS,
} from '../utils/constants';

const Header = () => {
  const { i18n } = useTranslation();
  const history = useHistory();

  const initialLocation = removeLeadingSlash(window.location.pathname);
  const checkVisibility = (pathName) => VISIBLE_ROUTES.includes(pathName);

  const [pathName, setPathName] = useState(initialLocation);
  const [isVisible, setVisibility] = useState(checkVisibility(initialLocation));
  const [selectedLang, setLang] = useState(DEFAULT_LANG);
  const [presentationStatus, setPresentationStatus] = useState(STATUS.CLOSE);
  const { availability, startPresentation } = useContext(PresentationContext);

  console.log(availability);

  const changeLanguage = (lang) => {
    if (selectedLang === lang) return;
    setLang(lang);
    i18n.changeLanguage(lang);
  };

  function startOrPausePresentation() {
    if (presentationStatus === STATUS.CLOSE) {
      startPresentation();
      setPresentationStatus(STATUS.OPEN);
      return;
    } else if (presentationStatus === STATUS.PAUSE) {
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
      <header className='header'>
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

        <img
          src={presentationStatus === STATUS.OPEN ? PAUSE_ICON : PLAY_ICON}
          alt='Play Icon'
          onClick={startOrPausePresentation}
        />
        <img
          src='/icons/stop-circle.svg'
          alt='Play Icon'
          onClick={terminatePresentation}
        />
      </header>
    )
  );
};

export default Header;
