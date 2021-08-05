export class PresentationApi {
  constructor(path) {
    this.presentationRequest = new PresentationRequest([path]);

    // Make this presentation the default one when using the "Cast" browser menu.
    navigator.presentation.defaultRequest = this.presentationRequest;

    // close connection on exiting the page
    window.addEventListener('beforeunload', () => {
      this.terminatePresentation();
    });

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

  getConnectionId() {
    return this.presentationConnection.id;
  }

  startPresentation() {
    this.presentationRequest
      .start()
      .then((connection) => {
        console.log(
          '> Connected to ' + connection.url + ', id: ' + connection.id
        );
        return connection.id;
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

  reconnectPresentation() {
    this.presentationRequest
      .reconnect(this.presentationConnection.id)
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
        return availability.value;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
