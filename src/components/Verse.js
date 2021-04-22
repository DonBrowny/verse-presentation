import React from 'react';
import { useTranslation } from 'react-i18next';

const Verse = () => {
  const { t, i18n } = useTranslation('verse');
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <h2>Verse</h2>
      <div onChange={changeLanguage}>
        <input type="radio" value="en" name="language" defaultChecked /> English
        <input type="radio" value="ta" name="language" /> Tamil
      </div>
      <p>{t('CHAPTERS.GENESIS')}</p>
    </div>
  );
};

export default Verse;
