const { ipcRenderer, contextBridge } = require("electron");

// preload.js
contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  dbApi: {
    getUserById(id) {
      ipcRenderer.invoke("get-user", id);
    },
  },
  ipc: {
    invoke(method, args) {
      return ipcRenderer.invoke(method, args);
    },
    send(channel, data) {
      ipcRenderer.send(channel, data);
    },
    once: (eventName, callback) => {
      let handled = false;
      ipcRenderer.once(eventName, (event, ...args) => {
        if (!handled) {
          handled = true;
          callback(event, ...args);
        }
      });
    },
  },
});
