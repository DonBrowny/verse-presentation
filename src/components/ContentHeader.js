import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { removeLeadingSlash } from '../utils/utils.js';

const VISIBLE_ROUTES = ['verse', 'lyrics'];

const ContentHeader = () => {
  const initialLocation = removeLeadingSlash(window.location.pathname);
  const checkVisibility = (pathName) => VISIBLE_ROUTES.includes(pathName);

  const [pathName, setPathName] = useState(initialLocation);
  const [isVisible, setVisibility] = useState(checkVisibility(initialLocation));
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      const pathname = removeLeadingSlash(location.pathname);
      setPathName(pathname);
      setVisibility(() => {
        return checkVisibility(pathname);
      });
    });
  }, [history]);

  return isVisible && <header>{pathName}</header>;
};

export default ContentHeader;
