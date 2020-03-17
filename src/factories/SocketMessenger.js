export class SocketMessenger {
  constructor(url) {
    this.pool = [];
    this.timeouts = [];
    this.url = url;
    this.WSObj = null;
    this.connected = false;
  }

  connect() {
    this.WSObj = new WebSocket(this.url);
    this.WSObj.onopen = this.onOpen.bind(this);
    this.WSObj.onclose = this.onClose.bind(this);
    this.WSObj.onerror = this.onError.bind(this);
    this.WSObj.onmessage = this.onMessage.bind(this);
  }

  onError(e) {
    console.log("Error:", e);
    const index = this.pool.findIndex(v => v.message === e.data);
    if (index > -1) {
      this.pool[index].onError(e);
      const TMID = this.pool[index].TMID;
      if (TMID !== null) clearTimeout(TMID);
      this.pool.splice(index, 1);
    }
  }

  onMessage(m) {
    console.log("Message:", m);
    const index = this.pool.findIndex(v => v.message === m.data);
    if (index > -1) {
      const message = this.pool[index];
      message.onSuccess(m);
      if (message.timeout) {
        const index = this.timeouts.findIndex(
          t => t.messageId === message.messageId
        );
        if (index > -1) {
          clearTimeout(this.timeouts[index].timeoutId);
          this.timeouts.splice(index, 1);
        }
      }
      this.pool.splice(index, 1);
    }
  }

  onOpen() {
    console.log("Connected");
    this.connected = true;
  }

  onClose(e) {
    if (e.wasClean) {
      console.log("Closed");
    } else {
      console.log("Broken");
    }
    this.connected = false;
  }

  sendMessage(socketMessageObject) {
    if (!this.connected) {
      console.error("Socket not connected");
      return;
    }
    this.WSObj.send(socketMessageObject.message);
    if (socketMessageObject.timeout) {
      const timeoutId = setTimeout(() => {
        this.removeFromPoolById(socketMessageObject.messageId);
        console.log("TIMEOUTED", socketMessageObject.message);
      }, socketMessageObject.timeout);
      this.timeouts.push({
        messageId: socketMessageObject.messageId,
        timeoutId
      });
    }
    this.pool.push(socketMessageObject);
  }

  removeFromPoolById(socketMessageId) {
    const index = this.pool.findIndex(v => v.messageId === socketMessageId);
    if (index) this.pool.splice(index, 1);
  }

  disconnect() {
    this.WSObj.close();
  }
}
