import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './Verse.scss';
import { BOOKS } from '../utils/constants';
import VerseSearch from './VerseSearch';

const Verse = () => {
  const refs = useRef([]);
  const { t } = useTranslation('verse');
  const [searchResult, setSearchResult] = useState('');

  const stringifyVerse = function (resultList) {
    if (resultList.length && resultList.length > 0) {
      const id = resultList[0].Verseid;
      const book = parseInt(id.substring(0, 2), 10);
      const chapter = parseInt(id.substring(0, 2), 10);
      return `${t(BOOKS[book])}  ${chapter + 1}`;
    }
  };

  const onVerseClick = useCallback((value) => {
    setTimeout(() => {
      refs.current[value].scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

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

  const searchSelect = (event) => {
    let verse = event.target.getAttribute('data-verse');
    console.log(verse);
  };

  return (
    <article className="verse flex-stretch">
      <VerseSearch
        onResultAvailable={setSearchResult}
        onVerseClick={onVerseClick}
      />
      <section className="verse-results">
        <h3>{t('FORM.SEARCH_RESULT')}</h3>
        <h3>{searchResult && stringifyVerse(searchResult)}</h3>
        <div className="results-list" onClick={searchSelect}>
          {searchResult && arrayToDiv(searchResult)}
        </div>
      </section>
    </article>
  );
};

export default Verse;
