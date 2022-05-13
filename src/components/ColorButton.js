import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './ColorButton.scss';

const ColorButton = ({ selectedColor = undefined, onChangeCompleted }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(
    selectedColor || { r: '241', g: '112', b: '19', a: '1' }
  );

  const openPicker = () => {
    setDisplayColorPicker(true);
  };

  const closePicker = () => {
    setDisplayColorPicker(false);
    onChangeCompleted(color);
  };

  const handleChange = (color) => {
    setColor(color.rgb);
  };

  return (
    <div>
      <div
        style={{
          background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        }}
        className='swatch'
        onClick={openPicker}
      >
        <div className='color' />
      </div>
      {displayColorPicker && (
        <div className='popover'>
          <div className='cover' onClick={closePicker} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default ColorButton;
