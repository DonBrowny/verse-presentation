import React from 'react';
import './List.scss';

const List = ({ listId, selected, items, onSelectionChange }) => {
  let selectedValue =
    typeof selected !== 'undefined' ? [selected.toString()] : [];

  const createOption = (items) => {
    if (!items || items.length <= 0) return;
    return items.map(({ value, text }) => {
      return (
        <option key={listId + value} value={value}>
          {text}
        </option>
      );
    });
  };

  const change = (event) => {
    const selectedValue = event.target.value;
    const selectedItem = items.find(({ value, text }) => {
      return value == selectedValue;
    });
    onSelectionChange(listId, selectedItem);
  };

  console.count(listId);
  return (
    <select
      key={listId}
      className="list"
      multiple
      onChange={change}
      value={selectedValue}
    >
      {createOption(items)}
    </select>
  );
};

List.whyDidYouRender = true;

export default React.memo(List);
