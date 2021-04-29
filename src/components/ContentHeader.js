import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ContentHeader.scss';
import { removeLeadingSlash } from '../utils/utils.js';

const VISIBLE_ROUTES = ['verse', 'lyrics'];
const DEFAULT_LANG = 'en';

const ContentHeader = () => {
  const { i18n } = useTranslation();
  const history = useHistory();

  const initialLocation = removeLeadingSlash(window.location.pathname);
  const checkVisibility = (pathName) => VISIBLE_ROUTES.includes(pathName);

  const [pathName, setPathName] = useState(initialLocation);
  const [isVisible, setVisibility] = useState(checkVisibility(initialLocation));
  const [selectedLang, setLang] = useState(DEFAULT_LANG);

  const changeLanguage = (lang) => {
    if (selectedLang === lang) return;
    setLang(lang);
    i18n.changeLanguage(lang);
  };

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
      <header className="content-header">
        <span>COMMON.{pathName.toUpperCase()}</span>
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

        <img src="/icons/play-circle.svg" alt="Play Icon" />
        <img src="/icons/stop-circle.svg" alt="Play Icon" />
      </header>
    )
  );
};

export default ContentHeader;
