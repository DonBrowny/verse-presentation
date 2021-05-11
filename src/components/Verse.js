import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Verse.scss';
import List from './List';
import { fetchData } from '../utils/utils';

const BOOKS = [
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
  const refs = useRef([]);
  const { t, i18n } = useTranslation('verse');

  const [data, setData] = useState({});
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const transBook = BOOKS.map((chap) => 'CHAPTERS.' + chap);

  const arrayToDiv = (resultList) => {
    if (resultList.length && resultList.length > 0) {
      return resultList.map((verse, index) => {
        return (
          <div
            key={verse.index}
            data-verse={index}
            ref={(element) => {
              refs.current[index] = element;
            }}
            className="card"
          >
            <b>{index + 1}.</b> {verse.Verse}
          </div>
        );
      });
    }
  };

  useEffect(() => {
    let cancel = false;
    if (!book) return;
    fetchData(`${i18n.language}/${book}`).then((data) => {
      if (cancel) return
      setData(data);
    });
    return () => cancel = true;
  }, [book, i18n.language])

  useEffect(() => {
    let result = data.Chapter && chapter ? data.Chapter[chapter].Verse : '';
    setSearchResult(result)
  }, [data, chapter])

  const onFormChange = (key, value) => {
    switch (key) {
      case 'book':
        setBook(value);
        setChapter('');
        break;

      case 'chapter':
        setChapter(value);
        break;

      case 'verse':
        setTimeout(() => {
          refs.current[value].scrollIntoView({ behavior: 'smooth' });
        });
        break;

      default:
        break;
    }
  };

  const searchSelect = (event) => {
    let verse = event.target.getAttribute('data-verse');
    console.log(verse);
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
          selected={book}
          items={transBook}
          translation="true"
          onSelectionChange={onFormChange}
        />
        <List
          listId="chapter"
          selected={chapter}
          items={data.Chapter && data.Chapter.length}
          onSelectionChange={onFormChange}
        />
        <List
          listId="verse"
          items={chapter && data.Chapter[chapter].Verse.length}
          onSelectionChange={onFormChange}
        />
      </section>
      <section className="verse-results">
        <h3>{t('FORM.SEARCH_RESULT')}</h3>
        <h3>
          {chapter && `${t('CHAPTERS.' + BOOKS[book])}  ${chapter + 1}`}
        </h3>
        <div className="results-list" onClick={searchSelect}>
          {searchResult && arrayToDiv(searchResult)}
        </div>
      </section>
    </article>
  );
};

export default Verse;
