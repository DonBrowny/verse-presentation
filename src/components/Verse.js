import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './Verse.scss';
import { BOOKS, DISPLAY_TYPE } from '../utils/constants';
import VerseSearch from './VerseSearch';

const Verse = () => {
  const refs = useRef([]);
  const { t } = useTranslation('verse');
  const [searchResult, setSearchResult] = useState('');

  const stringifyVerse = function ({ book, chapter, result: resultList }) {
    if (resultList.length && resultList.length > 0) {
      return `${t(BOOKS[book])} : ${chapter + 1}`;
    }
  };

  const onVerseClick = useCallback((value) => {
    setTimeout(() => {
      refs.current[value].scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  const arrayToDiv = ({ book, chapter, result: resultList }) => {
    if (resultList.length && resultList.length > 0) {
      return resultList.map((verse, index) => {
        return (
          <div
            key={index}
            data-verse={index}
            ref={(element) => {
              refs.current[index] = element;
            }}
            className='card'
          >
            <b>{index + 1}.</b> {verse}
          </div>
        );
      });
    }
  };

  const searchSelect = (event) => {
    let verse = event.target.getAttribute('data-verse');
    if (verse) {
      const data = {
        type: DISPLAY_TYPE.VERSE,
        data: {
          header: stringifyVerse(searchResult),
          text: event.target.innerText,
        },
      };
      window.PRESENTATION.sendMessage(JSON.stringify(data));
    }
  };

  return (
    <article className='verse flex-stretch'>
      <VerseSearch
        onResultAvailable={setSearchResult}
        onVerseClick={onVerseClick}
      />
      <section className='verse-results'>
        <h3>{t('FORM.SEARCH_RESULT')}</h3>
        <h3>{searchResult && stringifyVerse(searchResult)}</h3>
        <div className='results-list' onClick={searchSelect}>
          {searchResult && arrayToDiv(searchResult)}
        </div>
      </section>
    </article>
  );
};

export default Verse;
