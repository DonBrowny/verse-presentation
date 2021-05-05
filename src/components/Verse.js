import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Verse.scss';
import List from './List';
import { fetchData, createArray } from '../utils/utils';

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
  const { t, i18n } = useTranslation('verse');
  const [form, setForm] = useState({ book: '', chapter: '', verse: '' });
  const [book, setBook] = useState({});
  const [chapterList, setChapterList] = useState([]);
  const [verseList, setVerseList] = useState([]);

  const fetchBook = (path) => {
    fetchData(`${i18n.language}/${path}`).then((data) => {
      setBook(data);
      setChapterList(data.Chapter);
      setVerseList([]);
    });
  };

  const onFormChange = (key, value) => {
    switch (key) {
      case 'book':
        fetchBook(value);
        break;

      case 'chapter':
        setVerseList(book.Chapter[value].Verse);
        break;

      default:
        break;
    }
    setForm({ ...form, ...{ [key]: value } });
  };

  const transChapters = () => {
    return CHAPTERS.map((chap) => 'CHAPTERS.' + chap);
  };

  return (
    <article className="verse flex-stretch">
      <section className="verse-search">
        <h3>{t('FORM.VERSE_SEARCH')}</h3>
        <span>{t('FORM.BOOK')}:</span>
        <span>{t('FORM.CHAPTER')}:</span>
        <span>{t('FORM.VERSE')}:</span>
        <List
          listId="book"
          items={transChapters()}
          translation="true"
          selected={form.book}
          onSelectionChange={onFormChange}
        />
        <List
          listId="chapter"
          items={chapterList.length}
          selected={form.chapter}
          onSelectionChange={onFormChange}
        />
        <List
          listId="verse"
          items={verseList.length}
          selected={form.verse}
          onSelectionChange={onFormChange}
        />
      </section>
      <section className="verse-result">
        <h3>{t('FORM.SEARCH_RESULT')}</h3>
      </section>
    </article>
  );
};

export default Verse;
