import React from 'react';
import { useTranslation } from 'react-i18next';
import './List.scss';

const List = ({ items, translation = false }) => {
  const { t } = useTranslation('verse');
  const itemsToList = () => {
    if (items && items.length > 0) {
      return items.map((item) => {
        return translation ? (
          <option>{t(item)}</option>
        ) : (
          <option>{item}</option>
        );
      });
    }
  };

  return (
    <select className="list" multiple>
      {itemsToList()}
    </select>
  );
};

export default List;
