import React, { useState, useEffect, useCallback } from 'react';
import List from './List';
import { useTranslation } from 'react-i18next';
import { fetchData, convertToSelectObject } from '../utils/utils';
import { BOOKS } from '../utils/constants';
import './VerseSearch.scss';
import Badge from './Badge';

function VerseSearch({ onResultAvailable, onVerseClick }) {
  const { t, i18n } = useTranslation('verse');
  let translatedArray = useCallback(
    (arr) => {
      return arr.map((x) => t(x));
    },
    [t]
  );

  const [bookList, setBookList] = useState(translatedArray(BOOKS));
  const [data, setData] = useState({});
  const [book, setBook] = useState();
  const [chapter, setChapter] = useState();

  useEffect(() => {
    let result =
      data.Chapter && typeof chapter === 'number'
        ? data.Chapter[chapter].Verse
        : '';
    onResultAvailable(result);
  }, [data, chapter, onResultAvailable]);

  useEffect(() => {
    let cancel = false;
    if (typeof book === 'undefined') return;
    fetchData(`${i18n.language}/${book}`).then((data) => {
      if (cancel) return;
      setData(data);
    });
    return () => (cancel = true);
  }, [book, i18n.language]);

  useEffect(() => {
    setBookList(translatedArray(BOOKS));
  }, [i18n.language]);

  const onFormChange = useCallback(
    (key, selectedValue) => {
      let { value } = selectedValue;
      switch (key) {
        case 'book':
          setBook(value);
          setChapter('');
          break;

        case 'chapter':
          setChapter(value);
          break;

        case 'verse':
          onVerseClick(value);
          break;

        default:
          break;
      }
    },
    [onVerseClick]
  );
  return (
    <section className="verse-search">
      <h3 className="row">{t('FORM.VERSE_SEARCH')}</h3>
      <span>{t('FORM.BOOK')}:</span>
      <span>{t('FORM.CHAPTER')}:</span>
      <span>{t('FORM.VERSE')}:</span>
      <List
        listId="book"
        selected={book}
        items={convertToSelectObject(bookList)}
        onSelectionChange={onFormChange}
      />
      <List
        listId="chapter"
        selected={chapter}
        items={data.Chapter && convertToSelectObject(data.Chapter.length)}
        onSelectionChange={onFormChange}
      />
      <List
        listId="verse"
        items={
          typeof chapter === 'number' &&
          convertToSelectObject(data.Chapter[chapter].Verse.length)
        }
        onSelectionChange={onFormChange}
      />
      <span className="row bold">{t('FORM.WORD_SEARCH_IN')}:</span>
      <div className="row inline-flex">
        {book ? (
          <>
            <Badge item={book ? bookList[book] : ''} />
            <Badge item={chapter ? chapter : ''} />
          </>
        ) : (
          <span>
            <sup>*</sup>Select a book to search
          </span>
        )}
      </div>
      <span className="row bold">{t('FORM.WORD_SEARCH')}:</span>
      <input className="row-2" type="text" name="" id="" />
      <button className="icon-button">
        <img src="/icons/search-solid.svg" alt="Search" />
      </button>
    </section>
  );
}

export default VerseSearch;
