import React from 'react';
import { useTranslation } from 'react-i18next';
import './Verse.scss';

const Verse = () => {
  const { t } = useTranslation('verse');

  return (
    // <p>{t('CHAPTERS.GENESIS')}</p>
    <article className="verse">
      <section>{t('FORM.VERSE_SEARCH')}</section>
      <section>{t('FORM.SEARCH_RESULT')}</section>
    </article>
  );
};

export default Verse;
