// main.js

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow; // Keep this reference so the window doesn't close

function createWindow() {
	mainWindow = new BrowserWindow({width: 800, height: 800});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	app.quit();
});
