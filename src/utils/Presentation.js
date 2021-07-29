export class PresentationApi {
  constructor(path) {
    this.presentationRequest = new PresentationRequest([path]);

    // Make this presentation the default one when using the "Cast" browser menu.
    navigator.presentation.defaultRequest = this.presentationRequest;

    this.presentationRequest.addEventListener(
      'connectionavailable',
      (event) => {
        this.presentationConnection = event.connection;
        this.presentationConnection.addEventListener('close', () => {
          console.log('> Connection closed.');
        });
        this.presentationConnection.addEventListener('terminate', () => {
          console.log('> Connection terminated.');
        });
        this.presentationConnection.addEventListener('message', (event) => {
          console.log('> ' + event.data);
        });
      }
    );
  }

  startPresentation() {
    this.presentationRequest
      .start()
      .then((connection) => {
        console.log(
          '> Connected to ' + connection.url + ', id: ' + connection.id
        );
      })
      .catch((error) => {
        console.log('> ' + error.name + ': ' + error.message);
      });
  }

  closePresentation() {
    this.presentationConnection.close();
  }

  terminatePresentation() {
    this.presentationConnection.terminate();
  }

  reconnectPresentation(presentationId) {
    this.presentationRequest
      .reconnect()
      .then((connection) => console.log(connection))
      .catch((error) => {
        console.log(
          'Presentation.reconnect() error, ' + error.name + ': ' + error.message
        );
      });
  }

  sendMessage(message) {
    this.presentationConnection.send(message);
  }

  checkAvailability() {
    this.presentationRequest
      .getAvailability()
      .then((availability) => {
        return availability;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
