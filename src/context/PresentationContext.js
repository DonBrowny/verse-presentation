import React, { useState, useEffect } from 'react';
import { STATUS } from '../utils/constants';

export const PresentationContext = React.createContext();

export const PresentationProvider = (props) => {
  const [availability, setAvailability] = useState(false);
  const [presentationRequest] = useState(new PresentationRequest([props.path]));
  const [presentationConnection, setPresentationConnection] = useState();
  const [presentationStatus, setPresentationStatus] = useState();

  function startPresentation() {
    presentationRequest.start().then(setConnection);
  }

  //Set Event Handlers for the PresentationRequest
  useEffect(() => {
    presentationRequest
      .getAvailability()
      .then(function (availability) {
        setAvailability(availability.value);
        availability.onchange = function () {
          setAvailability(this.value);
        };
      })
      .catch(function () {
        setAvailability(true);
      });
  }, [presentationRequest]);

  function setConnection(newConnection) {
    // Disconnect from existing presentation, if not attempting to reconnect
    if (
      presentationConnection &&
      presentationConnection != newConnection &&
      presentationConnection.state != 'closed'
    ) {
      presentationConnection.onclosed = undefined;
      presentationConnection.close();
    }

    // Set the new presentationConnection and save the presentation ID
    setPresentationConnection(newConnection);
    setPresentationStatus(STATUS.PAUSE);

    localStorage['presId'] = presentationConnection.id;

    // Monitor the presentationConnection state
    presentationConnection.onconnect = (_) => {
      // Register message handler
      presentationConnection.onmessage = (message) => {
        console.log(`Received message: ${message.data}`);
      };
    };

    presentationConnection.onclose = (_) => {
      setPresentationStatus(STATUS.PAUSE);
      setPresentationConnection(null);
    };

    presentationConnection.onterminate = (_) => {
      // Remove presId from localStorage if exists
      delete localStorage['presId'];
      setPresentationStatus(STATUS.CLOSE);
      setPresentationConnection(null);
    };
  }

  return (
    <PresentationContext.Provider
      value={{
        startPresentation,
        presentationStatus,
        availability,
        presentationRequest,
        presentationConnection,
      }}
    >
      {props.children}
    </PresentationContext.Provider>
  );
};
