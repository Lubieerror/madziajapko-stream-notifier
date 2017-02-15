'use strict';
const electron = require('electron');
const {app, BrowserWindow} = electron;
const tray = require('./tray');

let appIcon = 'rsc/icon3.png';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 350, height: 200, resizable: false, autoHideMenuBar: true, icon: appIcon});
  // mainWindow = new BrowserWindow({width: 400, height: 250, resizable: false, frame: false, icon: 'rsc/icon3.png'});

  const Positioner = require('electron-positioner');
  const positioner = new Positioner(mainWindow);
  positioner.move('bottomRight');

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // mainWindow.webContents.openDevTools();

  tray.create(mainWindow);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);


app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});


function openThatLinkExternal(link) {
  require("shell").openExternal(link);
}