import React from 'react';
import { useTranslation } from 'react-i18next';
import './Badge.scss';

function Badge({ item, content, onClose }) {
  const onBadgeClose = () => {
    onClose(item);
  };

  return (
    <>
      {content && (
        <div className="badge inline-flex">
          <span>{content}</span>
          <button className="badge-circle" onClick={onBadgeClose}></button>
        </div>
      )}
    </>
  );
}

export default Badge;
