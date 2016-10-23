const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 150;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    let display = electron.screen.getPrimaryDisplay().bounds;
    let x = display.x + ((display.width - WINDOW_WIDTH) / 2);
    let y = display.y + ((display.height - WINDOW_HEIGHT) / 2);

    // Set us up the browser
    mainWindow = new BrowserWindow({width: WINDOW_WIDTH, height: WINDOW_HEIGHT, x: x, y: y});
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    //mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function (){
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// OS X bull
app.on('window-all-closed', function (){
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function (){
    if (mainWindow === null) {
        createWindow();
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
