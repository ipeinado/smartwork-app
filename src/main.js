// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron');

const path = require('path');
const url = require('url');

// const menuFactoryService = require('./services/menuFactory');
const i18n = require('./config/i18next.config');

const menuFactoryService = require('./services/menuFactory');

let mainWindow;

function isDev() {
  return process.argv[2] == '--serve'
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  // if (isDev()) {
  //   mainWindow.loadURL('http://localhost:4200')  
  // } else {
  //   mainWindow.loadURL(url.format({
  //     pathname: path.join(__dirname, '../web/dist/index.html'),
  //     protocol: 'file:',
  //     slashes: true
  //   }))
  // }
  mainWindow.loadFile('./src/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  i18n.on('loaded', () => {
    i18n.changeLanguage();
    i18n.off('loaded');
  });

  i18n.on('languageChanged', (lang) => {
    menuFactoryService.buildMenu(app, mainWindow, i18n);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
