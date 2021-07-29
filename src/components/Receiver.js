import React, { useEffect, useState } from 'react';

const Receiver = () => {
  const [content, setcontent] = useState({});

  let connectionIdx = 0;
  let messageIdx = 0;

  function addConnection(connection) {
    connection.connectionId = ++connectionIdx;
    addMessage('New connection #' + connectionIdx);

    connection.addEventListener('message', function (event) {
      messageIdx++;
      const data = JSON.parse(event.data);
      console.log(
        `Message ${messageIdx} from connection #connection.connectionId : ${data}`
      );
      addMessage(data);
      connection.send('Received message ' + messageIdx);
    });

    connection.addEventListener('close', function (event) {
      addMessage(
        'Connection #' +
          connection.connectionId +
          ' closed, reason = ' +
          event.reason +
          ', message = ' +
          event.message
      );
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
  return <div>Presentation Receiver screen</div>;
};

export default Receiver;
