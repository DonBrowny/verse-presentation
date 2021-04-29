import React from 'react';
import { useTranslation } from 'react-i18next';

const Verse = () => {
  const { t } = useTranslation('verse');

  return (
    <div>
      <h2>Verse</h2>
      <p>{t('CHAPTERS.GENESIS')}</p>
    </div>
  );
};

export default Verse;
