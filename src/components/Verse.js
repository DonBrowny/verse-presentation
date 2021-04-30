import React from 'react';
import { useTranslation } from 'react-i18next';
import './Verse.scss';
import List from './List';

const CHAPTERS = [
  'GENESIS',
  'EXODUS',
  'LEVITICUS',
  'NUMBERS',
  'DEUTERONOMY',
  'JOSHUA',
  'JUDGES',
  'RUTH',
  '1SAMUEL',
  '2SAMUEL',
  '1KINGS',
  '2KINGS',
  '1CHRONICLES',
  '2CHRONICLES',
  'EZRA',
  'NEHEMIAH',
  'ESTHER',
  'JOB',
  'PSALMS',
  'PROVERBS',
  'ECCLESIASTES',
  'SONG OF SOLOMON',
  'ISAIAH',
  'JEREMIAH',
  'LAMENTATIONS',
  'EZEKIEL',
  'DANIEL',
  'HOSEA',
  'JOEL',
  'AMOS',
  'OBADIAH',
  'JONAH',
  'MICAH',
  'NAHUM',
  'HABAKKUK',
  'ZEPHANIAH',
  'HAGGAI',
  'ZECHARIAH',
  'MALACHI',
  'MATTHEW',
  'MARK',
  'LUKE',
  'JOHN',
  'ACTS',
  'ROMANS',
  '1CORINTHIANS',
  '2CORINTHIANS',
  'GALATIANS',
  'EPHESIANS',
  'PHILIPPIANS',
  'COLOSSIANS',
  '1THESSALONIANS',
  '2THESSALONIANS',
  '1TIMOTHY',
  '2TIMOTHY',
  'TITUS',
  'PHILEMON',
  'HEBREWS',
  'JAMES',
  '1PETER',
  '2PETER',
  '1JOHN',
  '2JOHN',
  '3JOHN',
  'JUDE',
  'REVELATION',
];

const Verse = () => {
  const { t } = useTranslation('verse');

  const transChapters = () => {
    return CHAPTERS.map((chap) => 'CHAPTERS.' + chap);
  };

  return (
    // <p>{t('CHAPTERS.GENESIS')}</p>
    <article className="verse">
      <section>
        <h3>{t('FORM.VERSE_SEARCH')}</h3>
        <List items={transChapters()} translation="true" />
      </section>
      <section>{t('FORM.SEARCH_RESULT')}</section>
    </article>
  );
};

export default Verse;
