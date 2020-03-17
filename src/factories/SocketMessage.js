export class SocketMessage {
  constructor({ message = "", onSuccess, onError, timeout = 0 } = {}) {
    this.messageId = Math.round(Date.now() * Math.random());
    this.message = message;
    this.onSuccess = typeof onSuccess === "function" ? onSuccess : () => {};
    this.onError = typeof onError === "function" ? onError : () => {};
    this.timeout = timeout;
  }
}
