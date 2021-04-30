import React from 'react';
import { useTranslation } from 'react-i18next';
import './List.scss';

const List = ({ items, translation = false }) => {
  const { t } = useTranslation('verse');
  const itemsToList = () => {
    if (items && items.length > 0) {
      return items.map((item) => {
        return translation ? <li>{t(item)}</li> : <li>{item}</li>;
      });
    }
  };

  return <ul className="list">{itemsToList()}</ul>;
};

export default List;
