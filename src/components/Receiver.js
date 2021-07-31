import React, { useEffect, useState, useContext } from 'react';
import './Receiver.scss';
import fitty from 'fitty';
import { DISPLAY_TYPE } from '../utils/constants';

const Receiver = () => {
  let sampleData = [
    {
      type: 'verse',
      data: {
        header: 'தானியேல் : 5',
        text: '23. பரலோகத்தின் ஆண்டவருக்கு விரோதமாக உம்மை உயர்த்தினீர்; அவருடைய ஆலயத்தின் பாத்திரங்களை உமக்கு முன்பாகக் கொண்டுவந்தார்கள்; நீரும், உம்முடைய பிரபுக்களையும், உம்முடைய மனைவிகளும் உம்முடைய வைப்பாட்டிகளும் அவைகளில் திராட்சரசம் குடித்தீர்கள்; இதுவுமன்றி, தம்முடைய கையில் உமது சுவாசத்தை வைத்திருக்கிறவரும், உமது வழிகளுக்கு எல்லாம் அதிகாரியுமாகிய தேவனை நீர் மகிமைப்படுத்தாமல் காணாமலும் கேளாமலும் உணராமலும் இருக்கிற வெள்ளியும் பொன்னும் வெண்கலமும் இரும்பும் மரமும் கல்லுமாகிய தேவர்களைப் புகழ்ந்தீர்.',
      },
    },
    {
      type: 'verse',
      data: {
        header: 'Esther : 8',
        text: "9. Then were the king's scribes called at that time in the third month, that is, the month Sivan, on the three and twentieth day thereof; and it was written according to all that Mordecai commanded unto the Jews, and to the lieutenants, and the deputies and rulers of the provinces which are from India unto Ethiopia, an hundred twenty and seven provinces, unto every province according to the writing thereof, and unto every people after their language, and to the Jews according to their writing, and according to their language.",
      },
    },

    {
      type: 'verse',
      data: {
        header: 'John : 11',
        text: '35. Jesus wept.',
      },
    },
  ];

  const [content, setcontent] = useState(sampleData[0]);
  const [receiverSettings, setReceiverSettings] = useState({
    contentMinSize: 40,
    contentMaxSize: 60,
    contentColor: { r: 255, g: 255, b: 255, a: 1 },
    headerColor: { r: 255, g: 255, b: 255, a: 1 },
    backgroundColor: { r: 0, g: 0, b: 0, a: 1 },
  })
  let connectionIdx = 0;
  let newSettings = receiverSettings;

  function addConnection(connection) {
    connection.connectionId = ++connectionIdx;

    connection.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.type === DISPLAY_TYPE.SETTINGS) {
        newSettings = { ...newSettings, ...message.data }
        setReceiverSettings(newSettings)
      } else {
        setcontent(message);
      }
    });
  }

  useEffect(() => {
    if (navigator.presentation.receiver) {
      navigator.presentation.receiver.connectionList.then((list) => {
        list.connections.map((connection) => addConnection(connection));
        list.addEventListener('connectionavailable', function (event) {
          addConnection(event.connection);
        });
      });
    }
  }, []);

  // update the font size after each render
  useEffect(() => {
    var fitties = fitty('p', {
      minSize: receiverSettings.contentMinSize,
      maxSize: receiverSettings.contentMaxSize,
    });
    fitties[0].fit();
  }, [receiverSettings]);

  return (
    <div
      className="receiver"
      style={{
        background: `rgba(${receiverSettings.backgroundColor.r}, ${receiverSettings.backgroundColor.g}, ${receiverSettings.backgroundColor.b}, ${receiverSettings.backgroundColor.a})`,
      }}
    >
      <div className="receiver-center">
        <h1
          style={{
            color: `rgba(${receiverSettings.headerColor.r}, ${receiverSettings.headerColor.g}, ${receiverSettings.headerColor.b}, ${receiverSettings.headerColor.a})`,
          }}
        >
          {content.data.header}
        </h1>
        <p
          style={{
            color: `rgba(${receiverSettings.contentColor.r}, ${receiverSettings.contentColor.g}, ${receiverSettings.contentColor.b}, ${receiverSettings.contentColor.a})`,
          }}
        >
          {content.data.text}
        </p>
      </div>
    </div>
  );
};

export default Receiver;
