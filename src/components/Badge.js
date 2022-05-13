import React from 'react';
import './Badge.scss';

function Badge({ item, content, onClose }) {
  const onBadgeClose = () => {
    onClose(item);
  };

  return (
    content && (
      <div className='badge inline-flex'>
        <span>{content}</span>
        <button
          type='button'
          aria-label='close'
          className='badge-circle'
          onClick={onBadgeClose}
        />
      </div>
    )
  );
}

export default Badge;
