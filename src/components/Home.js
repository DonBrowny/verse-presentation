import React from 'react';
import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
      <a className='button' href='/verse'>
        Verse
      </a>
      <a className='button' href='/lyrics'>
        Lyrics
      </a>
      <a className='button' href='/overlay'>
        Overlay
      </a>
      <a className='button' href='/settings'>
        Settings
      </a>
    </div>
  );
};

export default Home;
