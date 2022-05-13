import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Input } from 'antd';
import './Dropdown.scss';

const Option = forwardRef(({ text, value, selected }, ref) => {
  const [focus, setFocus] = useState(false);
  useImperativeHandle(ref, () => ({
    setFocus() {
      setFocus(true);
    },
  }));
  return (
    <li className={`option ${focus ? 'focus' : ''}`} value={value}>
      {text}
    </li>
  );
});
Option.displayName = 'Option';

const Dropdown = ({ placeholder, options }) => {
  const inputRef = useRef(null);
  const itemEls = useRef([]);
  inputRef.current?.focus({
    cursor: 'all',
  });

  function createOption(options) {
    return options.map((option) => (
      <Option
        {...option}
        key={option.value}
        ref={(element) => itemEls.current.push(element)}
      ></Option>
    ));
  }

  function focusOnFirstOption(e) {
    itemEls.current[0].setFocus();
    e.target.blur();
  }

  return (
    <div className='dropdown'>
      <Input ref={inputRef} placeholder={placeholder} />
      <ul tabIndex={0} onFocus={focusOnFirstOption}>
        {createOption(options)}
      </ul>
    </div>
  );
};

export default Dropdown;
