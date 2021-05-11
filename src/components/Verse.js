import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Verse.scss';
import List from './List';
import { fetchData } from '../utils/utils';

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

const DEFAULT_VALUE = { data: {}, book: "", chapter: "" };

const Verse = () => {
  const refs = useRef([]);
  const { t, i18n } = useTranslation('verse');
  const [state, setState] = useState(DEFAULT_VALUE);

  const fetchBook = (path) => {
    fetchData(`${i18n.language}/${path}`).then((data) => {
      setState({ data, book: path, chapter: "" });
    });
  };

  const resetSearch = () => {
    setState(DEFAULT_VALUE)
  };

  React.useEffect(() => {
    return i18n.on('languageChanged', (lng) => {
      resetSearch();
    });
  }, []);

  const result = (resultList) => {
    if (resultList.length && resultList.length > 0) {
      return resultList.map((verse, index) => {
        return (
          <div
            key={verse.index}
            data-verse={index}
            ref={(element) => {
              refs.current[index] = element;
            }}
            className="card "
          >
            <b>{index + 1}.</b> {verse.Verse}
          </div>
        );
      });
    }
  };

  const onFormChange = (key, value) => {
    switch (key) {
      case 'book':
        fetchBook(value);
        break;

      case 'chapter':
        setState({ ...state, chapter: value });
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
          selected={state.book}
          items={transChapters()}
          translation="true"
          onSelectionChange={onFormChange}
        />
        <List
          listId="chapter"
          selected={state.chapter}
          items={state.data.Chapter && state.data.Chapter.length}
          onSelectionChange={onFormChange}
        />
        <List
          listId="verse"
          items={state.chapter && state.data.Chapter[state.chapter].Verse.length}
          onSelectionChange={onFormChange}
        />
      </section>
      <section className="verse-results">
        <h3>{t('FORM.SEARCH_RESULT')}</h3>
        <h3>
          {state.chapter && `${t('CHAPTERS.' + CHAPTERS[state.book])}  ${state.chapter + 1}`}
        </h3>
        <div className="results-list" onClick={searchSelect}>
          {state.chapter && result(state.data.Chapter[state.chapter].Verse)}
        </div>
      </section>
    </article>
  );
};

export default Verse;
