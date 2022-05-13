import React, { useState, useRef, useEffect } from 'react';
import { compareArrayOfObjects } from '../utils/utils';
import './List.scss';

const List = ({ listId, selected, items, onSelectionChange }) => {
  let selectedValue =
    typeof selected !== 'undefined' ? [selected.toString()] : [];

  let prevItems = usePrevious(items);

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

  const [displayValues, setdisplayValues] = useState(items);
  useEffect(() => {
    if (!prevItems || !compareArrayOfObjects(prevItems, items)) {
      setdisplayValues(items);
    }
  }, [items]);

  const searchChange = (event) => {
    const selectedValue = event.target.value;
    const filteredItems = selectedValue
      ? items.filter(({ text }) => {
          return text.toLowerCase().includes(selectedValue.toLowerCase());
        })
      : items;
    setdisplayValues(filteredItems);
  };

  const selectionChange = (event) => {
    const selectedValue = event.target.value;
    const selectedItem = items.find(({ value }) => {
      return value == selectedValue;
    });
    onSelectionChange(listId, selectedItem);
  };

  return (
    <div>
      <input type='text' name='' id={listId} onChange={searchChange} />
      <select
        key={listId}
        className='list'
        multiple
        onChange={selectionChange}
        value={selectedValue}
      >
        {createOption(displayValues)}
      </select>
    </div>
  );
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

List.whyDidYouRender = true;

export default React.memo(List);
