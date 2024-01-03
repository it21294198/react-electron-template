// const { BrowserWindow, app, ipcMain, Notification } = require('electron');
// const path = require('path');

// const isDev = !app.isPackaged;

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 600,
//     height: 600,
//     backgroundColor: "white",
//     webPreferences: {
//       nodeIntegration: false,
//       worldSafeExecuteJavaScript: true,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })

//   win.loadFile('index.html');
// }

// if (isDev) {
//   require('electron-reload')(__dirname, {
//     electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
//   })
// }

// ipcMain.on('notify', (_, message) => {
//   new Notification({title: 'Notifiation', body: message}).show();
// })

// app.whenReady().then(createWindow)
const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  console.log('Creating window...'); // Log the creation of the window
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');

  // Log when the window is loaded
  win.webContents.on('did-finish-load', () => {
    console.log('Window loaded successfully.');
  });
}

if (isDev) {
  console.log('Running in development mode...'); // Log when running in development mode
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

ipcMain.on('notify', (_, message) => {
  console.log('Received notify message:', message); // Log when receiving notify message
  new Notification({ title: 'Notification', body: message }).show();
});

app.whenReady().then(() => {
  console.log('App is ready, creating window...'); // Log when the app is ready
  createWindow();
});

// Log when all windows are closed
app.on('window-all-closed', () => {
  console.log('All windows closed.');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Log when app is activated
app.on('activate', () => {
  console.log('App activated.');
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});