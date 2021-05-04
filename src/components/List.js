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
    <div className="list">
      <select multiple className="list-content">
        {itemsToList()}
      </select>
    </div>
  );
};

export default List;
