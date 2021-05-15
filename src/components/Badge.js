import React from 'react';
import { useTranslation } from 'react-i18next';
import './Badges.scss';

function Badge({ item }) {
  const { t } = useTranslation();

  return (
    <>
      {item && (
        <div className="badge">
          <span>{t(item)}</span>
          <button>x</button>
        </div>
      )}
    </>
  );
}

export default Badge;
