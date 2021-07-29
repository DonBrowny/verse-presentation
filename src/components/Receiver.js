import React, { useEffect, useState } from 'react';

const Receiver = () => {
  const [content, setcontent] = useState({
    type: 'verse',
    data: {
      header: '2 சாமுவேல் : 7',
      text: '7. நான் இஸ்ரவேலாகிய என் ஜனத்தை மேய்க்கும்படி கட்டளையிட்ட இஸ்ரவேல் கோத்திரங்களில் ஒரு கோத்திரத்தையாவது நோக்கி: நீங்கள் எனக்குக் கேதுருமரத்தால் செய்யப்பட்ட ஆலயத்தைக் கட்டாதிருக்கிறது என்ன என்று நான் இஸ்ரவேல் புத்திரருக்குள் உலாவிவந்த எவ்விடத்திலாவது யாதொரு வார்த்தையைச் சொன்னதுண்டோ?',
    },
  });

  let connectionIdx = 0;

  function addConnection(connection) {
    connection.connectionId = ++connectionIdx;

    connection.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      addMessage(data);
      // connection.send('Received message');
    });
  }

  function addMessage(content) {
    setcontent(content);
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
  return (
    <div>
      <h3>{content.data.header}</h3>
      <div>{content.data.text}</div>
    </div>
  );
};

export default Receiver;
