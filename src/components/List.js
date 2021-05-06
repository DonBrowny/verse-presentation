import React from 'react';
import { useTranslation } from 'react-i18next';
import { createArray } from '../utils/utils';
import './List.scss';

const List = ({
  listId,
  selected,
  items,
  onSelectionChange,
  translation = false,
}) => {
  const { t } = useTranslation('verse');
  let selectedValue = selected ? [selected.toString()] : [];

  const createOption = (option, value) => {
    return (
      <option key={listId + value} value={value}>
        {translation ? t(option) : option}
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
    onSelectionChange(listId, parseInt(value));
  };

  return (
    <select className="list" multiple onChange={change} value={selectedValue}>
      {itemsToList()}
    </select>
  );
};

export default List;
