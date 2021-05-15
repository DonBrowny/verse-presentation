import React from 'react';
import { useTranslation } from 'react-i18next';
import './Badge.scss';

function Badge({ item }) {
  const { t } = useTranslation();

  return (
    <>
      {item && (
        <div className="badge inline-flex">
          <span>{t(item)}</span>
          <button className="badge-circle"></button>
        </div>
      )}
    </>
  );
}

export default Badge;
