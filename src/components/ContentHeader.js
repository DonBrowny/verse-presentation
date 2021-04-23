import React, { Suspense, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { removeLeadingSlash } from '../utils/utils.js';

const ContentHeader = () => {
  const [pathName, setPathName] = useState(window.location.pathname);
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      setPathName(removeLeadingSlash(location.pathname));
    });
  }, [history]);

  return <header>{pathName}</header>;
};

export default ContentHeader;
