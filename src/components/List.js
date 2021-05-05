import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createArray } from '../utils/utils';
import './List.scss';

const List = ({
  listId,
  items,
  selected,
  onSelectionChange,
  translation = false,
}) => {
  const { t } = useTranslation('verse');
  const [state, setState] = useState([selected]);

  const createOption = (option, value) => {
    return translation ? (
      <option key={value} value={value}>
        {t(option)}
      </option>
    ) : (
      <option key={value} value={value}>
        {option}
      </option>
    );
  };

  const itemsToList = () => {
    items = typeof items == 'number' ? createArray(items) : items;
    if (items && items.length > 0) {
      return items.map((item, index) => createOption(item, index));
    }
  };

  const change = (event) => {
    const value = event.target.value;
    setState([value]);
    onSelectionChange(listId, value);
  };

  return (
    <select className="list" multiple onChange={change} value={state}>
      {itemsToList()}
    </select>
  );
};

export default List;
